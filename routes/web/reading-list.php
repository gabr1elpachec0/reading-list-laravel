<?php

use App\Http\Controllers\ReadingListController;
use Illuminate\Support\Facades\Route;

Route::get('reading-list', [ReadingListController::class, 'index'])->name('reading-list.index');
Route::post('reading-list', [ReadingListController::class, 'store'])->name('reading-list.store');
Route::patch('reading-list/{book}', [ReadingListController::class, 'update'])->name('reading-list.update');
Route::delete('reading-list/{book}', [ReadingListController::class, 'destroy'])->name('reading-list.destroy');
