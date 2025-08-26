<?php

use App\Models\Complaint;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

uses(\Illuminate\Foundation\Testing\RefreshDatabase::class);

test('public can view complaints index', function () {
    Complaint::factory(5)->create();

    $this->get('/complaints')
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('complaints/index')
            ->has('complaints.data', 5)
            ->has('stats')
        );
});

test('public can view complaint create form', function () {
    $this->get('/complaints/create')
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('complaints/create')
        );
});

test('public can create complaint', function () {
    $complaintData = [
        'title' => 'Jalan berlubang di RT 01',
        'description' => 'Jalan di RT 01 banyak lubang dan berbahaya untuk dilalui.',
        'location' => 'RT 01, RW 02, Desa Sukamaju',
        'category' => 'road',
        'priority' => 'high',
        'reporter_name' => 'John Doe',
        'reporter_email' => 'john@example.com',
        'reporter_phone' => '08123456789',
    ];

    $response = $this->post('/complaints', $complaintData);

    $response->assertRedirect();
    $this->assertDatabaseHas('complaints', $complaintData);
});

test('complaint creation requires valid data', function () {
    $this->post('/complaints', [
        'title' => '',
        'description' => 'short',
        'location' => '',
        'category' => 'invalid',
        'priority' => 'invalid',
        'reporter_name' => '',
        'reporter_email' => 'invalid-email',
    ])
    ->assertSessionHasErrors([
        'title',
        'description',
        'location',
        'category',
        'priority',
        'reporter_name',
        'reporter_email',
    ]);
});

test('public can view specific complaint', function () {
    $complaint = Complaint::factory()->create();

    $this->get("/complaints/{$complaint->id}")
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('complaints/show')
            ->where('complaint.id', $complaint->id)
            ->where('complaint.title', $complaint->title)
        );
});

test('authenticated user can access dashboard', function () {
    $user = User::factory()->create();
    Complaint::factory(3)->create();

    $this->actingAs($user)
        ->get('/dashboard')
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('dashboard')
            ->has('complaints.data')
            ->has('stats')
            ->has('categoryStats')
        );
});

test('authenticated user can edit complaint', function () {
    $user = User::factory()->create();
    $complaint = Complaint::factory()->create(['status' => 'pending']);

    $this->actingAs($user)
        ->get("/complaints/{$complaint->id}/edit")
        ->assertStatus(200)
        ->assertInertia(fn (Assert $page) => $page
            ->component('complaints/edit')
            ->where('complaint.id', $complaint->id)
        );
});

test('authenticated user can update complaint status', function () {
    $user = User::factory()->create();
    $complaint = Complaint::factory()->create(['status' => 'pending']);

    $updateData = [
        'status' => 'in_progress',
        'priority' => 'high',
        'admin_notes' => 'Sedang dalam penanganan oleh tim teknis.',
    ];

    $this->actingAs($user)
        ->put("/complaints/{$complaint->id}", $updateData)
        ->assertRedirect('/dashboard');
        
    $this->assertDatabaseHas('complaints', [
        'id' => $complaint->id,
        'status' => 'in_progress',
        'priority' => 'high',
        'admin_notes' => 'Sedang dalam penanganan oleh tim teknis.',
    ]);
});

test('resolving complaint sets resolved_at timestamp', function () {
    $user = User::factory()->create();
    $complaint = Complaint::factory()->create(['status' => 'pending']);

    $this->actingAs($user)
        ->put("/complaints/{$complaint->id}", [
            'status' => 'resolved',
            'priority' => 'medium',
            'admin_notes' => 'Masalah telah diperbaiki.',
        ]);

    $complaint->refresh();
    expect($complaint->status)->toBe('resolved');
    expect($complaint->resolved_at)->not->toBeNull();
});

test('unauthenticated user cannot edit complaints', function () {
    $complaint = Complaint::factory()->create();

    $this->get("/complaints/{$complaint->id}/edit")
        ->assertRedirect('/login');
});

test('unauthenticated user cannot update complaints', function () {
    $complaint = Complaint::factory()->create();

    $this->put("/complaints/{$complaint->id}", [
        'status' => 'resolved',
        'priority' => 'low',
        'admin_notes' => 'Test note',
    ])
    ->assertRedirect('/login');
});