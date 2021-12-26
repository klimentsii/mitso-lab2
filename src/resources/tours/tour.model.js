const {v4:uuid}= require('uuid');

class Tour {
    constructor({
                    id = uuid(),
                    title = 'tours- Minsk',
                    slug = 'user',
                    description = 'good city' ,
                    isActive=true ,
                    createdAt =  new Date() ,
                    updatedAt =  new Date()
                } = {}) {
        this.id = id;
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static toResponse(tour) {
        const { id, title, slug, description, isActive, createdAt, updatedAt } = tour;
        return { id, title, slug, isActive, description, createdAt, updatedAt };
    }
}

module.exports = Tour;