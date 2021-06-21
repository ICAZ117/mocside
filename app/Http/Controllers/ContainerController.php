<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class ContainerController extends Controller
{
    public function spinUp(Request $request)
    {   
        $validData = $request->validate([
            'lang' => 'required',
        ]);
        // spin up container
        $socketPath = 'unix:///var/run/docker.sock';
        $socket = stream_socket_client($socketPath, $errno, $errstr);
        if(!$socket) {
            echo "$errstr ($errno)<br />\n";
        }
        $host = '127.0.0.1';
        $path = '/containers/create';
        
        $packet  = "POST {$path} HTTP/1.0\r\n";
        $packet .= "Host: {$host}\r\n";
        $packet .= "Connection: close\r\n\r\n";
        $packet .= "Content-type: application/x-www-form-urlencoded\r\n";

        if (strcasecmp($validData['lang'], 'python') == 0)
        {
            $dockerArgs = array(
                "Image" => "python", 
                "Cmd" => ["echo", "hello world"]
            );
            $options = array(
                'http' => array(
                    'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
                    'method'  => 'POST',
                    'content' => http_build_query($dockerArgs),
                )
            );

            $context  = stream_context_create($options);

            $socket = stream_socket_client($socketPath, $errno, $errstr, ini_get("default_socket_timeout"), STREAM_CLIENT_CONNECT, $context);

            fwrite($socket, $packet);
            $res = fread($socket, 4096)."\n";
            fclose($socket);
            return $res;
        } else {
            $dockerArgs = http_build_query([
                "Image" => "java", 
                "Cmd" => ["echo", "hello world"]
            ]);
            fwrite($socket, $packet);
            fwrite($socket, $dockerArgs);
            $res = fread($socket, 4096)."\n";
            fclose($socket);
            return $res;
        }
        // attach to ws?
    }

    public function runTest()
    {
        // run test on saved code

        // return full output... maybe handled by ws
    }

    public function grade()
    {
        // grade :)
    }

    public function test()
    {
        // test sockets
        $socketPath = 'unix:///var/run/docker.sock';
        echo $socketPath . '\n';
        // $socket = stream_socket_client($socketPath, $errno, $errstr);
        // $host = '127.0.0.1';
        $path = '/containers/json?all=true';
        // $packet  = "GET {$path} HTTP/1.0\r\n";
        // $packet .= "Host: {$host}\r\n";
        // $packet .= "Connection: close\r\n\r\n";
        // fwrite($socket, $packet);
        // $res = fread($socket, 4096)."\n";
        // fclose($socket);
        // return $res;

        // curl
        $stream = curl_init();

        // $headers = array(
        //     'Accept: application/json',
        //     'Content-Type: application/json',
        // );
        echo $stream . '\n';
        // curl_setopt($stream, CURLOPT_POST, true);
        // curl_setopt($stream, CURLOPT_POSTFIELDS, )
        curl_setopt($stream, CURLOPT_URL, $path);
        curl_setopt($stream, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($stream, CURLOPT_UNIX_SOCKET_PATH, $socketPath);

        $res = curl_exec($stream);
        curl_close($stream);
        return response()->json(['message' => $res], 200);
    }
}