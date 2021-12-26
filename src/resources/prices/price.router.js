const {
    StatusCodes
} = require('http-status-codes');
const router = require('express').Router();
const Price = require('./price.model');

const pricesService = require('./price.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
    catchErrors(async (req, res) => {
        const prices = await pricesService.getAll();

        res.json(prices.map(Price.toResponse));
    })
);

router.route(':/:id').get(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const price = await pricesService.getById(id);

        if (price) {
            res.json(Price.toResponse(price));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRICE_NOT_FOUND',
                    msg: 'prices not found'
                });
        }
    })
);

router.route('/').post(
    catchErrors(async (req, res) => {
        const {
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        } = req.body;
        const price = await pricesService.createPrice({
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        });

        if (price) {
            res.status(StatusCodes.CREATED).json(Price.toResponse(price));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'PRICE_NOT_CREATED',
                    msg: 'prices not created'
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
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        } = req.body;

        const price = await pricesService.updateById({
            id,
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        });

        if (price) {
            res.status(StatusCodes.OK).json(Price.toResponse(price));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRICE_NOT_FOUND',
                    msg: 'prices not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const price = await pricesService.deleteById(id);

        if (!price) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRICE_NOT_FOUND',
                    msg: 'prices not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'PRICE_DELETED',
                msg: 'The PRICE has been deleted'
            });
    })
);

module.exports = router;