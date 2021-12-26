const {v4:uuid} = require('uuid');

class Schedule {
    constructor({
                    id = uuid(),
                    Tourid = null,
                    isActive = true,
                    startDate =new Date(),
                    endDate = new Date (),
                    createdAt =  new Date(),
                    updatedAt = new Date()

                }={})
    {
        this.id = id;
        this.Tourid = Tourid;
        this.isActive = isActive;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdAt =createdAt;
        this.updatedAt =updatedAt;
    }

    static toResponse(schedule){
        const{
            id,
            Tourid,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        } = schedule;
        return{
            id,
            Tourid,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt

        };
    }
}
module.exports = Schedule;