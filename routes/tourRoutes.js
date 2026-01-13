const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourController.CheckID);

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.GetAllTours);

router.route('/tour-stats').get(tourController.GetTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourController.GetMonthlyPlan
  );

router.route('/tours-within/:distance/center/:latlng/unit/:unit').get(tourController.getToursWithin)

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  .route('/')
  .get(tourController.GetAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guides'),
    tourController.CreateTour
  );
router
  .route('/:id')
  .get(tourController.GetATour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.UpdateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = router;
