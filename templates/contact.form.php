<?php

use PHPMailer\PHPMailer\PHPMailer;;

if(isset($_POST["input-name"]) && isset($_POST["input-email"]) && isset($_POST["input-message"]) &&
!empty($_POST["input-name"]) && !empty($_POST["input-email"]) && !empty($_POST["input-message"]) &&
strlen($_POST["input-name"])<=50 && strlen($_POST["input-email"])<=200 && strlen($_POST["input-message"])<=500 && filter_var($_POST["input-email"],FILTER_VALIDATE_EMAIL)
){
    $userName=$_POST["name"];
    $userEmail=$_POST["email"];
    $userMessage=$_POST["message"];

    $txt="De: $userEmail"."\r\n";
    $txt.="<br><br>Recibiste un correo de parte de \"$userName\"";
    $txt.="<br><br>$userMessage";
    
    require_once "libs/PHPMailer/PHPMailer.php";
    require_once "libs/PHPMailer/SMTP.php";
    require_once "libs/PHPMailer/Exception.php";

    $mail= new PHPMailer();
    
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = 'html';
    $mail->isSMTP();
    $mail->Host="smtp.gmail.com";
    $mail->SMTPAuth=true;
    $mail->Username=EMAIL;
    $mail->Password = PASSWORD;
    $mail->Port=587;
    $mail->SMTPSecure="tls";
    $mail->SMTPKeepAlive = true; 
    $mail->isHTML(true);
    $mail->setFrom($userEmail);
    $mail->addAddress(EMAIL);
    $mail->Subject="Fendyan SA Website";
    $mail->Body=$txt;
    

    if($mail->send()){
        echo json_encode(true);
    }else{
        echo json_encode(false);
    }
} else{
    echo json_encode(false);
}


