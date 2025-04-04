<?php

    namespace backend\controllers;

    use backend\models\Font;
    use backend\serializers\FontsSerializer;
    use backend\requestFormattor\FontCheck;

    class FontsController extends BaseController
    {
        public function __construct()
        {
            parent::__construct();
            $this->checker = new FontCheck();
        }

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
        {

            $name = $this->request->get('name');
            $file = $this->request->files->get('file');

            if ($file->isValid()) {
                $uploadDir = 'public/assets/fonts/';
                $fileName = $file->getClientOriginalName();
                $file->move($uploadDir, $fileName);

                $font = new Font();
                $font->name = $this->checker->checkxss($name);
                $font->url = $uploadDir . $fileName;
                $font->save();

                $serializer = new FontsSerializer();
                return $serializer->serialize($font);
            } else {
                return json_encode(['error' => 'Invalid file upload']);
            }

            $serializer = new FontsSerializer();
            return $serializer->serialize($font);
        }

        public function update($id)
        {
            // Not Implemented
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
