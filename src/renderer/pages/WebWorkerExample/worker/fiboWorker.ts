// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const fiboCalc = (numb: number) => {
    let n1 = 0;
    let n2 = 1;
    let somme = 0;

    for (let i = 2; i <= numb; i += 1) {
      somme = n1 + n2;

      n1 = n2;

      n2 = somme;
    }

    const result = numb ? n2 : n1;
    return result;
  };

  // eslint-disable-next-line no-restricted-globals
  self.onmessage = (message) => {
    const nbr = message.data;
    const result = fiboCalc(nbr);

    postMessage(result);
  };
};
