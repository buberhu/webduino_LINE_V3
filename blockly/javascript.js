Blockly.JavaScript['line_ifttt'] = function(block) {
  var event = Blockly.JavaScript.valueToCode(block, 'line_ifttt_event', Blockly.JavaScript.ORDER_ATOMIC);
  var key = Blockly.JavaScript.valueToCode(block, 'line_ifttt_key', Blockly.JavaScript.ORDER_ATOMIC);
  var v1 = Blockly.JavaScript.valueToCode(block, 'line_ifttt_value1', Blockly.JavaScript.ORDER_ATOMIC);
  var v2 = Blockly.JavaScript.valueToCode(block, 'line_ifttt_value2', Blockly.JavaScript.ORDER_ATOMIC);
  var v3 = Blockly.JavaScript.valueToCode(block, 'line_ifttt_value3', Blockly.JavaScript.ORDER_ATOMIC);

  if (v1.length == 0) {
    v1 = "''";
  }
  if (v2.length == 0) {
    v2 = "''";
  }
  if (v3.length == 0) {
    v3 = "''";
  }

  var code = 'line_ifttt(' + event + ',' + key + ',' + v1 + ',' + v2 + ',' + v3 + ');';

  return code;
};
// ---------------------------
Blockly.JavaScript['linenotify_set'] = function(block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_linenotify_token = Blockly.JavaScript.valueToCode(block, 'linenotify_token', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = variable_name_+" = {token:" + value_linenotify_token + "};\n";
  return code;
};

Blockly.JavaScript['linenotify_sendmsg'] = function(block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_notify_sendmsg = Blockly.JavaScript.valueToCode(block, 'notify_sendmsg', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var value_notify_sendstkpkg = Blockly.JavaScript.valueToCode(block, 'notify_sendstkpkg', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_notify_sendstkid = Blockly.JavaScript.valueToCode(block, 'notify_sendstkid', Blockly.JavaScript.ORDER_ATOMIC) || 0;
  var value_notify_sendimg_s = Blockly.JavaScript.valueToCode(block, 'notify_sendimg_s', Blockly.JavaScript.ORDER_ATOMIC) || '';
  var value_notify_sendimg = Blockly.JavaScript.valueToCode(block, 'notify_sendimg', Blockly.JavaScript.ORDER_ATOMIC) || '';
  
  var code = "line_notify($.extend({},"+variable_name_+",{message:";
  if(value_notify_sendmsg!=''&&value_notify_sendmsg!="''") code+=value_notify_sendmsg.replace(/<br\s*\/?>/gi,'\\n'); else code+="' '";
  if(value_notify_sendstkpkg!=0&&value_notify_sendstkid!=0) code+=",stickerPackageId:"+value_notify_sendstkpkg+",stickerId:"+value_notify_sendstkid;
  if(value_notify_sendimg_s!=''&&value_notify_sendimg!=''&&value_notify_sendimg_s!="''"&&value_notify_sendimg!="''") code+=",imageThumbnail:"+value_notify_sendimg_s+",imageFullsize:"+value_notify_sendimg;
  code+="}));\n";
  return code;
};
// ---------------------------
Blockly.JavaScript['linebot_set'] = function(block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_linebot_token = Blockly.JavaScript.valueToCode(block, 'linebot_token', Blockly.JavaScript.ORDER_ATOMIC);
  var value_linebot_userid = Blockly.JavaScript.valueToCode(block, 'linebot_userid', Blockly.JavaScript.ORDER_ATOMIC);
  var value_linebot_firebaseid = Blockly.JavaScript.valueToCode(block, 'bot_firebaseid', Blockly.JavaScript.ORDER_ATOMIC) || '';
  if(value_linebot_firebaseid==''&&value_linebot_firebaseid=="''") value_linebot_firebaseid='webduino-linebot-1ca6d';
  
  var code = "var firebase1ca6d;\n"+
      		"var flag1ca6d=true;\n"+
      		variable_name_+" = {token:" + value_linebot_token + ",userId:" + value_linebot_userid + ",onVal:''};\n"+
		"firebase1ca6d = new Firebase('https://" + value_linebot_firebaseid + ".firebaseio.com/');\n";
  return code;
};

Blockly.JavaScript['linebot_on'] = function(block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var statements_on_ = Blockly.JavaScript.statementToCode(block, 'on_');

  var code = "firebase1ca6d.on('value',function(s){\n"+
      		"  var msg1ca6d=false;\n"+
      		"  if(flag1ca6d){\n"+
      		"    flag1ca6d=false;\n"+
      		"    return;\n"+
      		"  }\n"+
      		"  else {\n"+
      		"    s.forEach(function(e){\n"+
      		"      if(e.val().userid==="+variable_name_+".userId && e.val().message!==''){\n"+
      		"        "+variable_name_+".onVal = e.val().message;\n"+
      		"        msg1ca6d=true;}\n"+
  		"    });\n"+
      		"    if(!msg1ca6d) return;\n"+
      		"  }\n"+
      		statements_on_+
      		"});\n";
  return code;
};

Blockly.JavaScript['linebot_message'] = function(block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);

  var code = variable_name_ + '.onVal';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['linebot_sendmsg'] = function(block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_bot_sendmsg = Blockly.JavaScript.valueToCode(block, 'bot_sendmsg', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "line_bot($.extend({},"+variable_name_+",{message:"+value_bot_sendmsg.replace(/<br\s*\/?>/gi,'\\n')+"}));\n";
  return code;
};

Blockly.JavaScript['linebot_sendstk'] = function(block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_bot_sendstkpkg = Blockly.JavaScript.valueToCode(block, 'bot_sendstkpkg', Blockly.JavaScript.ORDER_ATOMIC);
  var value_bot_sendstkid = Blockly.JavaScript.valueToCode(block, 'bot_sendstkid', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "line_bot($.extend({},"+variable_name_+",{packageId:"+value_bot_sendstkpkg+",stickerId:"+value_bot_sendstkid+"}));\n";
  return code;
};

Blockly.JavaScript['linebot_sendimg'] = function(block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_bot_sendimg_s = Blockly.JavaScript.valueToCode(block, 'bot_sendimg_s', Blockly.JavaScript.ORDER_ATOMIC);
  var value_bot_sendimg = Blockly.JavaScript.valueToCode(block, 'bot_sendimg', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "line_bot($.extend({},"+variable_name_+",{i_previewImageUrl:"+value_bot_sendimg_s+",i_originalContentUrl:"+value_bot_sendimg+"}));\n";
  return code;
};

Blockly.JavaScript['linebot_sendvideo'] = function(block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_bot_sendvideo_s = Blockly.JavaScript.valueToCode(block, 'bot_sendvideo_s', Blockly.JavaScript.ORDER_ATOMIC);
  var value_bot_sendvideo = Blockly.JavaScript.valueToCode(block, 'bot_sendvideo', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "line_bot($.extend({},"+variable_name_+",{v_previewImageUrl:"+value_bot_sendvideo_s+",v_originalContentUrl:"+value_bot_sendvideo+"}));\n";
  return code;
};

Blockly.JavaScript['linebot_sendaudio'] = function(block) {
  var variable_name_ = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('name_'), Blockly.Variables.NAME_TYPE);
  var value_bot_sendaudio_s = Blockly.JavaScript.valueToCode(block, 'bot_sendaudio_s', Blockly.JavaScript.ORDER_ATOMIC);
  var value_bot_sendaudio = Blockly.JavaScript.valueToCode(block, 'bot_sendaudio', Blockly.JavaScript.ORDER_ATOMIC);
  var code = "line_bot($.extend({},"+variable_name_+",{a_duration:"+value_bot_sendaudio_s+",a_originalContentUrl:"+value_bot_sendaudio+"}));\n";
  return code;
};

Blockly.JavaScript['linenotify_item_container'] = function(block) {
  var statements_name_ = Blockly.JavaScript.statementToCode(block, 'name_');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
Blockly.JavaScript['linenotify_item_sendstk'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
Blockly.JavaScript['linenotify_item_sendimg'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};


Blockly.JavaScript['notify_sendstkpkg'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
Blockly.JavaScript['notify_sendstkid'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
Blockly.JavaScript['notify_sendimg_s'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
Blockly.JavaScript['notify_sendimg'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
Blockly.JavaScript['bot_firebaseid'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
