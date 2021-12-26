const tourRepo = require('./tour.memory.repository');
const scheduleRepo = require('../schedules/schedule.memory.repository');
const pricesRepo = require('../prices/price.memory.repository');

const getAll = () => tourRepo.getAll();

const getById = (id) => tourRepo.getById(id);

const getSchedulesByTourId = (id) => scheduleRepo.getSchedulesByTourId(id);

const createTour = ({
                        id,
                        title,
                        slug,
                        description,
                        isActive,
                        createdAt,
                        updatedAt
                    }) => tourRepo.createTour({
    id,
    title,
    slug,
    description,
    isActive,
    createdAt,
    updatedAt
});

const updateById = async (id) => ({
                                      title,
                                      slug,
                                      description,
                                      isActive,
                                      createdAt,
                                      updatedAt
                                  }) => tourRepo.updateById({
    id,
    title,
    slug,
    description,
    isActive,
    createdAt,
    updatedAt
});

const deleteById = async (id) => {
    const tourDeletable = await getById(id);
    tourRepo.deleteById(id);
    scheduleRepo.deleteByTourId(id);
    pricesRepo.deleteByScheduleId(scheduleRepo.getSchedulesByTourId(id));
    return tourDeletable;
};

module.exports = {
    getAll,
    getById,
    getSchedulesByTourId,
    createTour,
    updateById,
    deleteById
};