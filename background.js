const DATA_URL = val => `http://localhost:3000/${val}`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	const inputValue = request;

	fetch(DATA_URL(inputValue)).then(res => res.text()).then(data => sendResponse(data)).catch(err => sendResponse("There was an error trying to connect with OpenAI ChatGPT-3"));

	return true;
});