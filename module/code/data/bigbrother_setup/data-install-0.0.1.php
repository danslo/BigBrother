<?php

/* @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$installer->startSetup();

/**
 * Disable HTTP only cookies because we need it from JS.
 */
$installer->setConfigData(Mage_Core_Model_Cookie::XML_PATH_COOKIE_HTTPONLY, false);

$installer->endSetup();