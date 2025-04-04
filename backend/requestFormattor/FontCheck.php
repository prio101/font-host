<?php
  namespace backend\requestFormattor;

  use Rakit\Validation\Validator;
  use voku\helper\AntiXSS;

  class FontCheck
  {
      public function checkFont($request)
      {
          $validation = $this->validator->make($request, [
              'name' => 'required',
              'file' => 'required',
          ]);

          $validation->validate();

          if ($validation->fails()) {
              return false;
          }

          return true;
      }

      public function checkxss($object)
      {
          $this->antiXss = new AntiXSS();
          $object = $this->antiXss->xss_clean($object);
          return $object;
      }
  }
