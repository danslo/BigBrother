<?php

/* @var $installer Mage_Core_Model_Resource_Setup */
$installer = $this;

$installer->startSetup();

// Create the active session table.
$table = $installer->getConnection()
    ->newTable($installer->getTable('bigbrother/session'))
    ->addColumn('id', Varien_Db_Ddl_Table::TYPE_INTEGER, null, array(
        'identity'  => true,
        'unsigned'  => true,
        'nullable'  => false,
        'primary'   => true
        ), 'Id')
    ->addColumn('session_id', Varien_Db_Ddl_Table::TYPE_VARCHAR, null, array(
        'nullable'  => false
        ), 'Session ID')
    ->addColumn('created_at', Varien_Db_Ddl_Table::TYPE_DATETIME, null, array(
        'nullable'  => false
        ), 'Created at');
$installer->getConnection()->createTable($table);

$installer->endSetup();