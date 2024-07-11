<?php
require_once './app/controllers/languages.controller.php';

define('BASE_URL', '//'.$_SERVER['SERVER_NAME'] . ':' . $_SERVER['SERVER_PORT'] . dirname($_SERVER['PHP_SELF']).'/');

$action = 'es'; // accion por defecto
if (!empty( $_GET['action'])) {
    $action = $_GET['action'];
}

$params = explode('/', $action);

switch ($params[0]) {
    case 'es':
        $controller = new LanguagesController();
        $controller->showEs();
        break;
    case 'en':
        $controller = new LanguagesController();
        $controller->showEn();
        break;
    case 'pt':
        $controller = new LanguagesController();
        $controller->showPt();
        break;
    case 'verifyForm':
        $controller = new LanguagesController();
        $controller->verifyForm();
        break;
    
    default: 
        $controller = new LanguagesController();
        $controller->showEs();
        break;
}