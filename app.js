var link = document.createElement("link");
link.href = "styles.css";
link.type = "text/css";
link.rel = "stylesheet";

InboxSDK.load(2, 'sdk_Maileer_3673560729').then(function (sdk) {
	sdk.Compose.registerComposeViewHandler(function (composeView) {
		composeView.addButton({
			title: 'Mailyr',
			className: 'overlay',
			iconUrl:
				'https://raw.githubusercontent.com/FlightSimCentral/mailyr_logo/main/icon_gmail.png',
			onClick: function (event) {
				sdk.Widgets.showModalView({
					el: "<div id='main'><form id='my-form'><input type='text' id='input'></form></div>",
					buttons: [
						{
							title: 'Submit',
							onClick: function () {
								// Get the value of the input box
								const inputValue =
									document.getElementById('input').value;

								(() => {
									chrome.runtime.sendMessage(inputValue, (res) => {
										sdk.Widgets.showModalView({
											el: `<div id='main'><p id='response'>${res}</p></div>`,
											buttons: [
												{
													title: 'Copy',
													onClick: function() {
														let text = document.getElementById('response').innerHTML;
	
														(async () => {
															try {
																await navigator.clipboard.writeText(text);
																console.log('Content copied to the clipboard');
															}
															catch (err) {
																console.log('Failed to copy: ', err);
															}
														})()
													}
												}
											]
										})
									});
								})();
							},
						},
					],
				});
			},
		});
	});
});