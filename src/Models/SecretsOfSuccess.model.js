const mongoose = require('mongoose');

const secretsOfSuccessSchema = new mongoose.Schema({
    name: { type: String, required: true },
    watsAppNumber: { type: Number, required: true },
    email: { type: String, required: true },
    age: { type: Number, required: true },
    collageOrCompany: { type: String, required: true },
    BranchOfYear: { type: String, required: false },
    attendance: [
        {
            eventId: { type: mongoose.Schema.Types.ObjectId, ref:"admin_secretSuccess",required: true },
            status: { type: Boolean, required: true, default:false }
        }
    ],
    eventId:{type:mongoose.Schema.Types.ObjectId, required: true,ref:"admin_secretSuccess"}
}, {
    versionKey: false,
    timestamps: true
});


const secretsOfSuccessModel =  mongoose.model("secret", secretsOfSuccessSchema);

module.exports = secretsOfSuccessModel