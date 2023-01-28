const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const { Configuration, OpenAIApi } = require('openai');

app.use(cors({origin: '*'}));

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
			max_tokens: 100,
			top_p: 1,
			frequency_penalty: 0.0,
			presence_penalty: 0.0
		})
		.then(response => {
			res.send(response.data.choices[0].text);
		})
		.catch((err) => {
			res.send("There was an error trying to connect to OpenAI ChatGPT-3");
		});
});

app.listen(3000, () => {
	console.log('Server is running on port 3000');
});
