const { Schema, model, Types} = require("mongoose")


const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: [true, "Body is a required field"]
    },
    username: {
        type: String,
        required: [true, "Username is a required field"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
}, {
    toJSON: {
        virtuals: true
    },
    id: false
})

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: [true, "Text field is required"],
        min: 1,
        max: [280, "Max length is 280"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    username: {
        type: String,
        requierd: [true, "Username is a required field"]
    },
    reactions: [reactionSchema]
}, {
    toJSON: {
        virtuals: true
    }
})

reactionSchema.virtual("formatDate").get(function () {
    return this.createdAt.toLocaleTimeString("en-us", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'America/Chicago'
    })
}) 

thoughtSchema.virtual("formatDate").get(function () {
    return this.createdAt.toLocaleTimeString("en-us", {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'America/Chicago'
    })
})

thoughtSchema.virtual("reactionLength").get(function () {
    return this.reactions.length
})
const Thought = model("thought", thoughtSchema)

module.exports = Thought