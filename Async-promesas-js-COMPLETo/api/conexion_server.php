<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}


$serveName = ".";
$database = "doguito";
$username = "root";
$password = "";

try {
    $conn = new PDO("sqlsrv:Server=$serverName; Database=$database", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e){
    http_response_code(500);
    echo json_encode(["error" => "Error de conexion"]);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
try {
    switch ($method) {
        case 'GET':
            $id=$_GET['id']?? null;
            if ($id){
                $stmt = $conn->prepare("SELECT * FROM perfil WHERE id=?");
                $stmt->execute(['id']);
                $perfil = $stmt->fetch(PDO::FETCH_ASSOC);
            }else {
                $stmt = $conn->query('SELECT * FROM perfil');
                $perfil = $stmt->fetchAll(PDO::FETCH_ASSOC);
                //echo json_encode($perfil);
            }
            break;
    
        case 'POST':
            $input = json_decode(file_get_contents('php://input'), true);
            $id = $input['id'] ?? uniqid();
            $nombre = $input['nombre'] ;
            $correo = $input['correo'] ;
            $stmt = $conn->prepare("INSERT INTO perfil (id, nombre, correo) VALUES (?, ?, ?)");
            $stmt->execute([$id, $nombre, $correo]);
            //echo json_encode(["id" => $id, "nombre" => $nombre, "correo" => $correo]);
            break;
        
        case 'PUT':
            $input = json_decode(file_get_contents('php://input'), true);
            $id = $input['id'];
            $nombre = $input['nombre'] ;
            $correo = $input['correo'] ;
            $stmt = $conn->prepare("UPDATE perfil SET nombre=?,correo=? WHERE id=?");
            $stmt->execute([$id, $nombre, $correo]);
            //echo json_encode(["id" => $id, "nombre" => $nombre, "correo" => $correo]);
            break;
            

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) {
                http_response_code(400);
                break;
            }
            $stmt = $conn->prepare("DELETE FROM perfil WHERE id=?");
            $stmt->execute([$id]);
            //echo json_encode(["message" => "Perfil eliminado"]);
            break;
        default:
            http_response_code(405);
            echo json_encode(["error" => "Metodo no permitido"]);
    }


} catch (PDO Exception $e) {
    http_response_code(500);
    echo json_encode(["error" => "Error en la consulta"]);
}
$conn = null;
// Return the response


