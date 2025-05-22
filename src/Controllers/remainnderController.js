const twilio = require("twilio");
const Event = require("../Models/Event");
const Session =require("../Models/Admin.Session.model")
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID ;
const authToken = process.env.TWILIO_AUTH_TOKEN ;
const client = twilio(accountSid, authToken);
// const fromWhatsApp = 'whatsapp:+14155238886';
const fromWhatsApp = process.env.TWILIO_WHATSAPP_FROM;

const sendEventReminders = async (req, res) => {
  console.log("Sending event reminders...");
  try {
    const now = new Date(); // UTC time

    // Times to check reminders for (in ms)
    const oneDayBeforeMs = 24 * 60 * 60 * 1000;
    const oneHourBeforeMs = 60 * 60 * 1000;
    const fiveMinutesBeforeMs = 5 * 60 * 1000;

    // Find events where eventDate is:
    // 1) Equal to now (approximate for "event just created")
    // 2) 1 day minus 1 hour before eventDate (23 hours before event)
    // 3) 5 minutes before eventDate

    // To allow some leeway in matching time windows, we use a small interval (e.g. 1 min)
    const timeWindowMs = 60 * 1000; // 1 minute window

    const upcomingEvents = await Event.find({
      eventDate: {
        $gte: new Date(now.getTime() - timeWindowMs), // allow for slight delay
        $lte: new Date(now.getTime() + timeWindowMs)
      }
    });

    // Find events 23 hours before event (1 day minus 1 hour)
    const oneDayMinusOneHourEvents = await Event.find({
      eventDate: {
        $gte: new Date(now.getTime() + oneDayBeforeMs - oneHourBeforeMs - timeWindowMs),
        $lte: new Date(now.getTime() + oneDayBeforeMs - oneHourBeforeMs + timeWindowMs)
      }
    });

    // Find events 5 minutes before eventDate
    const fiveMinutesBeforeEvents = await Event.find({
      eventDate: {
        $gte: new Date(now.getTime() + fiveMinutesBeforeMs - timeWindowMs),
        $lte: new Date(now.getTime() + fiveMinutesBeforeMs + timeWindowMs)
      }
    });

    // Merge all events to send reminders for (avoid duplicates)
    const eventsToRemind = [
      ...upcomingEvents,
      ...oneDayMinusOneHourEvents,
      ...fiveMinutesBeforeEvents
    ];

    // Deduplicate events by id
    const uniqueEvents = eventsToRemind.reduce((acc, event) => {
      if (!acc.some(e => e._id.equals(event._id))) acc.push(event);
      return acc;
    }, []);

    // Now send reminders
    const interestedUsers = await Session.find({ interestedInGitaSession: true });
    const interestedNumbers = new Set(interestedUsers.map(u => u.whatsappNumber));

    for (const event of uniqueEvents) {
      const diffMs = event.eventDate - now;
      const diffMinutes = Math.round(diffMs / 60000);

      // Determine reminder type for logging
      let reminderType = "Unknown";
      if (Math.abs(diffMs) < timeWindowMs) reminderType = "Event Created";
      else if (Math.abs(diffMs - (oneDayBeforeMs - oneHourBeforeMs)) < timeWindowMs) reminderType = "1 Day Before - 1 Hour";
      else if (Math.abs(diffMs - fiveMinutesBeforeMs) < timeWindowMs) reminderType = "5 Minutes Before";

      for (const user of event.registeredUsers) {
        if (!user.phone || !interestedNumbers.has(user.phone)) continue;

        const messageBody = `Hi ${user.name}, 👋

Reminder (${reminderType}): Your event "${event.title}" is coming up in ${diffMinutes} minute(s)! 🗓️

🔗 Join here: ${event.link}`;

        try {
          const response = await client.messages.create({
            body: messageBody,
            from: fromWhatsApp,
            to: `whatsapp:${user.phone}`
          });
          console.log(`✅ [${reminderType}] Reminder sent to ${user.name}: SID ${response.sid}`);
        } catch (err) {
          console.error(`❌ Error sending to ${user.phone}:`, err.message);
        }
      }
    }

    if (res) res.status(200).send({ message: "Reminders processed." });
  } catch (error) {
    console.error("Reminder error:", error);
    if (res) res.status(500).send({ error: "Reminder failed." });
  }
};
module.exports = { sendEventReminders };