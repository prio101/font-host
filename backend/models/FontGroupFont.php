<?php
  namespace backend\models;
  use Illuminate\Database\Eloquent\Model;
  use Illuminate\Database\Eloquent\SoftDeletes;
  use Illuminate\Database\Eloquent\Factories\HasFactory;
  use backend\models\Font;
  use backend\models\FontGroup;
  use backend\models\FontGroupFont;

  class FontGroupFont extends Model
  {
      use HasFactory, SoftDeletes;

      protected $table = 'font_group_fonts_table';

      protected $fillable = ['font_group_id', 'font_id', 'font_size', 'font_name'];

      public $timestamps = true;

      protected $casts = [
          'created_at' => 'datetime',
          'updated_at' => 'datetime',
          'deleted_at' => 'datetime',
      ];

      public function fontGroup()
      {
          return $this->belongsTo(FontGroup::class, 'font_group_id');
      }

      public function font()
      {
          return $this->belongsTo(Font::class, 'font_id');
      }
  }
