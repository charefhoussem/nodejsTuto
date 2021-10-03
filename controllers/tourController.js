const tours = require("../dev-data/tours");
const Tour = require("../models/tourModel");

exports.getTours = async (req, res) => {
  const tours = await Tour.find();
  res.status(200).json({
    status: "success",
    length: tours.length,
    data: tours,
  });
};

exports.addTour = async (req, res) => {
  // tours.push(tour);
  try {
    const tour = await Tour.create(req.body);

    res.status(201).json({
      status: "success",
      data: tour,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err._message,
    });
  }
};

exports.getTour = async (req, res) => {
  const id = req.params.id;
  const tour = await Tour.findById(id);
  // console.log(tour);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "id not found",
    });
  }
  res.status(200).json({
    status: "success",
    data: tour,
  });
};

exports.deleteTour = async (req, res) => {
  const id = req.params.id;

  const tour = await Tour.findByIdAndDelete(id);
  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "id not found",
    });
  }

  // tours.splice(id, 1);

  res.status(204).json({
    status: "success",
    data: null,
  });
};

exports.updateTour = async (req, res) => {
  const id = req.params.id;
  const tour = await Tour.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "id not found",
    });
  }

  // tour[id] = req.body;

  res.status(201).json({
    status: "success",
    data: tour,
  });
};
