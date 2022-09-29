const router = require("express").Router();
const Booking = require("../models/Booking");

//post POST
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    console.log(newBooking);
    const savedBooking = await newBooking.save();
    console.log(savedBooking);
    res.status(200).json(savedBooking);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

//DELETE Booking
router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (booking.username === req.body.username) {
      try {
        await booking.delete();
        res.status(200).json("your booking has been cancelled");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("you cannot update booking");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Booking
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Bookings
router.get("/", async (req, res) => {
  const username = req.query.user;
  console.log(username);
  try {
    let bookings;
    if (username) {
      bookings = await Booking.find({ username });
    } else {
      bookings = await Booking.find();
    }
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
