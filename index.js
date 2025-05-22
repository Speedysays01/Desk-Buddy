const express = require('express');
const say = require('say');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');

dotenv.config();

const app = express();
const PORT = 5000;

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

app.use(express.json());

app.post('/speak', async (req, res) => {
  const { char } = req.body;

  if (char === 's') {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-001' });

      const prompt = `
      Give me a short, quirky, playful phrase that a cute AI girl would say aloud.
      It should be fun, quirky,  light-hearted, maybe even flirty and have character, like something a chaotic gen-z girl will say.
      These phrases are for a peaking robo named 'I am just a gurrrlll'.
      Keep it under 15 words.
      Also sometimes she says 'I am just a gurrrlll' in a playful way.
      Please use asterisks to indicate any words that should be emphasized when spoken.
      Do not include any text in the response other than the phrase itself.
      Thank you!
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const phrase = response.text().replace(/\*/g, '').trim();

      say.speak(phrase, 'Microsoft Zira Desktop', 1.0, (err) => {
        if (err) {
          console.error('TTS error:', err);
          return res.status(500).send('Error speaking');
        }
        console.log('Spoken:', phrase);
        res.status(200).send('Spoken: ' + phrase);
      });

    } catch (err) {
      console.error('Gemini error:', err);
      res.status(500).send('Error generating response from Gemini');
    }

  } else {
    res.status(400).send('Invalid character');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});









// const express = require('express');
// const say = require('say');
// const dotenv = require('dotenv');
// const { GoogleGenerativeAI } = require('@google/generative-ai');

// dotenv.config();
// const app = express();
// const PORT = 5000;

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
// app.use(express.json());

// app.post('/speak', async (req, res) => {
//   const { char } = req.body;

//   if (char === 's') {
//     try {
//       const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

//       const prompt = `
//       Give me a short, quirky, playful phrase that a cute AI girl would say aloud.
//       It should be fun, quirky,  light-hearted, maybe even flirty and have character, like something a chaotic gen-z girl will say.
//       These phrases are for a peaking robo named 'I am just a gurrrlll'.

//       Keep it under 15 words.
//       Please use asterisks to indicate any words that should be emphasized when spoken.
//       Also do not include any text in the response other than the phrase itself.
//       `;

//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const phrase = response.text().replace(/\*/g, '').trim();

//       say.speak(phrase, 'Microsoft Zira Desktop', 1.0, (err) => {
//         if (err) {
//           console.error('TTS error:', err);
//           return res.status(500).send('Error speaking');
//         }
//         console.log('Spoken:', phrase);
//         res.status(200).send('Spoken: ' + phrase);
//       });
//     } catch (error) {
//       console.error('Gemini error:', error);
//       res.status(500).send('Error generating phrase');
//     }
//   } else {
//     res.status(400).send('Invalid character');
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
