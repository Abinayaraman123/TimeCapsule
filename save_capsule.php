<?php
include "db.php";

$title=$_POST["title"];
$recipient=$_POST["recipient"];
$message=$_POST["message"];
$open_date=$_POST["open_date"];

$stmt=$conn->prepare("INSERT INTO capsules(title,message,recipient,open_date) VALUES(?,?,?,?)");
$stmt->bind_param("ssss",$title,$message,$recipient,$open_date);

if($stmt->execute()){
    echo "⏳ Time capsule sealed successfully!";
}else{
    echo "Error: ".$conn->error;
}

$stmt->close();
$conn->close();
?>