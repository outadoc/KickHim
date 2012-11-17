(function() {
	var win = Ti.UI.currentWindow;

	var txtfield_ip = Ti.UI.createTextField({
		hintText: 'Adresse IP de la cible',
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
		text: 'Choisis une sentence:',
		top: 20,
		left: 10,
		width: Ti.UI.FILL
	});

	win.add(lbl_title);

	var scrollView = Ti.UI.createScrollView({
		contentHeight: 'auto',
		top: 10,
		layout: 'vertical'
	});

	win.add(scrollView);

	var b_close = Ti.UI.createButton({
		title: 'Fermer Minecraft',
		cmd: 'close_mc',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 20
	});

	var b_shutdown = Ti.UI.createButton({
		title: 'Éteindre l\'ordinateur',
		cmd: 'shutdown',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var b_shutdown_timed = Ti.UI.createButton({
		title: 'Éteindre l\'ordinateur dans 30 sec',
		cmd: 'shutdown_timed',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var b_shutdown_cancel = Ti.UI.createButton({
		title: 'Annuler l\'extinction',
		cmd: 'shutdown_cancel',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var b_close_session = Ti.UI.createButton({
		title: 'Fermer la session',
		cmd: 'close_session',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var txtfield_custom_cmd = Ti.UI.createTextField({
		hintText: 'kill \IM test',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	var btn_custom_cmd = Ti.UI.createButton({
		title: 'Send custom cmd',
		left: 10,
		right: 10,
		width: Ti.UI.FILL,
		height: 45,
		top: 10
	});

	b_close.addEventListener('click', sendCommand);
	b_shutdown.addEventListener('click', sendCommand);
	b_shutdown_timed.addEventListener('click', sendCommand);
	b_shutdown_cancel.addEventListener('click', sendCommand);
	b_close_session.addEventListener('click', sendCommand);
	b_custom_cmd.addEventListener('click', function(e) {
		sendCommand({
			source: {
				cmd: txtfield_custom_cmd.getValue()
			}
		});
	});

	scrollView.add(b_close);
	scrollView.add(b_shutdown);
	scrollView.add(b_shutdown_timed);
	scrollView.add(b_shutdown_cancel);
	scrollView.add(b_close_session);

	function sendCommand(e) {
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
				alert('Erreur ' + e.errorCode + ': ' + e.error + '\nHôte: ' + this.host + ':' + this.port);
			},
		});

		socket.connect();

		function writeCallback(e) {
			Ti.API.info('Successfully wrote \'' + cmd + '\' to socket.');
			alert('Succès !\nCommande: ' + cmd);
			socket.close();
		}

	}

})();
