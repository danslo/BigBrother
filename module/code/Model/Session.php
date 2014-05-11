<?php

class Hackathon_BigBrother_Model_Session
    extends Mage_Core_Model_Abstract
{

    /**
     * Initialize resource model
     *
     */
    protected function _construct()
    {
        $this->_init('bigbrother/session');
    }

    /**
     * Gets the frontend URL for this session.
     *
     * @return string
     */
    public function getFrontendUrl()
    {
        return Mage::getBaseUrl() . '?bigbrother=' . $this->getSessionId();
    }

}