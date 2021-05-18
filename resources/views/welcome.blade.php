<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>{{env('APP_NAME')}} | pageName</title>
        <link rel="shortcut icon" href="img/icon.png">
        <!-- Bootstrap 4.5 CSS -->
        <link rel="stylesheet" href="../css/bootstrap.min.css">
        <!-- Style CSS -->
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
        <!-- Google Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700&display=swap" rel="stylesheet">
    </head>
    <body>
        <div id="app">
            <app></app>
        </div>

        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
