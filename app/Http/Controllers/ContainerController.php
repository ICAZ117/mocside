<?php

namespace App\Http\Controllers;

class ContainerController extends Controller
{
    public function spinUp()
    {
        // spin up container

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
        $cmd = 'GET http://localhost/1.41/containers/json?all=true';
        fwrite($socket, $cmd."\r\n");
        $res = fread($socket, 4096)."\n";
        fclose($socket);
        return response()->json(['message' => $res], 200);
    }
}