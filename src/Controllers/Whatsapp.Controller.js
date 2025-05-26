const twilio = require('twilio');
// const bcrypt = require('bcryptjs');
const GitaSessionParticipant = require('../Models/Admin.Session.model'); 
const Event = require('../Models/Event'); // adjust path as needed
// const AdminSessionModel = require('../Models/Admin.Session.model');
// adjust path as needed
require('dotenv').config();
const axios = require('axios');
const gupshup = require('@api/gupshup');
// const accountSid = process.env.TWILIO_ACCOUNT_SID ;
// const authToken = process.env.TWILIO_AUTH_TOKEN ;
// const fromWhatsApp = process.env.TWILIO_WHATSAPP_FROM; // Default Twilio WhatsApp number

// const client = twilio(accountSid, authToken);

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

    if (!name || !whatsappNumber || interestedInGitaSession === undefined) {
      return res.status(400).send({
        message: "Please fill required fields: name, WhatsApp number, and interest status."
      });
    }

    // Normalize WhatsApp number
    let normalizedNumber = whatsappNumber.trim();
    if (!normalizedNumber.startsWith('+')) {
      normalizedNumber = '91' + normalizedNumber;
    }

    // Upsert participant
    const participant = await GitaSessionParticipant.findOneAndUpdate(
      { whatsappNumber: normalizedNumber },
      {
        $set: {
          name,
          age,
          collegeOrWorking,
          place,
          selectedBook,
          interestedInGitaSession
        }
      },
      { upsert: true, new: true }
    );

    gupshup.sendingTextTemplate({
    template: {
      id: 'f69893f8-f84f-4c37-a744-c8f6713afce5',
      //f69893f8-f84f-4c37-a744-c8f6713afce5
      params: [name, selectedBook]
    },
    'src.name': 'Production',  // Replace with actual App Name (not App ID)
    destination: normalizedNumber,
    source: '917075176108',//917075176108
    postbackTexts: [
      { index: 1, text: 'hello siva' }
    ]
  }, {
    apikey: 'sk_d61d1bbf56704cdaa405046340c15fa3'
  })
  .then(({ data }) => {
    console.log(data);
    res.status(200).send({ message: "Event registered successfully", data });
  })
  .catch(err => {
    console.error(err.response?.data || err);
    res.status(500).send({ message: "Failed to register event", error: err.message });
  });

    // Add contact to WANI Notifier
  //   const waninotifierApiKey = process.env.NUMBER_URL;
  //   const waninotifierUrl = `https://app.wanotifier.com/api/v1/contacts/?key=${waninotifierApiKey}`;
    
  //   const waninotifierPayload = {
  //     whatsapp_number: normalizedNumber,
  //     first_name: name.split(' ')[0] || name,
  //     last_name: name.split(' ').slice(1).join(' ') || '',
  //     attributes: {
  //       age: age || '',
  //       collegeOrWorking: collegeOrWorking || '',
  //       place: place || '',
  //       selectedBook: selectedBook || '',
  //       interestedInGitaSession: interestedInGitaSession ? 'Yes' : 'No',
  //     },
  //     lists: ['Default'],
  //     tags: ['gita-session-participant'],
  //     status: 'subscribed',
  //     replace: true
  //   };

  //   try {
  //     const res1 = await axios.post(waninotifierUrl, waninotifierPayload, {
  //       headers: { 'Content-Type': 'application/json' }
  //     });
  //     console.log("Contact added/updated on WANotifier:", res1.data);
  //   } catch (error) {
  //     console.error("WANotifier contact error:", error.response?.data || error.message);
  //   }

  //   // Optional: Wait a short delay before sending message
  //   await new Promise(resolve => setTimeout(resolve, 3000)); // wait 3 seconds

  //   // ✅ Send message via WANI Notifier
  //   const templateId = process.env.WANI_TEMPLATE_ID;
  //   const messageUrl = `https://app.wanotifier.com/api/v1/notifications/${templateId}?key=${waninotifierApiKey}`;

  //   const messagePayload = {
  //     data: {
  //       body_variables: [name, selectedBook] // must match the template exactly
  //     },
  //     recipients: [
  //       {
  //         whatsapp_number: normalizedNumber
  //       }
  //     ]
  //   };

  //   try {
  //     const result2 = await axios.post(messageUrl, messagePayload, {
  //       headers: { 'Content-Type': 'application/json' }
  //     });
  //     console.log("Message sent via WANotifier:", result2.data);
  //   } catch (err) {
  //     console.error("Failed to send WhatsApp message via WANotifier:", err.response?.data || err.message);
  //   }

  //   return res.status(200).send({
  //     message: "Participant registered, contact updated, and message sent.",
  //     data: participant
  //   });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send({
      message: "Error during registration",
      error: error.message
    });
  }
// };
}




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

const RegisterEvent = async (req, res) => {
  gupshup.sendingTextTemplate({
    template: {
      id: '1418406565834103',
      params: ['siva', 'geetha']
    },
    'src.name': '4KoeJVChI420QyWVhAW1kE7L',  // Replace with actual App Name (not App ID)
    destination: '919392952946',
    source: '917075176108',
    postbackTexts: [
      { index: 1, text: 'hello siva' }
    ]
  }, {
    apikey: 'zbut4tsg1ouor2jks4umy1d92salxm38'
  })
  .then(({ data }) => {
    console.log(data);
    res.status(200).send({ message: "Event registered successfully", data });
  })
  .catch(err => {
    console.error(err.response?.data || err);
    res.status(500).send({ message: "Failed to register event", error: err.message });
  });
};





module.exports = {register,registerEvent,RegisterEvent};
