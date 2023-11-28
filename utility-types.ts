/*One method of making generic types */

// Partial is used to use a type sctructure, but all the fields are optional.

type UserInfo = { name: string; accountType: string };

// An example of where this would be useful is in a function that updates information about a user
// Here we pass in both the origional object, and then an object containing only the fields we want to update for that user.
function updateUserInfo(userInfo: UserInfo, fieldsToUpdate: Partial<UserInfo>) {
  return { ...userInfo, ...fieldsToUpdate };
}

// Required is essentially the opposite of Partial it takes all optional fields and makes them required

type Car = { doors?: number; color?: string };

const car1: Car = { doors: 2 };
const car2: Required<Car> = { doors: 2 };

// Readonly is a way for you to define that a variable is immutable.
// This is useful in a lot of scenarios and is something that is baked into a lot of languages.

// Lets say I wanted to make an interface
interface ImmutableState {
  [key: string]: any;
}
