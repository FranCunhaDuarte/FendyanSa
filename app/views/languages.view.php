<?php

class LanguagesView {
    public function showEs() {
        require 'templates/es.html';
    }

    public function showEn() {
        require 'templates/en.html';
    }

    public function showPt() {
        require 'templates/pt.html';
    }

    public function showError() {
        require 'templates/error.html';
    }
}
