import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    publishDate: { type: Date, default: Date.now },
    tags: [{ type: String }]
})

export default mongoose.model('Article', articleSchema)



// or 
// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const blogSchema = new Schema({ })