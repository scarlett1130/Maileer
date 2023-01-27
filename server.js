const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.get('/:input', (req, res) => {
	const { input } = req.params;
	openai
		.createCompletion({
			model: 'text-davinci-003',
			prompt: input,
			temperature: 1,
			max_tokens: 200,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0
		})
		.then(response => {
			res.send("response.data.choices[0].text");
		})
		.catch(() => {
			res.send("Error");
		});
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
