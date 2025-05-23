const {register,registerEvent}=require('../Controllers/Whatsapp.Controller');

const express = require('express');
const Event = require('../Models/Event');
const router = express.Router();
router.post('/register',register);
router.post('/registerEvent',registerEvent);
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 }); // sort by date ascending
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
});
router.delete("event/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error });
  }
});
module.exports =router;
