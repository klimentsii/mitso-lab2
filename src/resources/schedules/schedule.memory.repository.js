const Schedule = require('./schedule.model')
const priceRepo = require('../prices/price.memory.repository');

const Schedules = [new Schedule()];

const getAll = async () => Schedules;

const getById = async (id) => Schedules.find((schedule) => schedule.id === id);

const getSchedulesByTourId = async (tourId) => {
    const schedules = Schedules.filter((schedule) => schedule.tourId === tourId);
    return schedules;
}

const createSchedule = async ({
                                  TourId,
                                  isActive,
                                  startDate,
                                  endDate,
                                  createdAt,
                                  updatedAt
                              }) => {
    const schedule = new Schedule({
        TourId,
        isActive,
        startDate,
        endDate,
        createdAt,
        updatedAt
    })
    Schedules.push(schedule);
    return schedule;
}

const updateById = async (id) =>({
                                     TourId,
                                     isActive,
                                     startDate,
                                     endDate,
                                     createdAt,
                                     updatedAt
                                 }) => {
    const schedulePos = scheduleList.findIndex((order) => schedule.id === id);

    if (schedulePos === -1) return null;

    const oldschedule = Schedules[schedulePos];

    const newSchedule = {
        ...oldSchedule,
        TourId,
        isActive,
        startDate,
        endDate,
        createdAt,
        updatedAt
    };

    Schedules.splice(schedulePos, 1, newSchedule);
    return newSchedule;
}
const deleteById = async (id) => {
    const schedulePos = Schedules.findIndex((schedule) => schedule.id === id);

    if (schedulePos === -1) return null;

    const scheduleDeletable = Schedules[schedulePos];

    Schedules.splice(schedulePos, 1);
    return scheduleDeletable;
}

const deleteByTourId = async (tourId) => {
    const schedule = Schedules.filter((schedule) => schedule.tourId === tourId);

    await Promise.allSettled(schedules.map(async (schedule) => {
        deleteById(schedule.id);
        pricesRepo.deleteByScheduleId(schedule.id);
    }))
}

module.exports = {
    Schedules:Schedules,
    getAll,
    getById,
    getSchedulesByTourId,
    createSchedule,
    deleteById,
    updateById,
    deleteById,
    deleteByTourId

}