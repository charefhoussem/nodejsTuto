const express = require("express");
const tourController = require("../controllers/tourController");

const router = express.Router();

// router.get("/", (req, res) => {
//   res.json(tours);
// });

// router.post("/", (req, res) => {
//   const tour = req.body;

//   tours.push(tour);

//   res.status(201).json({
//     status: "success",
//     data: tour,
//   });
// });

// router.get("/api/v1/tour/:id", (req, res) => {
//   const id = req.params.id;
//   const tour = tours[id];
//   if (!tour) {
//     return res.status(404).json({
//       status: "fail",
//       message: "id not found",
//     });
//   }
//   res.status(200).json({
//     status: "success",
//     data: tours[id],
//   });
// });

// router.delete("/api/v1/tour/:id", (req, res) => {
//   const id = req.params.id;

//   const tour = tours[id];
//   if (!tour) {
//     return res.status(404).json({
//       status: "fail",
//       message: "id not found",
//     });
//   }

//   tours.splice(id, 1);

//   res.status(204).json({
//     status: "success",
//     data: null,
//   });
// });

// router.put("/api/v1/tour/:id", req, res) => {
//   const id = req.params.id;
//   const tour = tours[id];

//   if (!tour) {
//     return res.status(404).json({
//       status: "fail",
//       message: "id not found",
//     });
//   }

//   tour[id] = req.body;

//   res.status(201).json({
//     status: "success",
//     data: tour[id],
//   });
// });

router.route("/").get(tourController.getTours).post(tourController.addTour);

router
  .route("/:id")
  .get(routeMiddleware, tourController.getTour)
  .delete(tourController.deleteTour)
  .put(tourController.updateTour);

function routeMiddleware(req, res, next) {
  console.log(req.originalUrl);
  next();
}

module.exports = router;
