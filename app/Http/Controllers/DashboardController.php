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
            ->selectRaw("sum(case when status = 'reading' then 1 else 0 end) as reading")
            ->selectRaw("sum(case when status = 'read' then 1 else 0 end) as `read`")
            ->selectRaw("sum(case when status = 'want_to_read' then 1 else 0 end) as want_to_read")
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
