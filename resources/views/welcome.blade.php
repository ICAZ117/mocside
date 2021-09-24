<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>{{env('APP_NAME')}}</title>
        <link rel="shortcut icon" href="{{ asset('img/icon.png') }}">
        <!-- Style CSS -->
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    </head>
    <body id="thisIsTheDumbestThingIHaveEverHadToDo">
        <div id="app">
            <app></app>
        </div>

        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
