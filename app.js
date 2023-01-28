var link = document.createElement("link");
link.href = "styles.css";
link.type = "text/css";
link.rel = "stylesheet";

InboxSDK.load(2, 'sdk_Maileer_3673560729').then((sdk) => {
	sdk.Compose.registerComposeViewHandler((composeView) => {
		composeView.addButton({
			title: 'Mailyr',
			className: 'overlay',
			iconUrl:
				'https://raw.githubusercontent.com/FlightSimCentral/mailyr_logo/main/icon_gmail.png',
			onClick: (event) => {
				sdk.Widgets.showModalView({
					el: `<div id='main'>
							<img id="logo" src="https://raw.githubusercontent.com/FlightSimCentral/mailyr_logo/main/icon_gmail.png">
							<label for="context" id="context-label">Email context:</label>
							<textarea type="text" id="context"></textarea>
							<label for="desired-response" id="desired-response-label">Describe what do you want to respond:</label>
							<input type="text" id="desired-response">
							<label for="generated-response" id="generated-response-label">Generated response:</label>
							<textarea id="generated-response"></textarea>
						</div>`,
					title: 'Maileer Email Generator',
					buttons: [
						{
							text: 'Generate response',
							title: 'Generates a response from the AI',
							type: 'PRIMARY_ACTION',
							orderHint: 1,
							color: 'green',
							onClick: () => {
								const context = document.getElementById('context');
								const desiredResponse = document.getElementById('desired-response');
		
								const aiInput = `Email context: ${context.value}\nDesired response: ${desiredResponse.value}`;
		
								const responseContainer = document.getElementById('generated-response');

								chrome.runtime.sendMessage(aiInput, generatedResponse => {
									responseContainer.value = generatedResponse;
									responseContainer.focus();
								});
							},
						},
						{
							text: 'Copy to the clipboard',
							title: 'Copy the response',
							color: 'blue',
							onClick: async () => {
								const responseContainer = document.getElementById('generated-response');
								try {
									await navigator.clipboard.writeText(responseContainer.value);
								}
								catch {
									console.log('Failed to copy to clipboard');
								}
							}
						}
					]
				});
			},
		});
	});
});