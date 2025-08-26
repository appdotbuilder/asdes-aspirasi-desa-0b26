<?php

namespace Database\Factories;

use App\Models\Complaint;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Complaint>
 */
class ComplaintFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\Complaint>
     */
    protected $model = Complaint::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $categories = ['road', 'water', 'electricity', 'bridge', 'drainage', 'public_facility', 'other'];
        $priorities = ['low', 'medium', 'high', 'urgent'];
        $statuses = ['pending', 'in_progress', 'resolved', 'rejected'];

        $titles = [
            'road' => ['Jalan berlubang di RT 01', 'Akses jalan rusak parah', 'Jalan becek saat hujan'],
            'water' => ['Air PDAM tidak mengalir', 'Kualitas air keruh', 'Pipa air bocor'],
            'electricity' => ['Lampu jalan mati', 'Listrik sering padam', 'Tiang listrik roboh'],
            'bridge' => ['Jembatan retak', 'Jembatan ambles', 'Pagar jembatan rusak'],
            'drainage' => ['Selokan tersumbat', 'Drainase overflow', 'Saluran air rusak'],
            'public_facility' => ['Balai desa rusak', 'Posyandu perlu perbaikan', 'Musholla bocor'],
            'other' => ['Fasilitas umum lainnya', 'Masalah infrastruktur', 'Keluhan warga'],
        ];

        $category = $this->faker->randomElement($categories);
        $title = $this->faker->randomElement($titles[$category]);

        return [
            'title' => $title,
            'description' => $this->faker->paragraph(3),
            'location' => 'RT ' . $this->faker->numberBetween(1, 10) . ', RW ' . $this->faker->numberBetween(1, 5) . ', Desa ' . $this->faker->city,
            'category' => $category,
            'priority' => $this->faker->randomElement($priorities),
            'status' => $this->faker->randomElement($statuses),
            'reporter_name' => $this->faker->name,
            'reporter_email' => $this->faker->safeEmail,
            'reporter_phone' => $this->faker->phoneNumber,
            'admin_notes' => $this->faker->optional(0.3)->paragraph(),
            'resolved_at' => $this->faker->optional(0.3)->dateTimeBetween('-1 month', 'now'),
        ];
    }

    /**
     * Indicate that the complaint is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'resolved_at' => null,
            'admin_notes' => null,
        ]);
    }

    /**
     * Indicate that the complaint is resolved.
     */
    public function resolved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'resolved',
            'resolved_at' => $this->faker->dateTimeBetween('-1 month', 'now'),
            'admin_notes' => $this->faker->paragraph(),
        ]);
    }
}