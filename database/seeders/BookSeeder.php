<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::create([
            'title'        => 'Walden',
            'author'       => 'Henry David Thoreau',
            'publish_year' => 1854,
            'cover_id'     => '11248037',
        ]);

        Book::create([
            'title'        => 'Entendendo Algoritmos',
            'author'       => 'Aditya Y. Bhargava',
            'publish_year' => 2017,
            'cover_id'     => '13780321',
        ]);

        Book::create([
            'title'        => 'Sapiens',
            'author'       => 'Yuval Noah Harari',
            'publish_year' => 2011,
            'cover_id'     => '8634250',
        ]);
    }
}
