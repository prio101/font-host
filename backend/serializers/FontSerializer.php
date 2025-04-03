<?php
  namespace backend\serializers;

  use Symfony\Component\Serializer\Serializer;
  use Symfony\Component\Serializer\Encoder\JsonEncoder;
  use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

  require __DIR__ . '/../../vendor/autoload.php';

  class FontSerializer
  {
      public function __construct()
      {
          // Initialize the serializer with the necessary encoders and normalizers
          $this->serializer = new Serializer(new ObjectNormalizer(), [new JsonEncoder()]);
      }
      /**
       * Serialize the given data to JSON format.
       *
       * @param mixed $data The data to serialize.
       * @return string The serialized JSON string.
       */

      public function serialize($data)
      {
          // Serialize the data to JSON format

            return $this->serializer->serialize([
              'status' => 'success',
              'data' => $data
            ], 'json');
      }
  }
