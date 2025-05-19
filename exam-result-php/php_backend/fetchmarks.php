<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$host = "127.0.0.1";
$dbname = "vit_results";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname, 3306);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}

$studentName = isset($_GET['studname']) ? $_GET['studname'] : '';

if (!$studentName) {
    echo json_encode(["error" => "No student name provided"]);
    exit();
}

$studentName = $conn->real_escape_string($studentName);

$sql = "
SELECT * FROM student_marks WHERE student_name LIKE '%$studentName%'
";

$result = $conn->query($sql);

$data = [];

if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = [];
}

echo json_encode($data);

$conn->close();
?>
