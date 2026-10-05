<?php
$conn=new mysqli("localhost","root","","time_capsule");
if($conn->connect_error){
    die("Database Connection Failed: ".$conn->connect_error);
}
?>