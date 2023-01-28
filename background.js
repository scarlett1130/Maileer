const DATA_URL = `http://localhost:3000`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const inputValue = request;

	fetch(DATA_URL, 
	{
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: JSON.stringify({
			input: inputValue
		})
	})
		.then(res => res.text())
		.then(data => sendResponse(data))
		.catch(() => sendResponse("There was an error trying to connect with OpenAI ChatGPT-3"));

	return true;
});