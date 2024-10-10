import React from 'react';
import OpenAI from 'openai';
import prompts from '../prompts.json';

const openAiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
const client = new OpenAI({
  apiKey: openAiApiKey,
  dangerouslyAllowBrowser:true
});

function GPTGrader({ currentPlaces, gradedPlaces, setGradedPlaces }) {
  const gradePlacesWithGPT = async () => {
    if (currentPlaces.length === 0) {
      console.log('No places to grade.');
      return;
    }
    const placeData = currentPlaces.map((place) => ({
      name: place.name,
      location: place.vicinity, // Include the location (town/area name)
    }));

    const placeNames = currentPlaces.map((place) => place.name).join(', ');
    const prompt = `${prompts['schema_2']}. Here are the places with their locations: 
                    ${placeData.map((place) => `${place.name} (${place.location})`).join(', ')}`;

    try {
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo',
      });

      const gptResponse = JSON.parse(chatCompletion.choices[0].message.content);

      const newGradedPlaces = currentPlaces.map((place) => ({
        place_id: place.place_id, // Include place_id
        name: place.name,
        grade: gptResponse[place.name]?.grade || 'N/A',
        explanation: gptResponse[place.name]?.explanation || 'No description available.',
      }));

      setGradedPlaces([...gradedPlaces, ...newGradedPlaces]);

    } catch (error) {
      console.error('Error calling GPT API:', error);
    }
  };

  return (
    <div className='grade-btn-container'>
      <button className='grade-btn' onClick={gradePlacesWithGPT}>Grade Places with AI</button>
    </div>
  );
}

export default GPTGrader;