<?php
namespace backend\serializers;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

require __DIR__ . '/../../vendor/autoload.php';

class FontGroupsSerializer
{
    public function __construct()
    {
        // Initialize the serializer with the necessary encoders and normalizers
        $this->serializer = new Serializer([new ObjectNormalizer()], [new JsonEncoder()]);
    }

    /**
     * Serialize the given data to JSON format.
     *
     * @param mixed $data The data to serialize.
     * @return string The serialized JSON string.
     */
    public function serialize($data)
    {
        // Convert Eloquent models or collections to arrays
        if ($data instanceof Model || $data instanceof Collection) {
            $data = $data->toArray();
        }

        // Serialize the data to JSON format
        return $this->serializer->serialize([
            'status' => 'success',
            'data' => $data
        ], 'json');
    }
}
