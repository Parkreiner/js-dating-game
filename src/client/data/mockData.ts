import { Contestant, GameState } from "../gameState";

const questions = [
  "It's a Sunday afternoon. You have nothing planned, no obligations. How do you spend your free time?",
  "If you were deserted on a remote island, but could bring just one thing, what would you choose?",
  "What are you looking for in a partner?",
  "Do you speak any other languages?",
  "If you could be any animal, what would you be and why?",
];

const eventLoop: Contestant = {
  api: {
    id: 1,
    name: "The Event Loop",
    datingBio:
      "The business professional with an always-booked schedule. Constantly juggling various things. You barely get one-on-one time before they've moved on to the next thing.",
    imgUrl: null,
    techBio: null,
  },
  state: {
    answers: [
      "I'm afraid \"free time\" doesn't exist in my vocabulary. I am a very busy person. If I didn't have any appointments or events to go to, something would be very wrong.",
      "A phone to call for help, obviously. I serve a number of very busy clients, and would need to get back to civilization as soon as possible.",
      "I'm not looking for a serious relationship right now. Maybe not ever. Why commit myself to one thing?",
      "The only other language I need is JavaScript.",
      "A queen ant. I would enjoy coordinating a whole colony.",
    ],
    votes: 0,
    index: 1,
  },
};

const generatorFunctions: Contestant = {
  api: {
    id: 2,
    name: "Generator Functions",
    datingBio:
      "Barely anyone knows about them, but they have a cousin who is a major celebrity. Impeccable memory. Weirdly obsessed with infinity; has a really bad tattoo of it on their arm.",
    imgUrl: null,
    techBio: null,
  },

  state: {
    answers: [
      "I'd be spending that time contemplating infinity. Hear me out: an afternoon is just an infinite sequence of infinitely small intervals of time.",
      'One thing, you say...What is "one"? What is a "thing"? We are all just electrons buzzing in the air; we are all connected.',
      "I'm hoping it yields something I can keep coming back to again and again.",
      "It is the case that I speak at least one language.",
      "Ouroboros.",
    ],
    votes: 0,
    index: 2,
  },
};

const arrayReduce: Contestant = {
  api: {
    id: 3,
    name: "Array.reduce",
    datingBio:
      "Textbook case of wasted potential. Has never been in a relationship that has pushed them to grow as a person. No one really understands what they do professionally.",
    imgUrl: null,
    techBio: null,
  },

  state: {
    answers: [
      "I dunno? Just hanging around the house, browsing random websites?",
      "Can I cheat? If I put a bunch of stuff in a backpack, does that count?",
      "I'm looking for my soulmate. Someone who completes me. I want to be with them, heart, body, and soul.",
      "Does math count? I'm pretty good at math.",
      "As gross as it sounds, a dung beetle. I just like how they start snowballing stuff into one giant thing.",
    ],
    votes: 0,
    index: 3,
  },
};

const implicitTypeCoercion: Contestant = {
  api: {
    id: 4,
    name: "Implicit Type Coercion",
    datingBio: "Can barely do anything right. Still eats crayons at the age of 35.",
    imgUrl: null,
    techBio: null,
  },

  state: {
    answers: [
      "Eating my boogers. I can share next time if you want.",
      "Either my comic book collection, or my mom, so she can make me dino tendies.",
      `Anyone who won't make fun of me for saying that 2 + "2" is "22".`,
      `I've taught myself Japanese from watching anime. My favorite word is "onii-chan".`,
      "I wish I could be a pony, so I could be friends with Twilight Sparkle.",
    ],

    votes: 0,
    index: 4,
  },
};

const regexes: Contestant = {
  api: {
    id: 5,
    name: "Regexes",
    datingBio:
      "The smartest person you know. Peering into their mind is like staring into an abyss. Only coherent 1% of the time.",
    imgUrl: null,
    techBio: null,
  },

  state: {
    answers: [
      "/I would go to a (?:park|coffee shop) and have a [gwrtefdal] time\\./i",
      "/(?:a )?(?:box of matches|book|fishing net|knife|a friend)/g",
      "/Someone who (?=looks ahead to the future\\.)/",
      "/.*/u",
      "/(?<=A )(?:sp)hin[xX]/",
    ],

    votes: 0,
    index: 5,
  },
};

const mockData: GameState = {
  questions,
  contestants: [eventLoop, generatorFunctions, arrayReduce, implicitTypeCoercion, regexes],
};

export { mockData };
