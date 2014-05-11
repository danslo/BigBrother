<?php

class Hackathon_BigBrother_BigbrotherController
    extends Mage_Adminhtml_Controller_Action
{

    /**
     * Index action.
     *
     * @return void
     */
    public function indexAction()
    {
        $this->loadLayout();
        $this->renderLayout();
    }

}