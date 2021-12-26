const {
    StatusCodes
} = require('http-status-codes');
const router = require('express').Router();
const Price = require('../prices/price.model');
const Schedule = require('./schedule.model');

const schedulesService = require('./schedule.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
    catchErrors(async (req, res) => {
        const schedules = await schedulesService.getAll();

        res.json(schedules.map(Schedule.toResponse));
    })
);

router.route(':/:id').get(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const schedules = await schedulesService.getById(id);

        if (schedules) {
            res.json(Schedule.toResponse(schedules));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'SCHEDULE_NOT_FOUND',
                    msg: 'schedules not found'
                });
        }
    })
);

router.route('/:id/prices').get(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const Schedules = await schedulesService.getPricesByScheduleId(id);

        if (Schedules) {
            res.json(Schedules.map((ord) => Price.toResponse(ord)));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRICES_NOT_FOUND',
                    msg: 'Prices not found'
                });
        }
    })
);

router.route('/').post(
    catchErrors(async (req, res) => {
        const {
            TourId,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        } = req.body;

        const schedule = await schedulesService.createSchedule({
            TourId,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        });

        if (schedule) {
            res.status(StatusCodes.CREATED).json(Schedule.toResponse(schedule));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'SCHEDULE_NOT_CREATED',
                    msg: 'schedules not created'
                });
        }
    })
);

router.route(':/:id').put(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;
        const {
            TourId,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        } = req.body;

        const schedule = await schedulesService.updateById({
            id,
            TourId,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        });

        if (schedule) {
            res.status(StatusCodes.OK).json(Schedule.toResponse(schedule));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'SCHEDULES_NOT_FOUND',
                    msg: 'schedules not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const schedule = await schedulesService.deleteById(id);

        if (!schedule) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'SCHEDULE_NOT_FOUND',
                    msg: 'schedules not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'SCHEDULE_DELETED',
                msg: 'The schedules has been deleted'
            });
    })
);

module.exports = router;