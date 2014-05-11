<?php

class Hackathon_BigBrother_Model_Resource_Session_Collection
    extends Mage_Core_Model_Resource_Db_Collection_Abstract
{

    /**
     * Initialize resource.
     */
    protected function _construct()
    {
        $this->_init('bigbrother/session');
    }
}
