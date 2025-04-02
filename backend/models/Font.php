<?php

  class Font {
    protected $table = 'fonts';  // Table name
    protected $fillable = ['name', 'status', 'url']; // Mass-assignable fields
    public $timestamps = true;  // Enable timestamps
  }
