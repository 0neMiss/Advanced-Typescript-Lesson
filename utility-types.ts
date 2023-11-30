/*One method of making generic types */

// Partial is used to use a type sctructure, but all the fields are optional.
type UserInfo = { name: string; accountType?: string };

// An example of where this would be useful is in a function that updates information about a user
// Here we pass in both the origional object, and then an object containing only the fields we want to update for that user.
function updateUserInfo(userInfo: UserInfo, fieldsToUpdate: Partial<UserInfo>) {
  return { ...userInfo, ...fieldsToUpdate };
}

// Required is essentially the opposite of Partial it takes all optional fields and makes them required
type Car = { doors?: number; color?: string };
const car1: Car = { doors: 2 };
const car2: Required<Car> = { doors: 2 };

// Readonly is a way for you to define that a variable is immutable meaning that it cannot be modified after declaration.
// This is useful in a lot of scenarios and is something that is baked into a lot of languages.
// Lets say I wanted to make an interface similar to react state where data can only be replaced not modified.
interface ImmutableState {
  [key: string]: any;
}

let state: Readonly<ImmutableState> = { count: 1 };
// We cant modify the object directly
state.count++;
state.count = 3;
// However we can replace the entire thing
state = { count: 2 };

// Record is a utility to make a type for an object where you can define a type for the keys and the values
// A example of where this is useful is if you had a button that cycled through different setting states
enum CoffeeSettingName {
  "frappachinno",
  "darkRoast",
  "lightRoast",
}
type CoffeeSettingState = {
  ice: boolean;
  cream: boolean;
  current: boolean;
  next: CoffeeSettingName;
};

const initialState: Record<CoffeeSettingName, CoffeeSettingState> = {
  frappachinno: {
    ice: true,
    cream: true,
    current: true,
    next: "darkRoast",
  },
  darkRoast: {
    ice: false,
    cream: false,
    current: false,
    next: "frappachinno",
  },
  // It wont let us use any setting configurations we haven't defined as a setting name
  mediumRoast: {
    ice: false,
    cream: false,
    current: false,
    next: "darkRoast",
  },
  // it also won't let us use anything other than the defined schema for the settings
  lightRoast: {
    ice: false,
    cream: false,
    milk: false,
    current: false,
    next: "frappachinno",
  },
};

// There are a few type utilities that are essentially shorthands that make it so you don't
// Have to define types with similar structures by typeing them out completely
// Pick is a way for us to create a type by picking out the part of a previously defined type that we want to keep.
interface Alert {
  message: string;
  title: string;
  priority: number;
  icon: string;
}

// For example we have an alert preview that really only needs the title and the icon of the alert
type AlertPreview = Pick<Alert, "icon" | "title">;

const alertPreview: AlertPreview = {
  // it won't let us pass values that we haven't picked
  message: "some long message",
  title: "Alert Title",
  icon: "path/to/icon",
};

// We can acheive similar effects using Exclude or Omit as well.
// However instead of choosing what we want to keep, we choose what we want to get rid of.
// Exclude is specific to using the "type" keyword and will not work for interfaces
// This is because it relies on UnionType's which is not supported for interfaces.
type EmployeeNames = "Alex" | "Bob" | "Alice" | "David";
type ManagerNames = Exclude<EmployeeNames, "Bob" | "Alex">;

const managerName1: ManagerNames = "Alex";
const managerName2: ManagerNames = "David";

//We can provide the same support to interfaces by instead using Omit
interface AdminPermissions {
  read: boolean;
  write: boolean;
  delete: boolean;
}

const guestPermissions: Omit<AdminPermissions, "write" | "delete"> = {
  read: true,
  delete: true,
};

// NonNullable is a way for us to specify that we can't assign undefined or null to a variable
// This will override it even if its a part of the type definition

type ImportantField = NonNullable<string | undefined>;
const importantField: ImportantField = undefined;

// These are the most important ones but there are more, feel free to read on your own from here https://www.typescriptlang.org/docs/handbook/utility-types.html
