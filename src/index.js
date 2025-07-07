import Fastify from 'fastify';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fastifyMongo from '@fastify/mongodb';
import articleRoutes from './routes/articles.js';
dotenv.config();

// accessing port and dburl from .env file
// dburl represents MongoDB atlas connection string or local URL
const port = process.env.PORT
const dburl = process.env.DB_URL
// const mongodburl = process.env.MONGODB_URL

// initialise fastify with logger
const fastify = Fastify({
    logger : true
});

// Register MongoDB plugin
fastify.register(fastifyMongo, {
    url : dburl
});

// Import routes
fastify.register(articleRoutes);

// main server function
const start = async () => {
    try {
        await mongoose.connect(dburl);
        console.log('Connected to MongoDb');
        await fastify.listen({port : port});
        console.log(`Server running at http://localhost:${listenPort}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1)
    }
};

start();


// debug note, ask for methods available under the .connect() method in mongoose to understand this "{ useNewUrlParser : true, useUnifiedTopology : true }" logic
