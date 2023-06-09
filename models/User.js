const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is a required field"],
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email field is required"],
        validate: {
            validator: function (v) {
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v)
            }
        }
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "thought"
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
}, {
    toJSON: {
        virtuals: true
    },
    id: false
})

userSchema.virtual("friendCount").get(function () {
    return this.friends.length
})

const User = model("user", userSchema)

module.exports = User