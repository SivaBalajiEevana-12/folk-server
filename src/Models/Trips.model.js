const mongoose = require('mongoose');

const tripsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    watsAppNumber: { type: Number, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    collageOrCompany: { type: String, required: true },
    BranchOfYear: { type: String, required: false },
    attendance: [
        {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref:"admin_trips" },
            status: { type: Boolean, required: true, default:false }
        }
    ],
    eventId:{type:mongoose.Schema.Types.ObjectId, required: true,ref:"admin_trips"}
}, {
    versionKey: false,
    timestamps: true
});



const tripsModel =  mongoose.model("trip", tripsSchema);

module.exports = tripsModel