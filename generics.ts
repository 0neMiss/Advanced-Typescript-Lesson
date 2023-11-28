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

const personArray = returnTypeAsArray(jordan);

//Since the types are cast onto the return value no matter what we pass it will keep the type through the return.
//This way typecript wont let us use methods, or access properties that don't exist on the returns.
numberArray[0].slice(1, 0);
stringArray[0].parseInt();
personArray[0].address;

// Some places where this may be useful is when you have an argument that folows part of a schema and your function only cares about that part of the schema.
// However you want to type safety on what gets passed and returned,  and don't want to specifically define each possible payload type
interface Action {
  name: string;
  payload: Record<any, any>;
}

// We are saying that it will have the values that exist in Action but outside of that, we don't care what the type is.
function logAction<Type extends Action>(arg: Type): Type {
  console.log(arg.name);
  console.log(arg.payload);
  return arg;
}
// However since we are using type generics, the type that I pass will be enforced on the return.
const actionReturn = logAction({
  name: "myAction",
  payload: { myValue: 123 },
  customValue: "Some string my function doesn't care about",
});

actionReturn.customValue;
actionReturn.someOtherCustomValue;
