<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Complaint;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'Admin Desa',
            'email' => 'admin@desa.go.id',
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create sample complaints
        Complaint::factory(25)->create();
        
        // Create some pending complaints
        Complaint::factory(8)->pending()->create();
        
        // Create some resolved complaints
        Complaint::factory(12)->resolved()->create();
    }
}
