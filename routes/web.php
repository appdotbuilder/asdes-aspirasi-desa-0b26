<?php

use App\Http\Controllers\ComplaintController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

// Public complaint routes
Route::resource('complaints', ComplaintController::class)
    ->only(['index', 'create', 'store', 'show']);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $complaints = \App\Models\Complaint::with([])
            ->latest()
            ->paginate(15);
            
        $stats = [
            'total' => \App\Models\Complaint::count(),
            'pending' => \App\Models\Complaint::where('status', 'pending')->count(),
            'in_progress' => \App\Models\Complaint::where('status', 'in_progress')->count(),
            'resolved' => \App\Models\Complaint::where('status', 'resolved')->count(),
            'rejected' => \App\Models\Complaint::where('status', 'rejected')->count(),
        ];
        
        $categoryStats = \App\Models\Complaint::selectRaw('category, count(*) as count')
            ->groupBy('category')
            ->pluck('count', 'category')
            ->toArray();
        
        return Inertia::render('dashboard', [
            'complaints' => $complaints,
            'stats' => $stats,
            'categoryStats' => $categoryStats,
        ]);
    })->name('dashboard');
    
    // Admin complaint management routes
    Route::resource('complaints', ComplaintController::class)
        ->only(['edit', 'update']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
