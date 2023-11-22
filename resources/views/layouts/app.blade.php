<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title', 'ПИН')</title>
    <link href="/assets/style.css" rel="stylesheet">
    <script src="{{assetNoCache('assets/script.js')}}"></script>
    <script src="/assets/script.js"></script>
</head>
<body>
    @yield('content')
</body>
