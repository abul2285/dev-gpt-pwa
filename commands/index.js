import { generateCode } from '@/utils/generateCode';

export const improveCode = ({ userInput }) => {
  const systemInput =
    'Please review the provided JavaScript code and suggest improvements to make it more efficient, maintainable, and readable. In your explanation, mention the specific changes you made and the reasons behind them. Focus on optimizing performance, enhancing code clarity, and adhering to best coding practices. Additionally, please ensure that the code remains functionally the same after the improvements. Your explanation should be detailed and easy to follow, suitable for developers with a basic understanding of JavaScript.';

  return generateCode({ systemInput, userInput });
};
