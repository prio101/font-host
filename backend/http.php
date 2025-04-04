<?php

  require __DIR__ . '/../vendor/autoload.php';
  require __DIR__ . '/config/database.php'; // Include database configuration

  use Bramus\Router\Router;
  use backend\controllers\FontsController; // Import the FontsController class

  $router = new Router();

  $router->get('/', function() {
      echo json_encode(['message' => 'Welcome to the Font Group System API']);
  });

  // resources fonts
  $router->get('/fonts', function() {
      $controller = new FontsController(); // Instantiate the class
      echo $controller->index(); // Call the index method
  });



  // Execute the router
  $router->run();
