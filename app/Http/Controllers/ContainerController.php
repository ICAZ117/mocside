<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use Docker\Docker;
use Docker\API\Model\ContainersCreatePostBody;

class ContainerController extends Controller
{   
    /*
    *   This function will allow the user to start a container
    *   and then hopefully be able to attach to it to provide
    *   valid input to their program.
    *
    */
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

        if (strcasecmp($validData['lang'], 'python') == 0)
        {
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
                        "Source" => "/home/max/mocside/storage/app/submissions/".$user->fsc_id."/".$id."/",
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
            $res = fread($socket, 4096)."\n";
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
                        "Source" => "/home/max/mocside/storage/app/submissions/".$user->fsc_id."/".$id."/",
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
            $res = fread($socket, 4096)."\n";
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
        $res2 = fread($socket, 4096)."\n";
        fclose($socket);
        // echo $res2."\n";

        // currently expecting this to die immediately upon echo.
        // how do we create the container that can persist as a workspace? Investigate next.

        // attach to ws? -> from front end w/ ID
        return response()->json(["message" => $id], 200);
    }

    /*
    *   This function will force stop and
    *   delete a container based on it's ID.
    *   This may be useful for cleanup.
    *
    */

    public function spinDown($id)
    {
        // shutdown active container by ID
        $user = Auth::user();
        // $id is container ID
        $path = "/containers/" . $id ."?force=true";
        $host = '127.0.0.1';

        $packet = "DELETE {$path} HTTP/1.0\r\n";
        $packet .= "Host: {$host}\r\n";
        $packet .= "Connection: Close\r\n\r\n";

        // delete container
        $socketPath = 'unix:///var/run/docker.sock';
        $socket = stream_socket_client($socketPath, $errno, $errstr);
        fwrite($socket, $packet);
        $res = fread($socket, 4096)."\n";
        fclose($socket);

        return response()->json(["message" => $res], 200);
    }

    public function runTest()
    {
        // run test on saved code

        // return full output... maybe handled by ws
    }

    public function grade(Request $request, $id)
    {
        // grade :)
        // I expect this to be the hardest function... Let's break it down.
        // We need the student's code, plus all of the test cases to check.
        // Then, we need to run the code several times with the various TCs

        // First, let's get out test cases
        // $id is assignment_id
        $user = Auth::user();
        $validData = $request->validate([
            'lang' => 'required',
        ]);
        $assignment = Assignment::find($id);
        $test_cases = $assignment->test_cases;

        // now, lets create a container instance in the right language over the submission space
        $socketPath = 'unix:///var/run/docker.sock';
        $socket = stream_socket_client($socketPath, $errno, $errstr);

        $host = '127.0.0.1';
        $path = '/containers/create';
        
        $packet  = "POST {$path} HTTP/1.0\r\n";
        $packet .= "Host: {$host}\r\n";
        $packet .= "Content-type: application/json\r\n";

        if (strcasecmp($validData['lang'], 'python') == 0)
        {
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
                        "Source" => "/home/max/mocside/storage/app/submissions/".$user->fsc_id."/".$id."/",
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
            $res = fread($socket, 4096)."\n";
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
                        "Source" => "/home/max/mocside/storage/app/submissions/".$user->fsc_id."/".$id."/",
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
            $res = fread($socket, 4096)."\n";
            fclose($socket);
        }
        // get ID of newly created 
        // echo $res."\n";
        $parts = explode("\n", $res);
        $idLoc = count($parts) - 3;
        $id = json_decode($parts[$idLoc])->Id;
        return 0;
    }


    public function test()
    {
        $socketPath = 'unix:///var/run/docker.sock';
        $socket = stream_socket_client($socketPath, $errno, $errstr);

        $host = '127.0.0.1';
        $path = '/containers/create';
        
        $packet  = "POST {$path} HTTP/1.0\r\n";
        $packet .= "Host: {$host}\r\n";
        $packet .= "Content-type: application/json\r\n";

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
                    "Source" => "/home/max/mocside/storage/app/submissions/1237419/23/",
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
        $res = fread($socket, 4096)."\n";
        fclose($socket);

        // get ID of newly created 
        // echo $res."\n";
        $parts = explode("\n", $res);
        $idLoc = count($parts) - 3;
        $container_id = json_decode($parts[$idLoc])->Id;

        // start container
        $path = "/containers/" . $container_id . "/start";
        $packet2 = "POST {$path} HTTP/1.0\r\n";
        $packet2 .= "Host: {$host}\r\n";
        $packet2 .= "Connection: Keep-Alive\r\n\r\n";
        // re-open socket
        $socket = stream_socket_client($socketPath, $errno, $errstr);
        fwrite($socket, $packet2);
        $res2 = fread($socket, 4096)."\n";
        fclose($socket);

        // now, try and attach?
        // we want to make a stream out of the attach endpoint
        $entrypoint = "localhost/v1.41";
        $query = "?stdin=1?stdout=1?stderr=1?logs=1?stream=1";
        $endpoint = "/containers/" . $container_id . "/attach";
        $stream = stream_socket_client($entrypoint . $endpoint . $query, $errno, $errstr);
        fwrite($stream, "foo");
        $res3 = fread($socket, 4096)."\n";
        fclose($socket);
        echo $res3;
        return 0;
    }

    public function list()
    {
        $docker = Docker::create();
        $containers = $docker->containerList();

        foreach ($containers as $container) {
            var_dump($container->getNames());
        }
    }

    public function spinWLib()
    {
        $docker = Docker::create();
        $containerConfig = new ContainersCreatePostBody();
        $containerConfig->setImage('python');
        $containerConfig->setCmd(['echo', 'hello world']);
        $containerCreateResult = $docker->containerCreate($containerConfig);
        return response()->json(["message" => $containerCreateResult], 200);
    }
}