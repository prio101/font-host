<?php

  require __DIR__ . '/../vendor/autoload.php';
  require __DIR__ . '/config/database.php'; // Include database configuration

  use Bramus\Router\Router;
  use backend\controllers\FontsController;
  use backend\controllers\FontGroupsController;

  // settings for the Header Resopnse
  // Enable CORS Middleware
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type, Authorization");

  // Handle preflight (OPTIONS) requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
      http_response_code(200);
      exit;
  }

  // Initialize the router with the Bramus Router
  $router = new Router();

  $router->get('/', function() {
      echo json_encode(['message' => 'Welcome to the Font Group System API']);
  });

  // resources fonts
  $router->get('/fonts', function() {
      $controller = new FontsController();
      echo $controller->index();
  });

  $router->get('/fonts/{id}', function($id) {
    $controller = new FontsController();
    echo $controller->show($id);
  });

  $router->post('/fonts', function() {
    $controller = new FontsController();
    echo $controller->store();
  });

  $router->put('/fonts/{id}', function($id) {
    $controller = new FontsController();
    echo $controller->update($id);
  });

  $router->delete('/fonts/{id}', function($id) {
    $controller = new FontsController();
    echo $controller->destroy($id);
  });


  // resources font groups
  $router->get('/font_groups', function() {
    $controller = new FontGroupsController();
    echo $controller->index();
  });

  $router->get('/font_groups/{id}', function($id) {
    $controller = new FontGroupsController();
    echo $controller->show($id);
  });

  $router->post('/font_groups', function() {
    $controller = new FontGroupsController();
    echo $controller->store();
  });

  $router->put('/font_groups/{id}', function($id) {
    $controller = new FontGroupsController();
    echo $controller->update($id);
  });


  // Execute the router
  $router->run();
