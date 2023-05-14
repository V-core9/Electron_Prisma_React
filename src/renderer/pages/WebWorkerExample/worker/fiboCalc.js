function fiboCalc(numb) {
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
}

module.exports = fiboCalc;
export default fiboCalc;
