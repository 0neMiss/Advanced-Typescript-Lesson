// Mostly stolen and modified from
// https://www.typescriptlang.org/play?#code/PTAEBUAsFMCdtAQ3qALgdwPagLaIJYB2ammANgM4mgAm0AxmcgqjKBZIgA4KYBmSQgCgQoTACMAVg1QAuUEVRw+ietCqJCNNAE8eSMvkQV1AOhHALEGDqQoAbnFsV8OfE1gAaQdr6ZYaGw4mBSooPSYOMHE9MbqVqphrAgUiDjQ5kKoeggAQviwNOA5oAC8oADeQqCg6EQA5hTyAEwA3EIAvu1CisqqeQU0AJKESrAqapXVtQ1NoG2dQkIRhKGg4oMAjPL5hcX65RUzhI0toF3LmKthG4XNO4MjYxMIh8en8+fdorkMiACuJggOQAyvRYPguGF8Bp2KhYP96Kh-rBEGRdPoKDpQtAcJ4rPhUAByKhcEIucRkFjYXqwNwAD0C0AKoEB1MwmRWa1uNAAzA9Ck8+pNyjzNt8wFBoLZxJhWOx-lwybAwtB6UotA0xMkArSXhotBizFZ9gg0UYTFQaNhWDDQPYjApRnATEj8FcjRRvOhIO5oATneN+lROI4kKAANbSrCFTLZfQAeXQ6LehEwSJRhDR8nh-wQHVAADJQLsijl2vGEAAlCREMqVUBpjOwLNkeQqSj5oslx6Bl7dPX9UAABWgqnTEdAao1NCopdNUxqETImBRfH+bbQCOg7RqfEM6nbaJM7Q6PT7Q4Awr76FHiNPoFo573nkOqkvyKvxhuj53d6B93wQ8AOPHdFiEKkwkwZN5CTFMGzqE45mabwm2RFtsy3PMvgg6AwnoG873ka98FvR96yORCPhQ8JPzXH8QM7bxAOAjsgQuE1ODCVJ8Bob0EHgCIokfbQdFXVkgUHNQqEwRwAkrBJDDiChTFAEEeHofA+FItEyB0bxxD+NlQDE-4ZjIdF6jw9Y8LGKdYFgfwrHSChUislTQCGARTNASBZLgMQ5KZADyBXKj7Mc2AvRM8TYmEUQTAQPz0GBHgwQhKFwk0UAuEch06DQF0As0bRghQPx6DZGhnPUNz1FqGBiBjCMtTqeUpPqwwo1AEiyMITJoPggjSLvdphr6+tBolUAE0IBA8EkfxaC0vg4EfSZDIwaByMrAwLXq+wqA6igEhQVhEGhC9pLsXgeGIEqjT25SbvCFcTBocxRCgO10k0KgfLiqd1REwQnVfDbbDoRhkC1QkEnYBgrm0VBXAyJYOtAABpQkNUXHKUSi+RZXIMdCFPdGroQbHUFx99aJXFF5FCCETnJqwRmCuUYACWIgUQR64rTG4EAIzQrO0VdUBcAr+AJKXaAYDwLvdfqll24dFS4WxDmmZd-CZ+EGlPbp1c17W8dQTBsXkQh-hwQzYGNpZRAAEWgO6aC1D1TICepMGPbxbStFa1sISYIg3bRDKQKwyRcFGwyW-m5vqZXHFUgAJaDoCCvwAi4f5KVIvSgbj6BqtEStosJElw02uzYgs6g8G65IcFBjrMlEWbeAEZIbLWeAKC-a684R5kTgMdF+GC8urKsXn6uQVdDSr+0jsp6Kg7hVRJ388YwqsVh4EQbQ7X5v3MG0LgmEmS2d5VWRnbASAaa4JoQFCXf9-3aDTCE4AABHPMoQVYUGALyAA7M0XkUDeQAFZgBV3BJCVAABaY6aDDpoKrsAeBzQABsAAOZopCAAMABifBxDSHNDIUIIAA

// The differences between types and interfaces is mostly in their definition and syntax.
// There are instances where they will behave differently in very minor ways.
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
