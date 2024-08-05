const mongoose = require('mongoose');

const festivalsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    watsAppNumber: { type: Number, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    collageOrCompany: { type: String, required: true },
    BranchOfYear: { type: String, required: false },
    attendance: [
        {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref:"admin_festival" },
            status: { type: Boolean, required: true, default:false }
        }
    ],

    eventId:{type:mongoose.Schema.Types.ObjectId,ref:"admin_festival",required: true}
    
}, {
    versionKey: false,
    timestamps: true
});


const festivalsModel =  mongoose.model("festival", festivalsSchema);

module.exports = festivalsModel