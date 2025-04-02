<!-- Database Config -->

<?php
  require 'vendor/autoload.php';

  use Illuminate\Database\Capsule\Manager as Capsule;

  // Initialize Eloquent ORM
  $capsule = new Capsule;

  $capsule->addConnection([
      'driver'    => 'mysql',
      'host'      => '127.0.0.1',
      'database'  => 'font_database',
      'username'  => 'root',
      'password'  => '',
      'charset'   => 'utf8',
      'collation' => 'utf8_unicode_ci',
      'prefix'    => '',
  ]);

  // Make this Capsule instance globally available
  $capsule->setAsGlobal();
  $capsule->bootEloquent();

  echo "Database connection successful!";
