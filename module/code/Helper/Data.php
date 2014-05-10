<?php

class Hackathon_BigBrother_Helper_Data
    extends Mage_Core_Helper_Abstract
{

    const XML_PATH_JS_URL = 'bigbrother/settings/js_url';

    /**
     * Gets the javascript URL from config.
     *
     * @return string
     */
    protected function _getJsUrl()
    {
        return Mage::getStoreConfig(self::XML_PATH_JS_URL);
    }

    /**
     * Get socket.io javascript URL.
     *
     * @return string
     */
    public function getSocketIoJs()
    {
        return sprintf('<script type="text/javascript" src="%s"></script>',
            $this->_getJsUrl());
    }

}