// Defining RESTful API endpoints for aticles
import Article from '../models/Article.js';

async function routes(fastify) {
    // GET /articles - List all articles with optional filters
    fastify.get('/articles', async (request, reply) => {
        const { tag, startDate, endDate } = request.query;
        let query = {}

        // filter by tags
        if (tag) {
            query.tags = tag
        }

        // filter by data range
        if (startDate || endDate) {
            query.publishDate = {}
            if (startDate) query.publishDate.$gte = new Date(startDate);
            if (endDate) query.publishDate.$lte = new Date(endDate)
        }

        try {
            const articles = await Article.find(query);
            return articles;
        } catch (err) {
            reply.code(500).send({
                error : "Failed to fetch articles"
            });
        }

        // eg 
        // query = {
        //     tags: 'tech',
        //     publishDate: { $gte: new Date('2023-01-01'), $lte: new Date('2023-12-31') }
        // }
    });

    // Get /articles/:id - List all articles with optional filters
    fastify.get('/articles/:id', async (request, reply) => {
        try {
            const article = await Article.findById(request.params.id);
            if (!article) {
                reply.code(404).send({
                    error : "Article not found"
                });
            }
            return article;
        } catch (err) {
            reply.code(500).send({
                error : "Failed to fetch article"
            });
        }
    });

    // POST /articles - Create a new article
    fastify.post('/articles', async (request, reply) => {
        try {
            const article = new Article(request.body);
            const savedArticle = await article.save();
            reply.code(201).send({
                savedArticle
        })
        } catch (err) {
            reply.code(500).send({
                error : "Failed to create article"
            })
        }
    })

    // PUT /articles/:id - Update an article by id
    fastify.put('/articles/:id', async (request, reply) => {
        try {
            const article = await Article.findByIdAndUpdate(
                request.params.id,
                request.body,
                { new : true }
            );
            if (!article) {
                reply.code(404).send({
                    error : "Article not found"
                })
                return;
            }
            return article;
        } catch (err) {
            reply.code(500).send({
                error : "Failed to update article"
            })
        }
    });

    // DELETE /article/:id - Delete an article by id
    fastify.delete('/articles/:id', async (request, reply) => {
        try {
            const article = await Article.findByIdAndDelete(request.params.id);
            if (!article) {
                reply.code(404).send({
                    error : 'Article not found'
                });
                return;
            }
            reply.code(204).send()
        } catch (err) {
            reply.code(500).send({
                error : "Failed to delete articles"
            });
        }
    });
}

export default routes