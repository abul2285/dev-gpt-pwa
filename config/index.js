const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

export const prepareOptions = ({ userInput, systemInput }) => ({
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${OPENAI_API_KEY}`,
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: systemInput },
      { role: 'user', content: userInput },
    ],
  }),
});
