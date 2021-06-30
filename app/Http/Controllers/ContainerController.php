<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
// use App\Events\InputSent;
use App\Events\ContainerOut;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Docker\Docker;
use Docker\API\Model\ContainersCreatePostBody;
use Docker\API\Model\HostConfig;
use Docker\API\Model\Mount;
use Docker\API\Model\ResourcesUlimitsItem;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class ContainerController extends Controller
{
    /*
    *   This function will allow the user to start a container
    *   in their language of current work, and then provide the
    *   relevant leading output and container ID to the front end
    *   for future interaction.
    *   $id -> assignment_id (corresponding to wrkspace)
    */
    public function spinWLib(Request $request, $id)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'lang' => 'required'
        ]);
        $head = "submissions/" . $user->fsc_id . "/" . $id;

        $docker = Docker::create();
        $containerConfig = new ContainersCreatePostBody();
        $hostConfig = new HostConfig();
        $mountsConfig = new Mount();
        $ulimits = new ResourcesUlimitsItem();

        // set global timeout
        $ulimits->setName("cpu");
        $ulimits->setSoft(30);
        $ulimits->setHard(60);
        $hostConfig->setUlimits([$ulimits]);

        $containerConfig->setStopTimeout(60);

        if (strcasecmp($validData['lang'], 'python') == 0) {
            $containerConfig->setImage('python');
            $containerConfig->setCmd(['submission.py']);
            $containerConfig->setEntrypoint(["python3"]);
            $containerConfig->setAttachStdin(true);
            $containerConfig->setAttachStdout(true);
            $containerConfig->setAttachStderr(true);
            $containerConfig->setTty(true);
            $containerConfig->setOpenStdin(true);
            $containerConfig->setWorkingDir('/usr/src');
        } else {
            $containerConfig->setImage('openjdk');
            $containerConfig->setCmd(['run.sh']);
            $containerConfig->setEntrypoint(["bash"]);
            $containerConfig->setAttachStdin(true);
            $containerConfig->setAttachStdout(true);
            $containerConfig->setAttachStderr(true);
            $containerConfig->setTty(true);
            $containerConfig->setOpenStdin(true);
            $containerConfig->setWorkingDir('/usr/src');

            // copy in bash file
            $bash = Storage::disk('local')->path('run.sh');
            $filePath = Storage::disk('local')
                ->putFileAs($head, new File($bash), 'run.sh');
        }

        // create host config
        $mountsConfig->setType("bind");
        $mountsConfig->setSource("/home/max/mocside/storage/app/" . $head . "/");
        $mountsConfig->setTarget("/usr/src");
        $mountsConfig->setReadOnly(false);
        $hostConfig->setMounts([$mountsConfig]);
        $containerConfig->setHostConfig($hostConfig);

        // create container
        $containerCreateResult = $docker->containerCreate($containerConfig);
        $container_id = $containerCreateResult->getId();

        // start container
        $docker->containerStart($container_id);

        // attach container to ws
        $webSocketStream = $docker->containerAttachWebsocket($container_id, [
            "logs" => true,
            "stream" => true,
            "stdout" => true,
            "stderr" => true,
            "stdin" => true,
        ]);

        // we won't write input here, although we did in testing.
        // usleep(500000);
        sleep(1);

        // grab program output
        $line = $webSocketStream->read();
        $out = "";

        while ($line != null) {
            $out .= $line;
            try {
                $line = $webSocketStream->read();
                // this is in reference to an error found in the 
                // fread() of ./docker-php/src/Stream AttachWebSocketStream.php @line 164 
                // ... final solution there. This should do nothing, but I'm scared.
            } catch (ErrorException $e) {
                echo $e;
                $line = null;
            }
        }

        // clean returns
        $dump = utf8_encode($out);
        $returns = explode("\r\n", $dump);

        return response()->json(["message" => $container_id, "dump" => $returns], 200);
    }

    /*
    *   This function will force stop and
    *   delete a container based on it's ID.
    *   This may be useful for cleanup.
    *   NOTE: This function could not be replaced by docker-php
    */
    public function spinDown($id)
    {
        // $id is container ID
        $path = "/containers/" . $id . "?force=true";
        $host = '127.0.0.1';

        $packet = "DELETE {$path} HTTP/1.0\r\n";
        $packet .= "Host: {$host}\r\n";
        $packet .= "Connection: Close\r\n\r\n";

        // delete container
        $socketPath = 'unix:///var/run/docker.sock';
        $socket = stream_socket_client($socketPath, $errno, $errstr);
        fwrite($socket, $packet);
        $res = fread($socket, 4096) . "\n";
        fclose($socket);

        return response()->json(["message" => $res], 200);
    }

    /*
    *   This function deploys the grading fucntionality
    *   into the requested workspace. Grading is done by
    *   a 'supervisor', which is copied into the problem space
    *   along with txt versions of the relevant test cases.
    *   Returns the output of the supervisor.
    */
    public function grade(Request $request, $id)
    {
        // First, let's get out test cases and other relevant data
        // $id is assignment_id
        $user = Auth::user();
        $validData = $request->validate([
            'lang' => 'required',
        ]);
        $assignment = Assignment::find($id);
        $test_cases = $assignment->test_cases;
        $head = 'submissions/' . $user->fsc_id . "/" . $id;

        // now, lets create a container instance in the right language over the submission space
        $docker = Docker::create();
        $containerConfig = new ContainersCreatePostBody();
        $hostConfig = new HostConfig();
        $mountsConfig = new Mount();

        if (strcasecmp($validData['lang'], 'python') == 0) {
            $containerConfig->setImage('python');
            $containerConfig->setCmd(['supervisor.py']);
            $containerConfig->setEntrypoint(["python3"]);
            $containerConfig->setAttachStdin(true);
            $containerConfig->setAttachStdout(true);
            $containerConfig->setAttachStderr(true);
            $containerConfig->setTty(true);
            $containerConfig->setOpenStdin(true);
            $containerConfig->setWorkingDir('/usr/src');
            $supervisor = Storage::disk('local')->path('supervisor-python.py');
        } else {
            $containerConfig->setImage('supervisor');
            $containerConfig->setCmd(['supervisor.py']);
            $containerConfig->setEntrypoint(["python3"]);
            $containerConfig->setAttachStdin(true);
            $containerConfig->setAttachStdout(true);
            $containerConfig->setAttachStderr(true);
            $containerConfig->setTty(true);
            $containerConfig->setOpenStdin(true);
            $containerConfig->setWorkingDir('/usr/src');
            $supervisor = Storage::disk('local')->path('supervisor-java.py');
        }
        // create host config
        $mountsConfig->setType("bind");
        $mountsConfig->setSource("/home/max/mocside/storage/app/" . $head . "/");
        $mountsConfig->setTarget("/usr/src");
        $mountsConfig->setReadOnly(false);
        $hostConfig->setMounts([$mountsConfig]);
        $containerConfig->setHostConfig($hostConfig);


        // save test cases to file
        for ($i = 0; $i < count($test_cases); $i++) {
            $temp = $test_cases[$i];
            $tc_id = $temp->id;

            // save tc/input
            $path = $tc_id . ".in";
            $file = fopen($path, "w");
            fwrite($file, $temp->input);
            $filePath = Storage::disk('local')
                ->putFileAs($head . "/test-cases", new File($path), $path);
            fclose($file);
            unlink($path);

            // save tc/output
            $path = $tc_id . ".out";
            $file = fopen($path, "w");
            fwrite($file, $temp->output);
            $filePath = Storage::disk('local')
                ->putFileAs($head . "/test-cases", new File($path), $path);
            fclose($file);
            unlink($path);
        }

        // copy in supervisor
        $filePath = Storage::disk('local')
            ->putFileAs($head, $supervisor, 'supervisor.py');

        // create container
        $containerCreateResult = $docker->containerCreate($containerConfig);
        $container_id = $containerCreateResult->getId();

        // start container
        $docker->containerStart($container_id);

        // wait for grader to finish
        $docker->containerWait($container_id);

        // attach container to ws
        $webSocketStream = $docker->containerAttachWebsocket($container_id, [
            "logs" => true,
            "stream" => true,
            "stdout" => true,
            "stderr" => true,
            "stdin" => true,
        ]);

        // get output
        $line = $webSocketStream->read();
        $out = "";

        while ($line != null) {
            $out .= $line;
            try {
                $line = $webSocketStream->read();
                // this is in reference to an error found in the 
                // fread() of ./docker-php/src/Stream AttachWebSocketStream.php @line 164 
                // ... final solution there. This should do nothing, but I'm scared.
            } catch (ErrorException $e) {
                echo $e;
                $line = null;
            }
        }

        // clean returns
        $dump = utf8_encode($out);
        $returns = explode("\r\n", $dump);

        return response()->json(["message" => $container_id, "dump" => $returns], 200);
    }

    /* 
    *   This function provides input to a running container,
    *   for use in tandem with the "spinWLib" fucntion
    *   Pipes in user input, scrapes output.
    *   There is an attempt here to broadcast the scraped output
    *   as a laravel-websockets/pusher event, but due to an obscure
    *   error, this will continue to rely on HTTP response.
    */
    public function sendIn(Request $request, $id)
    {
        // $id is container ID
        $docker = Docker::create();
        $validData = $request->validate([
            'input' => 'required'
        ]);
        // we expect this container to be RUNNING
        $webSocketStream = $docker->containerAttachWebsocket($id, [
            "logs" => false,
            "stream" => true,
            "stdout" => true,
            "stderr" => true,
            "stdin" => true,
        ]);

        $webSocketStream->write($validData['input']);
        $webSocketStream->write("\n");

        // grab program output
        $line = $webSocketStream->read(); // this will hold user input
        $out = "";

        while ($line != null) {
            $out .= $line;
            try {
                $line = $webSocketStream->read();
                // this is in reference to an error found in the 
                // fread() of ./docker-php/src/Stream AttachWebSocketStream.php @line 164 
                // ... final solution there. This should do nothing, but I'm scared.
            } catch (ErrorException $e) {
                echo $e;
                $line = null;
            }
        }

        // clean returns
        $dump = utf8_encode($out);
        $returns = explode("\r\n", $dump);

        // returns[0] holds the latest user input, so we drop that
        $stripped = array_shift($returns);
        // broadcast(new InputSent($user, $returns));
        return response()->json(["message" => "input sent", "dump" => $returns], 200);
    }

    // checks to see if certain container is running.
    public function checkStatus($id)
    {
        $docker = Docker::create();
        $ids = [];
        $containers = $docker->containerList();

        foreach ($containers as $container) {
            array_push($ids, $container->getId());
        }
        return response()->json(['data' => $ids], 200);
    }

    // gets all logs from container ID
    public function getLogs($id)
    {
        $docker = Docker::create();
        // $id is container_id

        // HOPEFULLY this won't fail once container is dead.
        $webSocketStream = $docker->containerAttachWebsocket($id, [
            "logs" => true,
            "stream" => true,
            "stdout" => true,
            "stderr" => true,
            "stdin" => true,
        ]);

        // grab logs
        $line = $webSocketStream->read(); 
        $out = "";

        while ($line != null) {
            $out .= $line;
            try {
                $line = $webSocketStream->read();
                // this is in reference to an error found in the 
                // fread() of ./docker-php/src/Stream AttachWebSocketStream.php @line 164 
                // ... final solution there. This should do nothing, but I'm scared.
            } catch (ErrorException $e) {
                echo $e;
                $line = null;
            }
        }

        // clean returns
        $dump = utf8_encode($out);
        $returns = explode("\r\n", $dump);

        // check if still running
        $flag = false;
        $containers = $docker->containerList();

        foreach ($containers as $container) {
            if ($container->getId() == $id) {
                // container is running still
                $flag = true;
            }
        }

        return response()->json(["message" => "logs retrieved.", "dump" => $returns, 'isRunning' => $flag], 200);
    }

    /*
    public function spinNoStart(Request $request, $id)
    {
        $user = Auth::user();
        $validData = $request->validate([
            'lang' => 'required'
        ]);
        $head = "submissions/" . $user->fsc_id . "/" . $id;

        $docker = Docker::create();
        $containerConfig = new ContainersCreatePostBody();
        $hostConfig = new HostConfig();
        $mountsConfig = new Mount();
        if (strcasecmp($validData['lang'], 'python') == 0) {
            $containerConfig->setImage('python');
            $containerConfig->setCmd(['submission.py']);
            $containerConfig->setEntrypoint(["python3"]);
            $containerConfig->setAttachStdin(true);
            $containerConfig->setAttachStdout(true);
            $containerConfig->setAttachStderr(true);
            $containerConfig->setTty(true);
            $containerConfig->setOpenStdin(true);
            $containerConfig->setWorkingDir('/usr/src');
        } else {
            $containerConfig->setImage('openjdk');
            $containerConfig->setCmd(['run.sh']);
            $containerConfig->setEntrypoint(["bash"]);
            $containerConfig->setAttachStdin(true);
            $containerConfig->setAttachStdout(true);
            $containerConfig->setAttachStderr(true);
            $containerConfig->setTty(true);
            $containerConfig->setOpenStdin(true);
            $containerConfig->setWorkingDir('/usr/src');

            // copy in bash file
            $bash = Storage::disk('local')->path('run.sh');
            $filePath = Storage::disk('local')
                ->putFileAs($head, new File($bash), 'run.sh');
        }

        // create host config
        $mountsConfig->setType("bind");
        $mountsConfig->setSource("/home/max/mocside/storage/app/" . $head . "/");
        $mountsConfig->setTarget("/usr/src");
        $mountsConfig->setReadOnly(false);
        $hostConfig->setMounts([$mountsConfig]);
        $containerConfig->setHostConfig($hostConfig);

        // create container
        $containerCreateResult = $docker->containerCreate($containerConfig);
        $container_id = $containerCreateResult->getId();

        return response()->json(["message" => $container_id], 200);
    }

    // create output listener for given ID
    public function listen($id)
    {
        $docker = Docker::create();
        // we assume our container is not started yet
        $docker->containerStart($id);
        $attachStream = $docker->containerAttach($id, [
            'stream' => true,
            'stdin' => false,
            'stdout' => true,
            'stderr' => true
        ]);

        $this->attach($attachStream);

        // $attachStream->wait(); // this causes me to not be able to send in, I think.
        return response()->json(['message' => 'container finished'], 200);
    }

    private function attach($attachStream)
    {
        $attachStream->onStdout(function ($stdout) {
            ContainerOut::dispatch($stdout);
        });
        $attachStream->onStderr(function ($stderr) {
            ContainerOut::dispatch($stderr);
        });

        $attachStream->wait();
    }

    public function inNoOut(Request $request, $id)
    {
        $docker = Docker::create();
        $validData = $request->validate([
            'input' => 'required'
        ]);
        // we expect this container to be RUNNING
        $webSocketStream = $docker->containerAttachWebsocket($id, [
            "logs" => false,
            "stream" => true,
            "stdout" => false,
            "stderr" => false,
            "stdin" => true,
        ]);

        $webSocketStream->write($validData['input']);
        $webSocketStream->write("\n");

        return response()->json(['message' => 'input sent'], 200);
    }
    */

    /*
    * This is the old spinUp function that used
    * the docker unix socket, and was unable to
    * successfully connect to the input stream.

    public function spinUp(Request $request, $id)
    {
        // echo getcwd();
        // echo getmyuid();
        $user = Auth::user();
        $validData = $request->validate([
            'lang' => 'required',
        ]);
        // spin up container
        $socketPath = 'unix:///var/run/docker.sock';
        $socket = stream_socket_client($socketPath, $errno, $errstr);

        $host = '127.0.0.1';
        $path = '/containers/create';

        $packet  = "POST {$path} HTTP/1.0\r\n";
        $packet .= "Host: {$host}\r\n";
        $packet .= "Content-type: application/json\r\n";

        if (strcasecmp($validData['lang'], 'python') == 0) {
            $dockerArgs = array(
                "Image" => "python",
                "Cmd" => "submission.py",
                "Entrypoint" => ["python3"],
                "AttachStdin" => true,
                "AttachStdout" => true,
                "AttachStderr" => true,
                "OpenStdin" => true,
                "Tty" => true,
                "WorkingDir" => "/usr/src",
                "HostConfig" => array(
                    "Mounts" => [array(
                        "Target" => "/usr/src",
                        "Source" => "/home/max/mocside/storage/app/submissions/" . $user->fsc_id . "/" . $id . "/",
                        "Type" => "bind",
                        "ReadOnly" => false,
                    )],
                ),
            );
            $convertedArgs = json_encode($dockerArgs);
            $packet .= "Content-length: " . strlen($convertedArgs) . "\r\n";
            $packet .= "Connection: Keep-Alive\r\n\r\n";
            $packet .= $convertedArgs;

            // echo $packet . "\r\n\r\n"; // for debug/demonstration 

            fwrite($socket, $packet);
            $res = fread($socket, 4096) . "\n";
            fclose($socket);
        } else {
            // come back here
            $dockerArgs = http_build_query([
                "Image" => "java",
                "Cmd" => ["main.java;", "java", "main"],
                "Entrypoint" => ["javac"],
                "AttachStdin" => true,
                "AttachStdout" => true,
                "AttachStderr" => true,
                "OpenStdin" => true,
                "Tty" => true,
                "WorkingDir" => "/usr/src",
                "HostConfig" => array(
                    "Mounts" => [array(
                        "Target" => "/usr/src",
                        "Source" => "/home/max/mocside/storage/app/submissions/" . $user->fsc_id . "/" . $id . "/",
                        "Type" => "bind",
                        "ReadOnly" => false,
                    )],
                ),
            ]);
            $convertedArgs = json_encode($dockerArgs);
            $packet .= "Content-length: " . strlen($convertedArgs) . "\r\n";
            $packet .= "Connection: Keep-Alive\r\n\r\n";
            $packet .= $convertedArgs;
            fwrite($socket, $packet);
            $res = fread($socket, 4096) . "\n";
            fclose($socket);
        }
        // get ID of newly created 
        // echo $res."\n";
        $parts = explode("\n", $res);
        $idLoc = count($parts) - 3;
        $id = json_decode($parts[$idLoc])->Id;

        // start container
        $path = "/containers/" . $id . "/start";
        $packet2 = "POST {$path} HTTP/1.0\r\n";
        $packet2 .= "Host: {$host}\r\n";
        $packet2 .= "Connection: Keep-Alive\r\n\r\n";
        // re-open socket
        $socket = stream_socket_client($socketPath, $errno, $errstr);
        fwrite($socket, $packet2);
        $res2 = fread($socket, 4096) . "\n";
        fclose($socket);
        // echo $res2."\n";

        // currently expecting this to die immediately upon echo.
        // how do we create the container that can persist as a workspace? Investigate next.

        // attach to ws? -> from front end w/ ID
        return response()->json(["message" => $id], 200);
    }
    */
}
