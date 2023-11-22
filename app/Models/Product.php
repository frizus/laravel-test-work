<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['ARTICLE', 'NAME', 'STATUS', 'DATA'];

    public const AVAILABLE = 'available';

    public const UNAVAILABLE = 'unavailable';

    public const STATUSES = [
        self::AVAILABLE,
        self::UNAVAILABLE,
    ];

    public function scopeAvailable($query)
    {
        return $query->where('status', static::AVAILABLE);
    }
}
