<?php

  namespace backend\controllers;
  use backend\models\FontGroup;
  use backend\models\Font;
  use backend\models\FontGroupFont;
  use backend\serializers\FontGroupsSerializer;
  use backend\requestFormattor\FontGroupCheck;

  class FontGroupsController extends BaseController
  {
      public function index()
      {
          $fontGroups = FontGroup::where('deleted_at', null)->with('fonts')->get();

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
          $fontGroup->load('fonts');

          $serializer = new FontGroupsSerializer();
          return $serializer->serialize($fontGroup);
      }

      public function store()
      {
            $req_data = $this->request->getContent();
            $data = json_decode($req_data, true);
            $fontGroupCheck = new FontGroupCheck();

            if($fontGroupCheck->checkFontGroup($data)){
                $fontGroup = new FontGroup();
                $fontGroup->name = $data['name'];

                // Save the FontGroup first to generate an ID
                $fontGroup->save();

                if (isset($data['fonts'])) {
                    foreach ($data['fonts'] as $fontId) {
                        $font = Font::find($fontId);

                        if ($font) {
                            $fontGroupFont = new FontGroupFont();
                            $fontGroupFont->font_group_id = $fontGroup->id; // Use the saved FontGroup ID
                            $fontGroupFont->font_id = $fontId;
                            $fontGroupFont->font_size = $font->font_size;
                            $fontGroupFont->font_name = $font->name;

                            $fontGroupFont->save();
                        }
                    }
                }

                return json_encode($fontGroup);

            } else {
                return json_encode(['status' => 'error',
                                    'message' => 'Error happened during font group creation']);
            }
      }

      public function update($id){
          $req_data = $this->request->getContent();
          $data = json_decode($req_data, true);
          $fontGroup = FontGroup::find($id);

          if (!$fontGroup) {
              return json_encode(['status' => 'error',
                                  'message' => 'Font group not found']);
          }

          $fontGroup->name = $data['name'];

          if (isset($data['fonts'])) {
                // Delete existing font group fonts
                FontGroupFont::where('font_group_id', $id)->delete();

                foreach ($data['fonts'] as $fontId) {
                    $font = Font::find($fontId);

                    if ($font) {
                        $fontGroupFont = new FontGroupFont();
                        $fontGroupFont->font_group_id = $id; // Use the provided ID
                        $fontGroupFont->font_id = $fontId;
                        $fontGroupFont->font_size = $font->font_size;
                        $fontGroupFont->font_name = $font->name;

                        $fontGroupFont->save();
                    }
                }
          }

          $fontGroup->save();

          $serializer = new FontGroupsSerializer();
          $fontGroup->load('fonts');
          return $serializer->serialize($fontGroup);
      }

        public function destroy($id)
        {
            $fontGroup = FontGroup::find($id);
            if (!$fontGroup) {
                return json_encode(['status' => 'error',
                                    'message' => 'Font group not found']);
            }

            $fontGroup->delete();

            return json_encode(['status' => 'success',
                                'message' => 'Font group deleted successfully']);
        }
  }
