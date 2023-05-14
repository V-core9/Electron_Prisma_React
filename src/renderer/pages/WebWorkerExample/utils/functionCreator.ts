export const functionCreator = (callback: (...args: unknown[]) => void) => {
  return (...args: unknown[]) => {
    // Your logic here
    console.log('Hello from the created function!');
    console.log('Arguments:', args);

    // Invoke the callback function
    callback(...args);
  };
};

export default functionCreator;
