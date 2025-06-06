<?php
  namespace backend\requestFormattor;

  use Rakit\Validation\Validator;
  use voku\helper\AntiXSS;

  class FontGroupCheck
  {
      public function __construct()
      {
          $this->validator = new Validator;
          $this->antiXss = new AntiXSS();
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

      public function checkxss($object){
          $object = $this->antiXss->xss_clean($object);
          return $object;
      }
  }
