const twilio = require('twilio');
// const bcrypt = require('bcryptjs');
const GitaSessionParticipant = require('../Models/Admin.Session.model'); 
const Event = require('../Models/Event'); // adjust path as needed
// const AdminSessionModel = require('../Models/Admin.Session.model');
// adjust path as needed
require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN ;
const fromWhatsApp = process.env.TWILIO_WHATSAPP_FROM; // Default Twilio WhatsApp number

const client = twilio(accountSid, authToken);

const register = async (req, res) => {
  try {
    const {
      name,
      whatsappNumber,
      age,
      collegeOrWorking,
      place,
      selectedBook,
      interestedInGitaSession
    } = req.body;

    // Validate required fields
    if (!name || !whatsappNumber || interestedInGitaSession === undefined) {
      return res.status(400).send({ message: "Please fill required fields: name, WhatsApp number, and interest status." });
    }

    // Check if participant already exists
    const existing = await GitaSessionParticipant.findOne({ whatsappNumber });
    if (existing) {
      return res.status(400).send({ message: "Participant with this WhatsApp number already registered." });
    }

    // Create participant
    const participant = await GitaSessionParticipant.create({
      name,
      whatsappNumber,
      age,
      collegeOrWorking,
      place,
      selectedBook,
      interestedInGitaSession
    });
      console.log(process.env.TWILIO_WHATSAPP_FROM);
      console.log(process.env.TWILIO_ACCOUNT_SID);
      console.log(process.env.TWILIO_AUTH_TOKEN);
    // Send WhatsApp confirmation
    await client.messages.create({
      body: `Namaste ${name}! 🙏\nYou have successfully registered for the Gita Session.\nBook: ${selectedBook || 'N/A'}\nLocation: ${place || 'N/A'}\nThank you for your interest! 🌼`,
      from: fromWhatsApp,
      to: `whatsapp:${whatsappNumber}`
    });

    return res.status(200).send({
      message: "Participant registered and WhatsApp confirmation sent.",
      data: participant
    });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send({ message: "Error during registration", error });
  }
};
const registerEvent=async (req, res) => {
  try {
    const { title, eventDate, link } = req.body;

    if (!title || !eventDate || !link) {
      return res.status(400).send({ message: "Please provide title, eventDate, and link." });
    }

    // Create the event
    const event = await Event.create({
      title,
      eventDate: new Date(eventDate), // ensure Date object
      link
    });

    // Find all interested users
    const interestedUsers = await GitaSessionParticipant.find({ interestedInGitaSession: true });

    // Send WhatsApp message to all interested users
    for (const user of interestedUsers) {
      if (!user.whatsappNumber) continue;

      const messageBody = `Namaste ${user.name}! 🙏

A new event "${event.title}" has been scheduled for ${event.eventDate.toUTCString()}.

Join here: ${event.link}

Looking forward to your participation! 🌼`;

      try {
        await client.messages.create({
          body: messageBody,
          from: fromWhatsApp,
          to: `whatsapp:${user.whatsappNumber}`
        });
        console.log(`Message sent to ${user.name} (${user.whatsappNumber})`);
      } catch (twilioError) {
        console.error(`Failed to send to ${user.whatsappNumber}:`, twilioError.message);
      }
    }

    return res.status(201).send({ message: "Event registered and messages sent.", event });
  } catch (error) {
    console.error("Error registering event:", error);
    return res.status(500).send({ message: "Failed to register event.", error });
  }
};


module.exports = {register,registerEvent};
