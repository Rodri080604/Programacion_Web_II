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
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $id = $_GET['id'] ?? null;
        if ($id) {
            $stmt = $conn->prepare("SELECT * FROM productos WHERE id = ?");
            $stmt->bind_param("s", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            $producto = $result->fetch_assoc();
            echo json_encode($producto);
        } else {
            $result = $conn->query("SELECT * FROM productos");
            $productos = [];
            while ($row = $result->fetch_assoc()) {
                $productos[] = $row;
            }
            echo json_encode($productos);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'] ?? uniqid();
        $nombre = $input['nombre'];
        $precio = $input['precio'];
        $descripcion = $input['descripcion'];
        $stmt = $conn->prepare("INSERT INTO productos (id, nombre, precio, descripcion) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $id, $nombre, $precio, $descripcion);
        if ($stmt->execute()) {
            http_response_code(201);
            echo json_encode(["message" => "Producto creado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al crear producto"]);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'];
        $nombre = $input['nombre'];
        $precio = $input['precio'];
        $descripcion = $input['descripcion'];
        $stmt = $conn->prepare("UPDATE productos SET nombre = ?, precio = ?, descripcion = ? WHERE id = ?");
        $stmt->bind_param("ssss", $nombre, $precio, $descripcion, $id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Producto actualizado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al actualizar producto"]);
        }
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $stmt = $conn->prepare("DELETE FROM productos WHERE id = ?");
        $stmt->bind_param("s", $id);
        if ($stmt->execute()) {
            echo json_encode(["message" => "Producto eliminado"]);
        } else {
            http_response_code(500);
            echo json_encode(["error" => "Error al eliminar producto"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
}

$conn->close();
?>