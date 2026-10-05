<?php
include "db.php";

$result=$conn->query("SELECT * FROM capsules ORDER BY open_date ASC");

$capsules=[];

while($row=$result->fetch_assoc()){
    $capsules[]=$row;
}

header("Content-Type: application/json");
echo json_encode($capsules);

$conn->close();
?>