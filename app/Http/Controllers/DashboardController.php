<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        $statusCounts = $request->user()
            ->books()
            ->toBase()
            ->selectRaw("count(*) as total")
            ->selectRaw("count(*) filter (where status = 'reading') as reading")
            ->selectRaw("count(*) filter (where status = 'read') as read")
            ->selectRaw("count(*) filter (where status = 'want_to_read') as want_to_read")
            ->first();

        return Inertia::render('dashboard', [
            'counts' => [
                'total' => (int) $statusCounts->total,
                'reading' => (int) $statusCounts->reading,
                'read' => (int) $statusCounts->read,
                'want_to_read' => (int) $statusCounts->want_to_read,
            ],
        ]);
    }
}
