const db = require("../models");
const Restaurant = db.restaurant;

exports.createRestaurant = (req, res) => {
  // Check if the restaurant name is already taken
  Restaurant.findOne({ where: { name: req.body.name } }).then((restaurant) => {
    if (restaurant) {
      res.status(400).send({
        message: "Failed! Restaurant name is already in use!",
      });
      return;
    }

    // Create a new restaurant object
    const restaurant = {
      name: req.body.name,
      description: req.body.description,
      location: req.body.location,
      phone: req.body.phone,
      rating: 0,
      picture: req.body.picture,
    };

    // Save the restaurant in the database
    Restaurant.create(restaurant)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the restaurant.",
        });
      });
  });
};

exports.getAllRestaurants = (req, res) => {
  Restaurant.findAll().then((restaurants) => {
    res.send(restaurants);
  });
};

exports.getRestaurantById = (req, res) => {
  const id = req.params.id;

  Restaurant.findByPk(id).then((restaurant) => {
    if (!restaurant) {
      res.status(404).send({
        message: "Restaurant not found",
      });
    } else {
      res.send(restaurant);
    }
  });
};

exports.updateRestaurant = (req, res) => {
  const id = req.params.id;

  Restaurant.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Restaurant was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Restaurant with id=" + id,
      });
    });
};

exports.deleteRestaurant = (req, res) => {
  const id = req.params.id;

  Restaurant.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Restaurant was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Restaurant with id=" + id,
      });
    });
};
