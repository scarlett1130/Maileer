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
					el: "<div id='main'><form id='my-form'><input placeholder='Write instructions' type='text' id='input'></form></div>",
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
											el: `<div id='response-container'>${res}</div>`,
											buttons: [
												{
													title: 'Copy',
													onClick: function() {
														let text = document.getElementById('response-container').innerHTML;
	
														(async () => {
															try {
																await navigator.clipboard.writeText(text);
															}
															catch (err) {
																console.log(err);
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