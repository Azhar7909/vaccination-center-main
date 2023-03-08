const express = require("express");
const router = express.Router();
require('../db/db-conn');
const User = require('../db/models/reservation-schema');



// create reservation
router.post("/create-reservation", async (req, res) => {
  const { nric, name, center, slot } = req.body;
  console.log(req.body);
  if (!nric || !name || !center || !slot) {
    return res.status(422).json({ error: "Plz fill the fields properly" })
  }

  try {
    const reservation = await Reservation.findOne({ slot: slot });

    if (reservation) return res.status(422).json({ error: `This slot is already reserved!` });

    const reserv = new Reservation({ nric, name, center, slot });

    const reservCreated = await reserv.save();

    if (reservCreated) res.status(201).json({ messase: "reservation created successfully!", detail: reservCreated });

  } catch (err) {
    res.status(500).json({ messase: "Failed reservation!", detail: err });
  }
});

// get reservation by id
router.get("/reservation-list/:id", (req, res) => {

  const id = req.params.id;

  Reservation.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Reservation with id " + id, detail: err });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Reservation with id=" + id, detail: err });
    });
});

// get reservation list
router.get("/reservation-list", (req, res) => {

  Reservation.find({}, function (err, reserv) {
    var reservationMap = [];

    reserv.forEach(function (r) {
      reservationMap.push(r)
    });

    res.send(reservationMap);
  });
});

// update reservation
router.put("/update-reservation/:id", async (req, res) => {
  const { nric, name, center, slot } = req.body;

  if (!nric || !name || !center || !slot) {
    return res.status(404).json({ error: "Data to update can not be empty!" })
  }
  const id = req.params.id;

  try {
    const reservUpdated = await Reservation.findByIdAndUpdate(id, req.body, { useFindAndModify: false });

    if (!reservUpdated) { return res.status(404).json({ error: `Cannot update reservation with id=${id}. Maybe reservation was not found!!` }); }

    res.status(200).json({ messase: "reservation updated successfully!", detail: reservUpdated });

  } catch (err) {
    res.status(500).json({ messase: `Cannot update reservation with id=${id}. Maybe reservation was not found!`, detail: err });
  }
});

// delete reservation
router.delete("/delete-reservation/:id", async (req, res) => {

  const id = req.params.id;

  try {
    const reservDeleted = await Reservation.findByIdAndRemove(id);

    if (!reservDeleted) return res.status(404).json({ error: `Cannot delete reservation with id=${id}. Maybe reservation was not found!!` });

    res.status(200).json({ messase: "reservation deleted successfully!", detail: reservDeleted });

  } catch (err) {
    res.status(500).json({ messase: `Cannot delete reservation with id=${id}. Maybe reservation was not found!!`, detail: err });
  }
});


module.exports = router;