import { prepareOptions } from '@/config';

export const askOpenAI = async ({ userInput, systemInput }) => {
  try {
    return fetch(
      'https://api.openai.com/v1/chat/completions',
      prepareOptions({ userInput, systemInput })
    )
      .then((response) => response.json())
      .then((data) => data)
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.log(error);
  }
};

export const generateResponse = async ({ systemInput, userInput }) => {
  try {
    const res = await askOpenAI({ userInput, systemInput });
    return res.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};
