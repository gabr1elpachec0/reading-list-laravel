<?php

use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', fn () => request()->user());

    require __DIR__.'/api/books.php';
    require __DIR__.'/api/reading-list.php';
});
