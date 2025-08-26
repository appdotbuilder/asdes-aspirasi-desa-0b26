<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Complaint
 *
 * @property int $id
 * @property string $title
 * @property string $description
 * @property string $location
 * @property string $category
 * @property string $priority
 * @property string $status
 * @property string $reporter_name
 * @property string $reporter_email
 * @property string|null $reporter_phone
 * @property string|null $admin_notes
 * @property \Illuminate\Support\Carbon|null $resolved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint query()
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint wherePriority($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereReporterName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereReporterEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereReporterPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereAdminNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereResolvedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint pending()
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint resolved()
 * @method static \Illuminate\Database\Eloquent\Builder|Complaint byCategory(string $category)
 * @method static \Database\Factories\ComplaintFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Complaint extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'title',
        'description',
        'location',
        'category',
        'priority',
        'status',
        'reporter_name',
        'reporter_email',
        'reporter_phone',
        'admin_notes',
        'resolved_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'resolved_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'complaints';

    /**
     * Get the category display name.
     *
     * @return string
     */
    public function getCategoryDisplayAttribute()
    {
        $categories = [
            'road' => 'Jalan',
            'water' => 'Air Bersih',
            'electricity' => 'Listrik',
            'bridge' => 'Jembatan',
            'drainage' => 'Drainase',
            'public_facility' => 'Fasilitas Umum',
            'other' => 'Lainnya',
        ];

        return $categories[$this->category] ?? $this->category;
    }

    /**
     * Get the priority display name.
     *
     * @return string
     */
    public function getPriorityDisplayAttribute()
    {
        $priorities = [
            'low' => 'Rendah',
            'medium' => 'Sedang',
            'high' => 'Tinggi',
            'urgent' => 'Mendesak',
        ];

        return $priorities[$this->priority] ?? $this->priority;
    }

    /**
     * Get the status display name.
     *
     * @return string
     */
    public function getStatusDisplayAttribute()
    {
        $statuses = [
            'pending' => 'Menunggu',
            'in_progress' => 'Sedang Ditangani',
            'resolved' => 'Selesai',
            'rejected' => 'Ditolak',
        ];

        return $statuses[$this->status] ?? $this->status;
    }

    /**
     * Scope a query to only include pending complaints.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include resolved complaints.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeResolved($query)
    {
        return $query->where('status', 'resolved');
    }

    /**
     * Scope a query to filter by category.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $category
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }
}