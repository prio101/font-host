<?php
    namespace backend\models;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\SoftDeletes;
    use Illuminate\Database\Eloquent\Factories\HasFactory;

    class FontGroup extends Model {
      use HasFactory, SoftDeletes;

      protected $table = 'font_groups';

      protected $fillable = ['name'];

      public $timestamps = true;

      protected $casts = [
          'created_at' => 'datetime',
          'updated_at' => 'datetime',
          'deleted_at' => 'datetime',
      ];

      public function fonts()
      {
          return $this->hasMany(Font::class, 'group_id');
      }

      public function getFonts()
      {
          return $this->fonts()->where('deleted_at', null)->get();
      }

    }
