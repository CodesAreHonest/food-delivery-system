<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="{{asset('css/app.css')}}">

    <title>Food Delivery</title>
</head>
    <body>
        <div id="food_delivery"></div>
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
