<?php
require_once './app/views/languages.view.php';

class LanguagesController {
    private $view;

    public function __construct() {
        $this->view = new LanguagesView();
    } 

    public function showEs() {
        $this->view->showEs();
    }

    public function showEn() {
        $this->view->showEn();
    }

    public function showPt() {
        $this->view->showPt();
    }

    public function verifyForm() {
        require 'templates/contact.form.php';
    }

    public function showError() {
        $this->view->showError();
    }
}