const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const paragraphScheme = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: ""
    },
    
})
const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    paragraphs: {
        type: [paragraphScheme],
        default:[]
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }

},{
    timestamps: true,
})



module.exports = mongoose.model('Blog', blogSchema);