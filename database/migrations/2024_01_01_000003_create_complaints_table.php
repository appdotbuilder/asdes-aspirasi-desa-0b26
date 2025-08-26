<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('complaints', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->string('location');
            $table->enum('category', ['road', 'water', 'electricity', 'bridge', 'drainage', 'public_facility', 'other'])
                ->comment('Infrastructure category');
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium')
                ->comment('Priority level of the complaint');
            $table->enum('status', ['pending', 'in_progress', 'resolved', 'rejected'])->default('pending')
                ->comment('Current status of the complaint');
            $table->string('reporter_name');
            $table->string('reporter_email');
            $table->string('reporter_phone')->nullable();
            $table->text('admin_notes')->nullable()->comment('Notes from village administration');
            $table->timestamp('resolved_at')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('status');
            $table->index('category');
            $table->index('priority');
            $table->index(['status', 'created_at']);
            $table->index(['category', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('complaints');
    }
};