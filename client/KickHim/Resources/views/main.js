(function() {
	var win = Ti.UI.currentWindow;

	var txtfield_ip = Ti.UI.createTextField({
		hintText: 'IP address of the target',
		left: 10,
		right: 10,
		top: 10,
		width: Ti.UI.FILL,
		autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		value: Ti.App.Properties.getString('ip', 'localhost'),
		clearButtonMode: Ti.UI.INPUT_BUTTONMODE_ALWAYS
	});

	txtfield_ip.addEventListener('blur', function(e) {
		Ti.App.Properties.setString('ip', e.value);
	});

	win.add(txtfield_ip);

	var lbl_title = Ti.UI.createLabel({
		color: '#000000',
		text: 'Choose a punishment:',
		top: 20,
		left: 10,
		width: Ti.UI.FILL
	});

	win.add(lbl_title);

	var scrollView = Ti.UI.createScrollView({
		top: 5,
		bottom: 10,
		layout: 'vertical',
		contentHeight: 'auto'
	});

	win.add(scrollView);

	var b_close = Ti.UI.createButton({
		title: 'Close Minecraft',
		cmd: 'close_mc',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 5
	});

	var b_shutdown = Ti.UI.createButton({
		title: 'Shutdown computer',
		cmd: 'shutdown',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var b_shutdown_timed = Ti.UI.createButton({
		title: 'Shutdown in 30 seconds',
		cmd: 'shutdown_timed',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var b_shutdown_cancel = Ti.UI.createButton({
		title: 'Cancel shutdown',
		cmd: 'shutdown_cancel',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var b_close_session = Ti.UI.createButton({
		title: 'Close user session',
		cmd: 'close_session',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var txtfield_custom_cmd = Ti.UI.createTextField({
		hintText: 'taskkill /im name',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var b_custom_cmd = Ti.UI.createButton({
		title: 'Send custom cmd',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	b_close.addEventListener('click', prepareCmdSend);
	b_shutdown.addEventListener('click', prepareCmdSend);
	b_shutdown_timed.addEventListener('click', prepareCmdSend);
	b_shutdown_cancel.addEventListener('click', prepareCmdSend);
	b_close_session.addEventListener('click', prepareCmdSend);
	b_custom_cmd.addEventListener('click', function(e) {
		prepareCmdSend({
			source: {
				cmd: 'custom_cmd§' + txtfield_custom_cmd.value
			}
		});
	});

	scrollView.add(b_close);
	scrollView.add(b_shutdown);
	scrollView.add(b_shutdown_timed);
	scrollView.add(b_shutdown_cancel);
	scrollView.add(b_close_session);
	scrollView.add(txtfield_custom_cmd);
	scrollView.add(b_custom_cmd);

	function prepareCmdSend(e) {
		sendCmd(e.source.cmd, txtfield_ip.value);
	}
	
	function sendCmd(cmd, ip) {
		var socket = Ti.Network.Socket.createTCP({
			host: ip,
			port: 13374,
			connected: function(e) {
				Ti.API.info('Socket opened!');
				Ti.Stream.write(this, Ti.createBuffer({
					value: cmd
				}), writeCallback);
			},
			error: function(e) {
				Ti.API.info('Error (' + e.errorCode + '): ' + e.error);
				alert('Error ' + e.errorCode + ': ' + e.error + '\nHost: ' + this.host + ':' + this.port);
			},
		});

		socket.connect();

		function writeCallback(e) {
			Ti.API.info('Successfully wrote \'' + cmd + '\' to socket.');
			alert('Success !\nCommand: ' + cmd);
			socket.close();
		}

	}

})();
