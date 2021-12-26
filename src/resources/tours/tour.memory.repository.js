const Tour = require('./tour.model')

const Tours = [new Tour()]

const getAll = async () => Tours;

const getById = async (id) => Tours.find((tour) => tour.id === id);

const createTour = async ({
                              title,
                              slug,
                              description,
                              isActive,
                              createdAt,
                              updatedAt
                          }) => {
    const tour = new Tour({
        title,
        slug,
        description,
        isActive,
        createdAt,
        updatedAt
    })
    Tours.push(tour);
    return tour;
}

const updateById = async (id) => (({
                                       title,
                                       slug,
                                       description,
                                       isActive,
                                       createdAt,
                                       updatedAt
                                   }) => {
    const tourPos = Tours.findIndex((tour) => tour.id === id);
    if (tourPos === -1) return null;

    const oldTour = Tours[tourPos];

    const newTour = {
        ...oldTour,
        title,
        slug,
        description,
        isActive,
        createdAt,
        updatedAt
    };

    Tours.splice(tourPos, 1, newTour);
    return newTour;
})
const deleteById = async (id) => {
    const tourPos = Tours.findIndex((tour) => tour.id === id);

    if (tourPos === -1) return null;

    const tourDeletable = Tours[tourPos];

    this.Tours.splice(tourPos, 1);
    return tourDeletable;
}

module.exports = {
    Tours,
    getAll,
    getById,
    createTour,
    updateById,
    deleteById
}