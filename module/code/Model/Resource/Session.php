<?php

class Hackathon_BigBrother_Model_Resource_Session
    extends Mage_Core_Model_Resource_Db_Abstract
{
    
    /**
     * Define main table.
     */
    protected function _construct()
    {
        $this->_init('bigbrother/session', 'id');
    }

}