<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
        $host = '127.0.0.1';
        $path = '/containers/json?all=true';
        $packet  = "GET {$path} HTTP/1.0\r\n";
        $packet .= "Host: {$host}\r\n";
        $packet .= "Connection: close\r\n\r\n";
        fwrite($socket, $packet);
        $res = fread($socket, 4096)."\n";
        fclose($socket);
        return $res;

        // test with laravel http to local unix path
    }
}