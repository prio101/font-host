<?php
  namespace backend\controllers;

  require __DIR__ . '/../../vendor/autoload.php';

  use Symfony\Component\HttpFoundation\Request;

  class BaseController
  {
      protected Request $request;

      public function __construct()
      {
          $this->request = Request::createFromGlobals();
      }
  }
