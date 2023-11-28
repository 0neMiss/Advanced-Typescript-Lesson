interface Person {
  name: string;
  age: number;
}

/* Generics are a way of creating type safe code that is flexible enough to handle lots of different types of input*/
function returnTypeAsArray<T>(userType: T): T[] {
  return [userType];
}

const jordan = { name: "Jordan", age: 28 };

const numberArray = returnTypeAsArray(123);

const stringArray = returnTypeAsArray("some string");

const jordanArray = returnTypeAsArray(jordan);

//Since the types are cast onto the return value no matter what we pass it will keep the type through the return.
//This way typecript wont let us use methods, or access properties that don't exist on the returns.
numberArray[0].slice(1, 0);
stringArray[0].parseInt();
jordanArray[0].address;
