<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    protected $table = 'food';

    protected $fillable = [
        's_name',
        'f_price',
        's_category',
        's_description',
        's_image'
    ];
}
