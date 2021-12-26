const pricesRepo = require('./price.memory.repository');

const getAll = () => pricesRepo.getAll();

const getById = (id) => pricesRepo.getById(id);

const createPrice = ({
                         id,
                         scheduleId,
                         priceValue,
                         priceCurrency,
                         createdAt,
                         updatedAt
                     }) => pricesRepo.createPrice({
    id,
    scheduleId,
    priceValue,
    priceCurrency,
    createdAt,
    updatedAt
});

const updateById = async (id) => ({
                                      scheduleId,
                                      priceValue,
                                      priceCurrency,
                                      createdAt,
                                      updatedAt
                                  }) => pricesRepo.updateById({
    id,
    scheduleId,
    priceValue,
    priceCurrency,
    createdAt,
    updatedAt
});

const deleteById = async (id) => {
    const priceDeletable = await getById(id);
    pricesRepo.deleteById(id);
    return priceDeletable;
}

module.exports = {
    getAll,
    getById,
    createPrice,
    updateById,
    deleteById
}