const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.get('/', (req, res) => {
    res.send('hello');
});

app.get('/api/gpt', async (req, res) => {
    try {
        const response = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({ prompt: "Translate the following English text to French: 'Hello, world!'", max_tokens: 60 })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));