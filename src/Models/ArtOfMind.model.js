const mongoose = require('mongoose');

const artOfMindControlSchema = new mongoose.Schema({
    name: { type: String, required: true },
    watsAppNumber: { type: Number, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    collageOrCompany: { type: String, required: true },
    BranchOfYear: { type: String, required: false },
    attendance: [
        {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref:"admin_mindControl" },
            status: { type: Boolean, required: true, default:false }
        }
    ],
    eventId:{type:mongoose.Schema.Types.ObjectId, required: true,ref:"admin_mindControl"}
}, {
    versionKey: false,
    timestamps: true
});


const artOfMindControlModel =  mongoose.model("art", artOfMindControlSchema);

module.exports = artOfMindControlModel