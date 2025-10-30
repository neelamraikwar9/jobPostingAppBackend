const mongoose = require("mongoose");


const jobSchema = new mongoose.Schema({
    title: {
        type: String
    },

     companyName: {
        type: String
    },

     location : {
        type: String
    },

     salary : {
        type: Number
    },

    jobType : {
        type: String,
        enum: ["Full-time (On-site)", "Part-time (On-site)", "Full-time (Remote)", "Part-time (Remote)"]
    },

    jobDescription : {
        type: String
    },

    qualifications: {
        type: String,
        required : [true, "Qualifications source is required."]
    },
})

module.exports = mongoose.model("Job", jobSchema);