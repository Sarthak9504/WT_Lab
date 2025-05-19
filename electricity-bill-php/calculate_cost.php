<?php
// Allow CORS
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

if (isset($_GET['units'])) {
    $energyUsed = (float)$_GET['units'];
    $totalCost = 0;

    if ($energyUsed > 250) {
        $totalCost += ($energyUsed - 250) * 6.5;
    }

    if ($energyUsed > 150) {
        $slabUnits = min($energyUsed - 150, 100);
        $totalCost += $slabUnits * 5.2;
    }

    if ($energyUsed > 50) {
        $slabUnits = min($energyUsed - 50, 100);
        $totalCost += $slabUnits * 4.0;
    }

    $totalCost += $energyUsed > 50 ? 50 * 3.5 : $energyUsed * 3.5;

    echo json_encode(["cost" => $totalCost]);
} else {
    echo json_encode(["error" => "Missing 'units' query parameter."]);
}
?>
