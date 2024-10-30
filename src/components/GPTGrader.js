import React, { useState } from 'react';
import OpenAI from 'openai';
import prompts from '../prompts.json';
import './GPTGrader.css';

const openAiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

const client = new OpenAI({
  apiKey: openAiApiKey,
  dangerouslyAllowBrowser: true,
});

function GPTGrader({ currentPlaces, gradedPlaces, setGradedPlaces, overlayHeight }) {
  const [isLoading, setIsLoading] = useState(false);

  const gradePlacesWithGPT = async () => {
    if (currentPlaces.length === 0) {
      console.log('No places to grade.');
      return;
    }

    setIsLoading(true); 

    try {
      
      const placeData = currentPlaces.map((place) => ({
        name: place.name,
        location: place.vicinity,
        place_id: place.place_id,
      }));

      
      const prompt = `${prompts['schema_2']}. Here are the places with their locations: 
${placeData.map((place) => `${place.name} (${place.location})`).join(', ')}.
Please provide the output strictly in JSON format without any additional text or comments.`;

      
      const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-4o',
        temperature: 0, 
      });

      
      let gptResponseContent = chatCompletion.choices[0].message.content.trim();

      
      console.log('GPT Response:', gptResponseContent);

      
      const jsonMatch = gptResponseContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const gptResponse = JSON.parse(jsonMatch[0]);

        // Map the graded places
        const newGradedPlaces = currentPlaces.map((place) => ({
          place_id: place.place_id,
          name: place.name,
          grade: gptResponse[place.name]?.grade || 'N/A',
          explanation:
            gptResponse[place.name]?.explanation || 'No description available.',
        }));

        // Merge new graded places with existing ones
        const updatedGradedPlaces = mergeGradedPlaces(gradedPlaces, newGradedPlaces);

        // Update the graded places state
        setGradedPlaces(updatedGradedPlaces);

      } else {
        throw new Error('No JSON found in GPT response');
      }
    } catch (error) {
      console.error('Error parsing GPT response:', error);
    }

    setIsLoading(false); // End loading
  };

  // Function to merge new graded places with existing ones
  const mergeGradedPlaces = (existing, newPlaces) => {
    const placeMap = {};

    // Add existing places to the map
    existing.forEach((place) => {
      placeMap[place.place_id] = place;
    });

    // Update or add new places
    newPlaces.forEach((place) => {
      placeMap[place.place_id] = place;
    });

    // Return merged array
    return Object.values(placeMap);
  };

  if (overlayHeight === 'minimized') {
    return null;
  }

  return (
    <div className="grade-btn-container">
      <button
        className="grade-btn"
        onClick={gradePlacesWithGPT}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading-spinner">🌱</span>
        ) : (
          'Grade Places with AI'
        )}
      </button>
    </div>
  );
}

export default GPTGrader;