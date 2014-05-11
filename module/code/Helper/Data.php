<?php

class Hackathon_BigBrother_Helper_Data
    extends Mage_Core_Helper_Abstract
{

    const XML_PATH_NODE_URL = 'bigbrother/settings/node_url';

    /**
     * Gets the javascript URL from config.
     *
     * @return string
     */
    protected function _getJsUrl()
    {
        return Mage::getStoreConfig(self::XML_PATH_NODE_URL) . 'socket.io/socket.io.js';
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

    /**
     * Gets the big brother recorder or player.
     *
     * @todo   Authorization is a joke.
     * @return string
     */
    public function getBigBrotherJs()
    {
        $file = 'js/bigbrother/' . (Mage::app()->getRequest()->getParam('bigbrother') === 'such_secure' ?
            'player.js' : 'recorder.js');

        return sprintf('<script type="text/javascript" src="%s"></script>',
            Mage::getDesign()->getSkinUrl($file));
    }

}