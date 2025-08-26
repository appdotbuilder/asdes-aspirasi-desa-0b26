<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreComplaintRequest;
use App\Http\Requests\UpdateComplaintRequest;
use App\Models\Complaint;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ComplaintController extends Controller
{
    /**
     * Display a listing of complaints (public view).
     */
    public function index()
    {
        $complaints = Complaint::latest()
            ->select(['id', 'title', 'location', 'category', 'status', 'created_at'])
            ->paginate(10);

        $stats = [
            'total' => Complaint::count(),
            'pending' => Complaint::where('status', 'pending')->count(),
            'in_progress' => Complaint::where('status', 'in_progress')->count(),
            'resolved' => Complaint::where('status', 'resolved')->count(),
        ];

        return Inertia::render('complaints/index', [
            'complaints' => $complaints,
            'stats' => $stats,
        ]);
    }

    /**
     * Show the form for creating a new complaint.
     */
    public function create()
    {
        return Inertia::render('complaints/create');
    }

    /**
     * Store a newly created complaint.
     */
    public function store(StoreComplaintRequest $request)
    {
        $complaint = Complaint::create($request->validated());

        return redirect()->route('complaints.show', $complaint)
            ->with('success', 'Laporan berhasil dikirim. Kami akan segera menindaklanjuti laporan Anda.');
    }

    /**
     * Display the specified complaint.
     */
    public function show(Complaint $complaint)
    {
        return Inertia::render('complaints/show', [
            'complaint' => $complaint,
        ]);
    }

    /**
     * Show the form for editing the complaint (admin only).
     */
    public function edit(Complaint $complaint)
    {
        return Inertia::render('complaints/edit', [
            'complaint' => $complaint,
        ]);
    }

    /**
     * Update the complaint status and notes (admin only).
     */
    public function update(UpdateComplaintRequest $request, Complaint $complaint)
    {
        $data = $request->validated();
        
        // Set resolved_at timestamp when status changes to resolved
        if ($data['status'] === 'resolved' && $complaint->status !== 'resolved') {
            $data['resolved_at'] = now();
        }
        
        // Clear resolved_at if status is changed from resolved
        if ($data['status'] !== 'resolved') {
            $data['resolved_at'] = null;
        }

        $complaint->update($data);

        return redirect()->route('dashboard')
            ->with('success', 'Status laporan berhasil diperbarui.');
    }
}