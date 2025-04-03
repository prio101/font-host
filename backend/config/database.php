<?php
  require __DIR__ . '/../../vendor/autoload.php';

  use Illuminate\Database\Capsule\Manager as Capsule;

  // Initialize Eloquent ORM
  $capsule = new Capsule;

  $capsule->addConnection([
      'driver'    => 'mysql',
      'host'      => '127.0.0.1',
      'database'  => getenv('DATABASE_NAME') ?: 'font_database',
      'username'  => getenv('DATABASE_USER') ?: 'root',
      'password'  => getenv('DATABASE_PASSWORD') ?: 'password',
      'charset'   => 'utf8',
      'collation' => 'utf8_unicode_ci',
      'prefix'    => '',
  ]);

  // Make this Capsule instance globally available
  $capsule->setAsGlobal();
  $capsule->bootEloquent();

  // Enable query logging
  $capsule->getConnection()->enableQueryLog();


