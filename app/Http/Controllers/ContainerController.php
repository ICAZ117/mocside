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

        $host = '127.0.0.1';
        $path = '/containers/create';
        
        $packet  = "POST {$path} HTTP/1.0\r\n";
        $packet .= "Host: {$host}\r\n";
        $packet .= "Connection: close\r\n\r\n";

        if (strcasecmp($validData['lang'], 'python') == 0)
        {
            $dockerArgs = http_build_query([
                "Image" => "python", 
                "Cmd" => ["echo", "hello world"]
            ]);
            // $packet .= '{"Image": "python", "Cmd": ["echo", "hello world"]}';
            $packet .= $dockerArgs;
            fwrite($socket, $packet);
            fwrite($socket, $dockerArgs);
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
        $socket = stream_socket_client($socketPath, $errno, $errstr);
        $host = '127.0.0.1';
        $path = '/containers/json?all=true';
        $packet  = "GET {$path} HTTP/1.0\r\n";
        $packet .= "Host: {$host}\r\n";
        $packet .= "Connection: close\r\n\r\n";
        fwrite($socket, $packet);
        $res = fread($socket, 4096)."\n";
        fclose($socket);
        return $res;

        
    }
}