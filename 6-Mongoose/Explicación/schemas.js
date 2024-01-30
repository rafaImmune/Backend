let mongoose = require('mongoose')

const autorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: {
            type: String,
            required: [true, 'El nombre es un requisito'],
        },
        lastName: String,
    },
    biography: String,
    twitter: {
        type: String,
        validate: {
            validator: function (text) {
                return text.indexOf('https://twitter.com/') === 0
            },
            message: 'La dirección debe empezar por: https://twitter.com/)',
        },
    },
    facebook: {
        type: String,
        validate: {
            validator: function (text) {
                return text.indexOf('https://www.facebook.com/') === 0
            },
            message: 'La dirección debe empezar por: https://www.facebook.com/',
        },
    },
    linkedin: {
        type: String,
        validate: {
            validator: function (text) {
                return text.indexOf('https://www.linkedin.com/') === 0
            },
            message: 'La dirección debe empezar por:(https://www.linkedin.com/)',
        },
    },
    created: {
        type: Date,
        default: Date.now,
    },
})

const libroSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    summary: String,
    isbn: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'autor'
    },
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: {
                type: Date,
                default: Date.now
            }
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

let Autor = mongoose.model('autor', autorSchema, 'autores')
let Libro = mongoose.model('libro', libroSchema,)

module.exports = {Autor, Libro}