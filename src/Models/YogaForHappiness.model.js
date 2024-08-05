const mongoose = require('mongoose');

const YogaForHappinessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    watsAppNumber: { type: Number, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    collageOrCompany: { type: String, required: true },
    BranchOfYear: { type: String, required: false },
    attendance: [
        {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref:"admin_yoga", required: true },
            status: { type: Boolean, required: true, default:false }
        }
    ],
    eventId:{type:mongoose.Schema.Types.ObjectId, required: true,ref:"admin_yoga"}
}, {
    versionKey: false,
    timestamps: true
});


const YogaForHappinessModel =  mongoose.model("yoga", YogaForHappinessSchema);

module.exports = YogaForHappinessModel