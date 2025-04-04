<?php
  namespace backend\requestFormattor;

  use Rakit\Validation\Validator;

  class FontGroupCheck
  {
      public function __construct()
      {
          $this->validator = new Validator;
      }

      public function checkFontGroup($request)
      {
          $validation = $this->validator->make($request, [
            'name' => 'required',
            'fonts' => 'required|array|min:2',
          ]);

          $validation->validate();

          if ($validation->fails()) {
             return false;
          }

          return true;
      }
  }
