<?php

require 'backend/config/database.php';
require 'backend/models/Font.php';



// Insert a new font
$font = Font::create([
    'name'  => 'John Doe',
    'url' => 'https://example.com/bucket/file.ttf',
    'status' => 'active',
]);

echo "Font added: " . $font->name . "\n";

// Retrieve all Fonts
$fonts = Font::all();
foreach ($fonts as $font) {
    echo $font->name . " - " . $font->email . "\n";
}
