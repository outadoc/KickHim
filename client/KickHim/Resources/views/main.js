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
	
	//instanciate the separators
	line_def = {
		height: 1,
		width: Ti.UI.FILL,
		backgroundColor: 'lightgray',
		top: 6,
		bottom: 6
	};
	
	var view_line1 = Ti.UI.createView(line_def);
	var view_line2 = Ti.UI.createView(line_def);

	//instanciate the title
	var lbl_title = Ti.UI.createLabel({
		color: '#000000',
		text: 'Choose a punishment:',
		top: 20,
		left: 10,
		width: Ti.UI.FILL
	});

	win.add(lbl_title);

	//the scrollview that will contain our controls
	var scrollView = Ti.UI.createScrollView({
		top: 5,
		bottom: 10,
		layout: 'vertical',
		contentHeight: 'auto'
	});

	win.add(scrollView);

	//all the buttons that have to do with power
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

	//all the controls that have to do with closing programs
	var txtfield_kill_custom_prgm = Ti.UI.createTextField({
		hintText: 'mumble.exe',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var b_kill_custom_prgm = Ti.UI.createButton({
		title: 'Kill custom program',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});
	
	var b_close_mc = Ti.UI.createButton({
		title: 'Close Minecraft',
		cmd: 'close_mc',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 5
	});
	
	//the controls that handle executing a custom command
	var txtfield_custom_cmd = Ti.UI.createTextField({
		hintText: 'defrag',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var b_custom_cmd = Ti.UI.createButton({
		title: 'Send custom command',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	//add event listeners to the controls and bind them to the correct action
	b_shutdown.addEventListener('click', prepareCmdSend);
	b_shutdown_timed.addEventListener('click', prepareCmdSend);
	b_shutdown_cancel.addEventListener('click', prepareCmdSend);
	b_close_session.addEventListener('click', prepareCmdSend);
	b_kill_custom_prgm.addEventListener('click', function(e) {
		prepareCmdSend({
			source: {
				cmd: 'custom_cmd§taskkill /F /im ' + txtfield_kill_custom_prgm.value
			}
		});
	});
	b_close_mc.addEventListener('click', prepareCmdSend);
	b_custom_cmd.addEventListener('click', function(e) {
		prepareCmdSend({
			source: {
				cmd: 'custom_cmd§' + txtfield_custom_cmd.value
			}
		});
	});

	//add all the controls to the scroll view
	scrollView.add(b_shutdown);
	scrollView.add(b_shutdown_timed);
	scrollView.add(b_shutdown_cancel);
	scrollView.add(b_close_session);
	
	//separator
	scrollView.add(view_line1);
	
	scrollView.add(txtfield_kill_custom_prgm);
	scrollView.add(b_kill_custom_prgm);
	scrollView.add(b_close_mc);
	
	//separator
	scrollView.add(view_line2);
	
	scrollView.add(txtfield_custom_cmd);
	scrollView.add(b_custom_cmd);

	//this basically links the command and the ip (it's just cleaner than putting it in the event listeners)
	function prepareCmdSend(e) {
		sendCmd(e.source.cmd, txtfield_ip.value);
	}
	
	//the function that will actually connect to the server and send it the command
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
