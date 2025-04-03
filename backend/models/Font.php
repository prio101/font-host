<?php
  namespace backend\models;
  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\Eloquent\SoftDeletes;
  use Illuminate\Database\Eloquent\Factories\HasFactory;

  class Font extends Model {
    use HasFactory, SoftDeletes;

      protected $table = 'fonts';
      protected $fillable = ['name', 'status', 'url'];
      public $timestamps = true;


      protected $casts = [
          'created_at' => 'datetime',
          'updated_at' => 'datetime',
          'deleted_at' => 'datetime',
      ];

    }
  ?>
