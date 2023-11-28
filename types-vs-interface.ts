// The differences between types and interfaces is mostly in their definition and syntax.
// There are instances where they will behave differently in very minor ways.
// They also have different utility types available to them
type PostType = {
  message: string;
  comments?: [
    {
      author: string;
      message: string;
      replies: PostType[];
    },
  ];
};

interface PostInterface {
  message: string;
  comments?: [
    {
      author: string;
      message: string;
      replies: PostType[];
    },
  ];
}

let post1: PostType = { message: "" };
let post2: PostInterface = { message: "" };

// TypeScript is a structural type system
// Which means that type compatibility and equivalence are determined by the type's actual structure or definition
// and not by other characteristics such as its name or place of declaration.
// it's possible to intermix their use too.
// This means that we can redeclare a value to an interface that matches the structure of a type.
const post3: PostInterface = post1;
const post4: PostType = post2;

// They both support extending other interfaces and types.
// Type aliases do this via intersection types, using the & operator
// While interfaces have a keyword.
type VideoPostType = { videoUrl: string; publisher: string } & PostType;

interface VideoPostInterface extends PostType {
  caption: string;
  videoUrl: string;
}

type HeadlinePost = PostType | VideoPostType;

// One small syntax quirk of types is the interaction between the keyword implements and union types
class SomeClass implements HeadlinePost {}

let videoPostType: VideoPostType = {
  videoUrl: "video-url.com",
  message: "some message",
  publisher: "some guy on the internet",
};

let videoPostInterface: VideoPostInterface = {
  videoUrl: "video-url.com",
  message: "My Message",
  caption: "My video caption",
};

// Another difference is how the error messages are worded.
// Typescript docs say that interface is easier to read but,
// I feel like its up to personal opinion on which one is easier to read.

videoPostType = videoPostInterface;
videoPostInterface = videoPostType;

// One major difference between type aliases vs interfaces
// are that interfaces are open and type aliases are closed.
// This means you can extend an interface by declaring it a second time.
interface Kitten {
  purrs: boolean;
}

interface Kitten {
  colour: string;
}

// Both values now exist on this type
const littleCat: Kitten = { purrs: true, colour: "black" };

// A type cannot be changed outside of its declaration
type Puppy = {
  color: string;
};

type Puppy = {
  toys: number;
};

// One of the best resources for seeing all of the edge
// cases around types vs interfaces, this stack overflow
// thread is a good place to start:

// https://stackoverflow.com/questions/37233735/typescript-interfaces-vs-types/52682220#52682220
