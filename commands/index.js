import { generateResponse } from '@/utils/askOpenAI';

export const improveCode = ({ userInput }) => {
  const systemInput =
    'Please review the provided JavaScript code and suggest improvements to make it more efficient, maintainable, and readable. In your explanation, mention the specific changes you made and the reasons behind them. Focus on optimizing performance, enhancing code clarity, and adhering to best coding practices. Additionally, please ensure that the code remains functionally the same after the improvements. Your explanation should be detailed and easy to follow, suitable for developers with a basic understanding of JavaScript.';

  return generateResponse({ systemInput, userInput });
};

export const dailyReport = ({ userInput }) => {
  const systemInput = `
  Assume that your are a developer, I am your team lead. You have to show daily report to me. I will give you some key point.
  Your role is based on my key point we have to write daily report.

  Write the daily report by following criteria:
  Write what have you done "Today" as a list of  bullet point.
  Write what will you do "Next Day" as a list of bullet point.
  `;

  return generateResponse({ systemInput, userInput });
};
