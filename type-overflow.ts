/*Function overloads are a way for us to specify different parameters, or return types that a function may have in a more granular way than generics*/
// It is also how we can maintain type safety in logic that we would like to do drastically different things depending on the type of a parameter
function swapNumberAndString(number: number): string;
function swapNumberAndString(string: string): number;
function swapNumberAndString(): void;
function swapNumberAndString(
  numberOrString?: string | number,
): number | string | void {
  if (typeof numberOrString === "string") {
    return Number(numberOrString);
  } else if (typeof numberOrString === "number") {
    return numberOrString.toString();
  } else {
    console.log("nothing happened");
  }
}

// Since we passed a number here, typescript knows that we will be returning a number because of the 1st overflow
swapNumberAndString(1234).concat("some other text");
// Since we passed a string here, typescript knows that we will be returning a number because of the 2nd overflow
swapNumberAndString("123").valueOf();
// Since we dont have a type check for what returns null, typescript is unsure on if this will be null or not.
swapNumberAndString().concat("something");
swapNumberAndString().concat("something");

// This is also especially helpful when working with abstraction layers where you may have the same method for many different platforms or environments and want type safety in each of them.
interface TvDevice {
  //one platform returns null when it fails
  getDeviceId(): string | null;
  //another returns undefined
  getDeviceId(): string | undefined;
}
