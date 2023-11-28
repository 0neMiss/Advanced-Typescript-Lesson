/*Function overloads are a way for us to specify different parameters, or return types that a function may have in a more granular way than generics*/
function swapNumberAndString(number: number): string;
function swapNumberAndString(string: string): number;
function swapNumberAndString(mismatch: any): null;
function swapNumberAndString(
  numberOrString: string | number,
): number | string | null {
  if (typeof numberOrString === "string") {
    return Number(numberOrString);
  } else if (typeof numberOrString === "number") {
    return numberOrString.toString();
  } else {
    return null;
  }
}

// Since we passed a number here, typescript knows that we will be returning a number because of the 1st overflow
swapNumberAndString(1234).concat("some other text");
// Since we passed a string here, typescript knows that we will be returning a number because of the 2nd overflow
swapNumberAndString("123").valueOf();
// Since we dont have a type check for what returns null, typescript is unsure on if this will be null or not.
swapNumberAndString({}).concat("somethig");

// This is especially helpful when working with abstraction layers where you may have the same method for many different platforms or environments and want type safety in each of them.
