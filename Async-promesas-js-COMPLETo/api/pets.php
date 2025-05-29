<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "doguito";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM pets WHERE id = ?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            echo json_encode($result->fetch_assoc());
        } else {
            $result = $conn->query("SELECT * FROM pets");
            $pets = [];
            while ($row = $result->fetch_assoc()) {
                $pets[] = $row;
            }
            echo json_encode($pets);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? uniqid();
        $nombre = $input['nombre'];
        $especie = $input['especie'];
        $edad = $input['edad'];

        $stmt = $conn->prepare("INSERT INTO pets (id, nombre, especie, edad) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sssi", $id, $nombre, $especie, $edad);

        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Pet creado", "id" => $id]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear pet"]);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'];
        $nombre = $input['nombre'];
        $especie = $input['especie'];
        $edad = $input['edad'];

        $stmt = $conn->prepare("UPDATE pets SET nombre = ?, especie = ?, edad = ? WHERE id = ?");
        $stmt->bind_param("ssis", $nombre, $especie, $edad, $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Pet actualizado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar pet"]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $conn->prepare("DELETE FROM pets WHERE id = ?");
        $stmt->bind_param("s", $id);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Pet eliminado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar pet"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}

$conn->close();
?>