import { askOpenAI } from './askOpenAI';

export const generateCode = async ({ systemInput, userInput }) => {
  try {
    const res = await askOpenAI({ userInput, systemInput });
    return res.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};
