<?php

class Hackathon_BigBrother_Block_Sessions
    extends Mage_Core_Block_Template
{

    /**
     * Gets the session collection.
     *
     * @return Hackathon_BigBrother_Model_Resource_Session_Collection
     */
    public function getSessionCollection()
    {
        return Mage::getModel('bigbrother/session')->getCollection();
    }

}