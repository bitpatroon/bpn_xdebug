<?php

if (!defined('TYPO3_MODE')) {
    die('Access denied.');
}

$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['typo3/backend.php']['renderPreProcess'][] =
    \BPN\BpnXdebug\BackEnd\BackEndController::class . '->renderPreProcess';
