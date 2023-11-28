/*Function overloads are a way for us to specify different parameters, or return types that a function may have in a more granular way than generics*/
function swapNumberAndString(number: number): string;
function swapNumberAndString(string: string): number;
function swapNumberAndString(numberOrString: string | number): number | string {
  if (typeof numberOrString === "string") {
    return Number(numberOrString);
  } else {
    return numberOrString.toString();
  }
}

// Since we passed a number here, typescript knows that we will be returning a number because of the 1st overflow
swapNumberAndString(1234).concat("some other text");
// Since we passed a string here, typescript knows that we will be returning a number because of the 2nd overflow
swapNumberAndString("123").valueOf();
