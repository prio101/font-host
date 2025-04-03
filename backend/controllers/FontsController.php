<?php

    namespace backend\controllers;

    use backend\models\Font;
    use backend\serializers\FontsSerializer;

    class FontsController extends BaseController
    {
        public function index()
        {
            $fonts = Font::where('deleted_at', null)->get();
            $serializer = new FontsSerializer();
            return $serializer->serialize($fonts);
        }

        public function show($id)
        {
            $font = Font::find($id);
            if (!$font) {
                return json_encode(['status' => 'error',
                                    'message' => 'Font not found']);
            }
            $serializer = new FontsSerializer();
            return $serializer->serialize($font);
        }

        public function store()
        {   $req_data = $this->request->getContent();

            $data = json_decode($req_data, true);

            $font = new Font();

            $font->name = $data['name'];
            $font->status = $data['status'];
            $font->url = $data['url'];

            $font->save();

            $serializer = new FontsSerializer();
            return $serializer->serialize($font);
        }

        public function update($id)
        {
            $data = json_decode(file_get_contents('php://input'), true);
            $font = Font::find($id);
            if (!$font) {
                return json_encode(['status' => 'error',
                                    'message' => 'Font not found']);
            }
            $font->name = $data['name'];
            $font->status = $data['status'];
            $font->url = $data['url'];
            $font->save();

            $serializer = new FontsSerializer();
            return $serializer->serialize($font);
        }

        public function destroy($id)
        {
            $font = Font::find($id);
            if (!$font) {
                return json_encode(['status' => 'error',
                                    'message' => 'Font not found']);
            }
            $font->delete();

            return json_encode(['status' => 'success',
                                'message' => 'Font deleted successfully']);
        }


    }
