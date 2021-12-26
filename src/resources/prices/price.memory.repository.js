const Price = require('./price.model');

const Prices = [new Price()]

const getAll = async () => Prices;

const getById = async (id) => Prices.find((price) => price.id === id);

const getPriceIdByScheduleId = async (scheduleId) => {
    const prices = prices.filter((price) => price.scheduleId === scheduleId)
}


const createPrice = async ({
                               scheduleId,
                               priceValue,
                               priceCurrency,
                               createdAt,
                               updatedAt
                           }) => {
    const price = new Price({
        scheduleId,
        priceValue,
        priceCurrency,
        createdAt,
        updatedAt
    })
    prices.push(price)
    return price
}

const updateById = async (id) => ({
                                      scheduleId,
                                      priceValue,
                                      priceCurrency,
                                      createdAt,
                                      updatedAt
                                  }) => {
    const pricePos = Prices.findIndex((price) => price.id === id);

    if (pricePos === -1) return null;

    const oldPrice = Prices[pricePos]

    const newPrice = {
        ...oldPrice,
        scheduleId,
        priceValue,
        priceCurrency,
        createdAt,
        updatedAt
    };

    Prices.splice(pricePos, 1, newPrice);
    return newPrice;

};
const deleteById = async (id) => {
    const pricePos = prices.findIndex((price) => price.id === id);

    if (pricePos === -1) return null;

    const priceDeletable = prices[pricePos];

    prices.splice(pricePos, 1);
    return priceDeletable;
}

const deleteByScheduleId = async (scheduleId) => {
    const schedules = prices.filter((price) => price.scheduleId === scheduleId);

    await Promise.allSettled(schedules.map(async (price) => deleteById(price.id)))
}


module.exports = {
    Prices,
    getAll,
    getById,
    getPriceIdByScheduleId,
    createPrice,
    updateById,
    deleteById,
    deleteByScheduleId
}