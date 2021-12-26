const {v4:uuid} = require('uuid');

class Price {
    constructor({
                    id = uuid(),
                    scheduleId = null,
                    priceValue = '1408',
                    priceCurrency = 'BYN',
                    createdAt = Date(),
                    updatedAt = Date()


                }={})
    {
        this.id = id;
        this.scheduleId = scheduleId;
        this.priceValue = priceValue;
        this.priceCurrency = priceCurrency;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static toResponse(price){
        const{
            id,
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        } = price;
        return{
            id,
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt

        };
    }
}
module.exports = Price;