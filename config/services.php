<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAIL_HOST'),
        // 'secret' => env('MAIL_SECRET'),
        'secret' => '5554334eab2fce90f507549c3277648c-0be3b63b-c0c54df7', // sandbox secret
        // 'endpoint' => env('MAILGUN_ENDPOINT', 'https://api.mailgun.net/v3/sandbox90aeba822e73410f8dbe354eafb29611.mailgun.org'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

];
