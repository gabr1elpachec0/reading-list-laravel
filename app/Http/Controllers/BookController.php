<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class BookController extends Controller
{
    public function search(Request $request)
    {
        $request->validate([
            'query' => ['required', 'string', 'min:2'],
        ]);

        $response = Http::get('https://openlibrary.org/search.json', [
            'q' => $request->query('query'),
            'limit' => 20,
            'fields' => 'title,author_name,first_publish_year,cover_i',
        ]);

        $books = collect($response->json('docs', []))->map(fn (array $doc) => [
            'title' => $doc['title'] ?? null,
            'author' => $doc['author_name'][0] ?? 'Autor desconhecido',
            'publish_year' => $doc['first_publish_year'] ?? null,
            'cover_id' => $doc['cover_i'] ?? null,
        ]);

        return response()->json($books);
    }
}
