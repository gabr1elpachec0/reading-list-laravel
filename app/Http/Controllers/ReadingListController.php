<?php

namespace App\Http\Controllers;

use App\Enums\ReadingStatus;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
class ReadingListController extends Controller
{
    public function index(Request $request)
    {
        $request->validate([
            'status' => ['nullable', Rule::enum(ReadingStatus::class)],
            'page'   => ['nullable', 'integer', 'min:1'],
        ]);

        $user = $request->user();

        $counts = [
            'all'          => $user->books()->count(),
            'reading'      => $user->books()->wherePivot('status', 'reading')->count(),
            'read'         => $user->books()->wherePivot('status', 'read')->count(),
            'want_to_read' => $user->books()->wherePivot('status', 'want_to_read')->count(),
        ];

        $query = $user->books();

        if ($status = $request->query('status')) {
            $query->wherePivot('status', $status);
        }

        $books = $query->orderByPivot('updated_at', 'desc')->paginate(5)->withQueryString();

        if ($request->wantsJson()) {
            return response()->json($books);
        }

        return Inertia::render('ReadingList/Index', [
            'books'         => $books,
            'currentStatus' => $request->query('status'),
            'counts'        => $counts,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'author' => ['required', 'string', 'max:255'],
            'publish_year' => ['nullable', 'integer'],
            'cover_id' => ['nullable', 'string'],
            'status' => ['nullable', Rule::enum(ReadingStatus::class)],
        ]);

        $book = Book::firstOrCreate(
            ['title' => $validated['title'], 'author' => $validated['author']],
            [
                'publish_year' => $validated['publish_year'] ?? null,
                'cover_id' => $validated['cover_id'] ?? null,
            ],
        );

        $request->user()->books()->syncWithoutDetaching([
            $book->id => ['status' => $validated['status'] ?? ReadingStatus::WantToRead],
        ]);

        return back();
    }

    public function update(Request $request, Book $book)
    {
        $validated = $request->validate([
            'status' => ['required', Rule::enum(ReadingStatus::class)],
        ]);

        $request->user()->books()->updateExistingPivot($book->id, [
            'status' => $validated['status'],
        ]);

        return back();
    }

    public function destroy(Book $book)
    {
        Auth::user()->books()->detach($book->id);

        return back();
    }
}
