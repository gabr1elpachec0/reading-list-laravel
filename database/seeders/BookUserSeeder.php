<?php

namespace Database\Seeders;

use App\Enums\ReadingStatus;
use App\Models\Book;
use App\Models\User;
use Illuminate\Database\Seeder;

class BookUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first();

        $walden     = Book::where('title', 'Walden')->first();
        $algoritmos = Book::where('title', 'Entendendo Algoritmos')->first();
        $sapiens    = Book::where('title', 'Sapiens')->first();

        $user->books()->attach($walden->id,     ['status' => ReadingStatus::Read]);
        $user->books()->attach($algoritmos->id, ['status' => ReadingStatus::Reading]);
        $user->books()->attach($sapiens->id,    ['status' => ReadingStatus::WantToRead]);
    }
}
