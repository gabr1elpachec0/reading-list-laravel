<?php

use App\Http\Controllers\ReadingListController;
use Illuminate\Support\Facades\Route;

Route::get('reading-list', [ReadingListController::class, 'index']);
Route::post('reading-list', [ReadingListController::class, 'store']);
Route::patch('reading-list/{book}', [ReadingListController::class, 'update']);
Route::delete('reading-list/{book}', [ReadingListController::class, 'destroy']);
