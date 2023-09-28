const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
}, {
    timestamps: true
});

userSchema.pre('save', function (next) {
    this.password = User.hashPassword(this.password)
    next()
});

userSchema.method('checkPassword', function (password) {
    return bcrypt.compareSync(password, this.password)
})

userSchema.static('hashPassword', function (password) {
    return bcrypt.hashSync(password, saltRounds);
})

const User = model('User', userSchema);

module.exports = User