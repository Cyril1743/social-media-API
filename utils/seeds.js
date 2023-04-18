const connection = require("../config/connection")
const User = require("../models/User")
const Thought = require("../models/Thought")
const { default: mongoose } = require("mongoose")

const users = [
    {
        username: "confesszoglin",
        email: 'yasmeen.will53@gmail.com',
        password: "password123",
        friends: []
    },
    {
        username: "raidpricey",
        email: "golden.macejkovic@hotmail.com",
        password: "raidpricey!",
        friends: []
    },
    {
        username: "spritsailfox12",
        email: "kaden_jacob@gmail.com",
        password: "kadenJ123!",
        friends: []
    },
    {
        username: "scorchmainsheet23",
        email: "fannie.crona@yahoo.com",
        password: "fcrona123!",
        friends: []
    },
    {
        username: "everythingbagel123",
        email: "desmond67@gmail.com",
        password: "D3sm0nd!",
        friends: []
    },
    {
        username: "toush30",
        email: "fanny.turcotte@gmail.com",
        password: "password123",
        friends: []
    }
]

const posts = [
    {
        thoughtText: "It is a great day today!",
        username: "everythingbagel123",
        reactions: []
    },
    {
        thoughtText: "I just saw something funny.",
        username: "confesszoglin",
        reactions: []
    },
    {
        thoughtText: "The sun is shining bright today!",
        username: "spritsailfox12",
        reactions: []
    },
    {
        thoughtText: "I am so tired today it isn't even funny",
        username: "toush30",
        reactions: []
    },
    {
        thoughtText: "Is it going to rain today?",
        username: "scorchmainsheet23",
        reactions: []
    },
    {
        thoughtText: "This look really delicious and I am very hungry",
        username: "spritsailfox12",
        reactions: []
    },
    {
        thoughtText: "I can't believe that someone would do that!",
        username: "raidpricey",
        reactions: []
    },
    {
        thoughtText: "I love listening to music. What is your favorite artist?",
        username: "everythingbagel123",
        reactions: []
    }
]

const reactions = [
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "Today was bueatiful!",
        username: "confesszoglin"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "Lol, that is funny",
        username: "everythingbagel123"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "I love days like today",
        username: "toush30",
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "Nap time is calling my name",
        username: "scorchmainsheet23"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "I think it might",
        username: "everythingbagel123",
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "I am starving too!",
        username: "raidpricey"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "Me neither!",
        username: "spritsailfox12"
    },
    {
        reactionId: new mongoose.Types.ObjectId(),
        reactionBody: "I love listening to Imagine Dragons",
        username: "spritsailfox12"
    }
]

connection.once("open", async () => {
    await User.deleteMany({})
    await Thought.deleteMany({})

   await User.insertMany(users)

   for(let i = 0; i < posts.length; i++){
    const newThought = await Thought.create({
        thoughtText: posts[i].thoughtText,
        username: posts[i].username,
        reactions: reactions[i]
    })
    await User.findOneAndUpdate({username: posts[i].username},{
        $push : {thoughts: newThought.id}
    })
   }


   console.table(users)
   console.table(posts)
   console.table(reactions)
   console.log("Database Seeded!")
   process.exit(1)
})