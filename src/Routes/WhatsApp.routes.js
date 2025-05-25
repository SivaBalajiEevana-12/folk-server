const {register,registerEvent,RegisterEvent}=require('../Controllers/Whatsapp.Controller');

const express = require('express');
const Event = require('../Models/Event');
const GitaSessionParticipant = require('../Models/Admin.Session.model'); // adjust path as needed
const router = express.Router();
router.post('/register',register);
router.post('/registerEvent',registerEvent);
router.get('/registerEvents',RegisterEvent);
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 }); // sort by date ascending
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events", error });
  }
});
// router.delete("event/:id", async (req, res) => {
//   const { id } = req.params;

//   try {
//     const deleted = await Event.findByIdAndDelete(id);
//     if (!deleted) {
//       return res.status(404).json({ message: "Event not found" });
//     }
//     res.status(200).json({ message: "Event deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to delete event", error });
//   }
// });
router.get('/users', async (req, res) => {
  try {
    const users = await GitaSessionParticipant.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.delete('/deleteAll',async(req,res)=>{
  try {
    const deleted = await GitaSessionParticipant.deleteMany();
    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete event", error });
  }
})
module.exports =router;
