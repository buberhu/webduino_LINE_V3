Blockly.Blocks['line_ifttt'] = {
  init: function () {
    this.appendValueInput("line_ifttt_event")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("LINE ( IFTTT )")
      .appendField("Event Name :");
    this.appendValueInput("line_ifttt_key")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Key :");
    this.appendValueInput("line_ifttt_value1")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Value1");
    this.appendValueInput("line_ifttt_value2")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Value2");
    this.appendValueInput("line_ifttt_value3")
      .setCheck(null)
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField("Value3");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip("");
    this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineifttt.html");
  }
};
// ---------------------------
Blockly.Blocks['linenotify_set'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.LINENotify_Set)
        .appendField(new Blockly.FieldVariable("linenotify"), "name_");
    this.appendValueInput("linenotify_token")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINENotify_Token);
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
    this.setTooltip("");
    this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineline-notify.html");
  }
};

Blockly.Blocks['linenotify_sendmsg'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.LINENotify_Set)
        .appendField(new Blockly.FieldVariable("linenotify"), "name_");
    this.appendValueInput("notify_sendmsg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINEBot_Sendmsg);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
    this.setTooltip("");
    this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineline-notify.html");
    this.setMutator(new Blockly.Mutator(['linenotify_item_sendstk','linenotify_item_sendimg'])); //add setMutator

    this.sendstk_ = '0';
    this.sendimg_ = '0';
  },
  mutationToDom: function (workspace) {
    var container = document.createElement('mutation');
	container.setAttribute('sendstk', this.sendstk_);
	container.setAttribute('sendimg', this.sendimg_);
    return container;
  },
  domToMutation: function (xmlElement) {
    this.sendstk_ = xmlElement.getAttribute('sendstk');
    this.sendimg_ = xmlElement.getAttribute('sendimg');
    this.updateShape_();
  },
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('linenotify_item_container');
    containerBlock.initSvg();

    var connection = containerBlock.getInput('STACK').connection;

    if (this.sendstk_=='1') {
        var stkBlock = workspace.newBlock('linenotify_item_sendstk');
	stkBlock.initSvg();
	connection.connect(stkBlock.previousConnection);
    }
    if (this.sendimg_=='1') {
	var imgBlock = workspace.newBlock('linenotify_item_sendimg');
	imgBlock.initSvg();
	connection.connect(imgBlock.previousConnection);
    }
    return containerBlock;
  },
  compose: function (containerBlock) {
    if (this.getInput('notify_sendstkpkg')) 
        this.removeInput("notify_sendstkpkg");
    if (this.getInput('notify_sendstkid')) 
	this.removeInput("notify_sendstkid");
    if (this.getInput('notify_sendimg_s')) 
	this.removeInput("notify_sendimg_s");
    if (this.getInput('notify_sendimg')) 
	this.removeInput("notify_sendimg");

    this.sendstk_ = '0';
    this.sendimg_ = '0';

    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
        if(clauseBlock.type=='linenotify_item_sendstk'){
	    this.sendstk_ = '1';
	    var input1 = this.appendValueInput("notify_sendstkpkg")
		.setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.LINEBot_Sendstk)
		.appendField("STKPKGID :");
	    var input2 = this.appendValueInput("notify_sendstkid")
		.setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField("STKID :");

	    if (clauseBlock.Datastkpkg_ && clauseBlock.Datastkid_) {
		input1.connection.connect(clauseBlock.Datastkpkg_);
		input2.connection.connect(clauseBlock.Datastkid_);
	    }
        }
        else if(clauseBlock.type=='linenotify_item_sendimg'){
	    this.sendimg_ = '1';
	    var input1 = this.appendValueInput("notify_sendimg_s")
		.setCheck("String")
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.LINEBot_Sendimg)
		.appendField(Blockly.Msg.LINEBot_SendimgP);
	    var input2 = this.appendValueInput("notify_sendimg")
		.setCheck("String")
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.LINEBot_SendimgO);

	    if (clauseBlock.Dataimgs_ && clauseBlock.Dataimg_) {
		input1.connection.connect(clauseBlock.Dataimgs_);
		input2.connection.connect(clauseBlock.Dataimg_);
	    }
        }
        clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function (containerBlock) {
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
        var datastkpkg = this.getInput('notify_sendstkpkg');
        var datastkid = this.getInput('notify_sendstkid');
        var dataimgs = this.getInput('notify_sendimg_s');
        var dataimg = this.getInput('notify_sendimg');

        clauseBlock.Datastkpkg_ = datastkpkg && datastkpkg.connection.targetConnection;
        clauseBlock.Datastkid_ = datastkid && datastkid.connection.targetConnection;
        clauseBlock.Dataimgs_ = dataimgs && dataimgs.connection.targetConnection;
        clauseBlock.Dataimg_ = dataimg && dataimg.connection.targetConnection;

        clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function() {
    if (this.getInput('notify_sendstkpkg')) 
	this.removeInput("notify_sendstkpkg");
    if (this.getInput('notify_sendstkid')) 
	this.removeInput("notify_sendstkid");
    if (this.getInput('notify_sendimg_s')) 
	this.removeInput("notify_sendimg_s");
    if (this.getInput('notify_sendimg')) 
	this.removeInput("notify_sendimg");

    if (this.sendstk_=='1') {
	this.appendValueInput("notify_sendstkpkg")
		.setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.LINEBot_Sendstk)
		.appendField("STKPKGID :");
	this.appendValueInput("notify_sendstkid")
		.setCheck("Number")
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField("STKID :");
    }
    if (this.sendimg_=='1') {
	this.appendValueInput("notify_sendimg_s")
		.setCheck("String")
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.LINEBot_Sendimg)
		.appendField(Blockly.Msg.LINEBot_SendimgP);
	this.appendValueInput("notify_sendimg")
		.setCheck("String")
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField(Blockly.Msg.LINEBot_SendimgO);
    }
  }
};

// ---------------------------
Blockly.Blocks['linebot_set'] = {
  init: function() {
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINEBot_Set)
        .appendField(new Blockly.FieldVariable("linebot"), "name_");
    this.appendValueInput("linebot_token")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINEBot_Token);
    this.appendValueInput("linebot_userid")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINEBot_Userid);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(195);
	this.setTooltip("");
	this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineline-bot.html");
	this.setMutator(new Blockly.Mutator(['linebot_set_firebase'])); //add setMutator

    this.firebaseid_ = '0';
  },
      
  mutationToDom: function (workspace) {
    var container = document.createElement('mutation');
	container.setAttribute('firebaseid', this.firebaseid_);
    return container;
  },
  domToMutation: function (xmlElement) {
    this.firebaseid_ = xmlElement.getAttribute('firebaseid');
    this.updateShape_();
  },
  decompose: function (workspace) {
    var containerBlock = workspace.newBlock('linebot_set_container');
    containerBlock.initSvg();

    var connection = containerBlock.getInput('STACK').connection;

    if (this.firebaseid_=='1') {
        var firebaseBlock = workspace.newBlock('linebot_set_firebase');
	firebaseBlock.initSvg();
	connection.connect(firebaseBlock.previousConnection);
    }
    return containerBlock;
  },
  
  compose: function (containerBlock) {
    if (this.getInput('bot_firebaseid')) 
        this.removeInput("bot_firebaseid");
    
	this.firebaseid_ = '0';

    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
        if(clauseBlock.type=='linebot_set_firebase'){
	    this.firebaseid_ = '1';
	    var input1 = this.appendValueInput("bot_firebaseid")
		.setCheck("String")
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField("firebase ID :");
   
	    if (clauseBlock.Datafirebaseid_) {
		input1.connection.connect(clauseBlock.Datafirebaseid_);
	    }
        }
        clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
  },
  saveConnections: function (containerBlock) {
    var clauseBlock = containerBlock.getInputTargetBlock('STACK');
    while (clauseBlock) {
        var datafirebaseid = this.getInput('bot_firebaseid');

        clauseBlock.Datafirebaseid_ = datafirebaseid && datafirebaseid.connection.targetConnection;
        clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function() {
    if (this.getInput('bot_firebaseid')) 
	this.removeInput("bot_firebaseid");
   

    if (this.firebaseid_=='1') {
	this.appendValueInput("bot_firebaseid")
		.setCheck("String")
		.setAlign(Blockly.ALIGN_RIGHT)
		.appendField("firebase ID :");
    }
  }
};

Blockly.Blocks['linebot_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("linebot"), "name_")
        .appendField(Blockly.Msg.LINEBot_Onrece);
    this.appendStatementInput("on_")
        .setCheck(null)
        .appendField(Blockly.Msg.LINEBot_Ondo);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineline-bot.html");
  }
};

Blockly.Blocks['linebot_message'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldVariable("linebot"), "name_")
        .appendField(Blockly.Msg.LINEBot_Recemsg);
    this.setOutput(true, null);
    this.setColour(30);
 this.setTooltip("");
 this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineline-bot.html");
  }
};

Blockly.Blocks['linebot_sendmsg'] = {
  init: function() {
    this.appendValueInput("bot_sendmsg")
        .setCheck("String")
        .appendField(Blockly.Msg.LINEBot_Set)
        .appendField(new Blockly.FieldVariable("linebot"), "name_")
        .appendField(Blockly.Msg.LINEBot_Sendmsg);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineline-bot.html");
  }
};

Blockly.Blocks['linebot_sendstk'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.LINEBot_Set)
        .appendField(new Blockly.FieldVariable("linebot"), "name_")
        .appendField(Blockly.Msg.LINEBot_Sendstk);
    this.appendValueInput("bot_sendstkpkg")
        .setCheck("Number")
        .appendField("STKPKGID :");
    this.appendValueInput("bot_sendstkid")
        .setCheck("Number")
        .appendField("STKID :");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineline-bot.html");
  }
};

Blockly.Blocks['linebot_sendimg'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.LINEBot_Set)
        .appendField(new Blockly.FieldVariable("linebot"), "name_")
        .appendField(Blockly.Msg.LINEBot_Sendimg);
    this.appendValueInput("bot_sendimg_s")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINEBot_SendimgP);
    this.appendValueInput("bot_sendimg")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINEBot_SendimgO);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineline-bot.html");
  }
};

Blockly.Blocks['linebot_sendvideo'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.LINEBot_Set)
        .appendField(new Blockly.FieldVariable("linebot"), "name_")
        .appendField(Blockly.Msg.LINEBot_Sendvideo);
    this.appendValueInput("bot_sendvideo_s")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINEBot_SendvideoP);
    this.appendValueInput("bot_sendvideo")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINEBot_SendvideoO);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineline-bot.html");
  }
};

Blockly.Blocks['linebot_sendaudio'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.LINEBot_Set)
        .appendField(new Blockly.FieldVariable("linebot"), "name_")
        .appendField(Blockly.Msg.LINEBot_Sendaudio);
    this.appendValueInput("bot_sendaudio_s")
        .setCheck("Number")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINEBot_SendaudioP);
    this.appendValueInput("bot_sendaudio")
        .setCheck("String")
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.LINEBot_SendaudioO);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("https://buberhu.blogspot.com/2018/10/webduinolineline-bot.html");
  }
};

Blockly.Blocks['linenotify_item_container'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.LINEBot_Sendmsgand);
    this.appendStatementInput("STACK")
        .setCheck(null)
    this.setColour(60);
	this.setTooltip("");
	this.setHelpUrl("");
	this.contextMenu = false;
  }
};

Blockly.Blocks['linenotify_item_sendstk'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.LINEBot_Sendstk);
    this.setPreviousStatement(true, null);
    this.setColour(60);
	this.setTooltip("");
	this.setHelpUrl("");
	this.contextMenu = false;
  }
};
Blockly.Blocks['linenotify_item_sendimg'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.LINEBot_Sendimg);
    this.setPreviousStatement(true, null);
    this.setColour(60);
	this.setTooltip("");
	this.setHelpUrl("");
	this.contextMenu = false;
  }
};


//***
Blockly.Blocks['linebot_set_container'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(Blockly.Msg.LINEBot_Add); 
    this.appendStatementInput("STACK")
        .setCheck(null)
    this.setColour(195);
	this.setTooltip("");
	this.setHelpUrl("");
	this.contextMenu = false;
  }
};
Blockly.Blocks['linebot_set_firebase'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Firebase ID");
    this.setPreviousStatement(true, null);
    this.setColour(195);
	this.setTooltip("");
	this.setHelpUrl("");
	this.contextMenu = false;
  }
};



