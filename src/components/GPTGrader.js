import React from 'react';
// import { Configuration, OpenAIClient } from 'openai';
import OpenAI from 'openai';
import prompts from '../prompts.json';

const openAiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
const client = new OpenAI({
  apiKey: openAiApiKey,
  dangerouslyAllowBrowser:true // This is the default and can be omitted
});


// const configuration = new Configuration({
//   apiKey: GPT_API_KEY,
// });
// const openai = new OpenAIClient(configuration);

function GPTGrader({ currentPlaces, gradedPlaces, setGradedPlaces }) {
  const gradePlacesWithGPT = async () => {
    if (currentPlaces.length === 0) {
      console.log('No places to grade.');
      return;
    }

    const placeNames = currentPlaces.map((place) => place.name).join(', ');
    const prompt = `${prompts['detailed']}. Here are the places: ${placeNames}`;

    try {
    //   const response = await openai.createCompletion({
    //     model: 'text-davinci-003',
    //     prompt: prompt,
    //     max_tokens: 200,
    //   });

      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });
      const gptResponse = chatCompletion.choices[0].message.content
      setGradedPlaces(gptResponse.split('\n').filter((line) => line.trim() !== ''));
    } catch (error) {
      console.error('Error calling GPT API:', error);
    }
  };

  return (
    <div>
      <button onClick={gradePlacesWithGPT}>Grade Places with GPT</button>
      {gradedPlaces.length > 0 && (
        <ul>
          {gradedPlaces.map((grade, index) => (
            <li key={index}>{grade}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GPTGrader;