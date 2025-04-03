<?php

  namespace backend\controllers;
  use backend\models\FontGroup;
  use backend\models\Font;
  use backend\serializers\FontGroupsSerializer;

  class FontGroupsController extends BaseController
  {
      public function index()
      {
          $fontGroups = FontGroup::where('deleted_at', null)->get();

          $serializer = new FontGroupsSerializer();
          return $serializer->serialize($fontGroups);
      }

      public function show($id)
      {
          $fontGroup = FontGroup::find($id);
          if (!$fontGroup) {
              return json_encode(['status' => 'error',
                                  'message' => 'Font group not found']);
          }

          $serializer = new FontGroupsSerializer();
          return $serializer->serialize($fontGroup);
      }

      public function store()
      {
          $req_data = $this->request->getContent();

          $data = json_decode($req_data, true);

          $fontGroup = new FontGroup();

          $fontGroup->name = $data['name'];

          if (isset($data['fonts'])) {
              $fontGroup->fonts()->attach($data['fonts']);
          }

          $fontGroup->save();

          return json_encode($fontGroup);
      }

  }
