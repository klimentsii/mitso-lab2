const {
    StatusCodes
} = require('http-status-codes');

const router = require('express').Router();
const Tour = require('./tour.model');
const Schedule = require('../prices/price.model');

const toursService = require('./tour.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
    catchErrors(async (req, res) => {
        const tours = await toursService.getAll();

        res.json(tours.map(Tour.toResponse));
    })
);

router.route(':/:id').get(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const tour = await toursService.getById(id);

        if (tour) {
            res.json(Tour.toResponse(tour));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'TOUR_NOT_FOUND',
                    msg: 'tours not found'
                });
        }
    })
);

router.route('/:id/schedules').get(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const schedules = await toursService.getSchedulesByTourId(id);

        if (schedules) {
            res.json(schedules.map((ord) => Schedule.toResponse(ord)));
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

router.route('/').post(
    catchErrors(async (req, res) => {
        const {
            title,
            slug,
            description,
            isActive,
            createdAt,
            updatedAt
        } = req.body;

        const tour = await toursService.createTour({
            title,
            slug,
            description,
            isActive,
            createdAt,
            updatedAt
        });

        if (tour) {
            res.status(StatusCodes.CREATED).json(Tour.toResponse(tour));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'TOUR_NOT_CREATED',
                    msg: 'tours not created'
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
            title,
            slug,
            description,
            isActive,
            createdAt,
            updatedAt
        } = req.body;

        const tour = await toursService.updateById({
            id,
            title,
            slug,
            description,
            isActive,
            createdAt,
            updatedAt
        });

        if (tour) {
            res.status(StatusCodes.OK).json(Tour.toResponse(tour));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'TOUR_NOT_FOUND',
                    msg: 'tours not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const tour = await toursService.deleteById(id);

        if (!tour) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'TOUR_NOT_FOUND',
                    msg: 'TOUR not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'TOUR_DELETED',
                msg: 'The tour has been deleted'
            });
    })
);

module.exports = router;