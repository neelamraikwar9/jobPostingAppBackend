const { initializeDB } = require("./db.connect");
const Job = require("./Job.model");
const express = require("express");
const app = express();
const cors = require("cors");
// const fs = require("fs");

app.use(cors());


app.use(express.json());

const corsOptions = {
    origin: "*",
    Credential: 'true',
};

initializeDB();


// const jsonData = fs.readFileSync("./job.json", "utf-8");
// const jobs = JSON.parse(jsonData);

// function seedData(){
//     try{
//         for(const job of jobs ){
//             const newJob = new Job ({
//                 title: job.title,
//                 companyName: job.companyName,
//                 location: job.location,
//                 salary: job.salary,
//                 jobType: job.jobType,
//                 jobDescription: job.jobDescription,
//                 qualifications: job.qualifications
//             });
//             console.log(newJob.title);
//             newJob.save();
//         }
//     } catch(error){
//         console.log("Error in seeding data", error);
//     }
// }

// // seedData();



//api to get all jobs;
const getAllJobs = async () => {
    try{
        const allJobs = await Job.find();
        console.log(allJobs, "Getting all jobs")
        return allJobs;
    } catch(error){
        console.log(error, "Error to get jobs.")
    }
}

// getAllJobs();



app.get("/jobs", async(req, res) => {
    try{
        const allJob = await getAllJobs();
        if(allJob){
            res.json(allJob);
        } else{
            res.status(404).json({error: "Jobs not found."});
        }

    } catch(error){
        res.status(500).json({error: "Failed to fetch Jobs."})
    }
})


//api to get jobs by id;

async function getJobsById(jobId){
    try{
        const jobsById = await Job.findById(jobId);
        console.log(jobsById, "jobsById")
        return jobsById;
    } catch(error){
       throw error;
    }
}

// getJobsById("69030fd2ebdad79f48d22c55");

app.get("/jobs/:jobId", async (req, res) => {
    try{
        const jobId = await getJobsById(req.params.jobId);
        console.log(jobId);
        if(jobId){
            res.json(jobId);
        } else{
            res.status(404).json({error: "Job by Id not found."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to fetch Job by Id."})
    }
})


//api to post  jobs;
// const newJob = {
//     title: "Software Engineer",
//     companyName: "Trendex Solutions",
//     location: "Bangalore, India",
//     salary: 1600000,
//     jobType: "Full-time (On-site)",
//     jobDescription: "Design, develop, and maintain web applications. Collaborate with cross-functional teams to deliver high-quality products.",
//     qualifications: "B.Tech in Computer Science, 2+ years experience with React and Node.js"
//   }

  async function addNewJob(newJob){
    try{
        const job = new Job(newJob);
        const savedJob = await job.save();
        console.log (savedJob, "saved job");
        return savedJob;
    } catch(error){
        throw error;
    }
  };

//   addNewJob();



app.post("/jobs", async(req, res) => {
    try{
        const newJob = req.body;
        const newJobb = await  addNewJob(newJob);
        console.log(newJobb);

        res.status(201).json({ message: "Job added successfully.", job: newJobb });
    } catch(error){
        res.status(500).json({error: 'Failed to add a Job.'});
    }
})

//api to delete job by Id;

async function deleteJob(jobID){
    try{
    const jobDelete = await Job.findByIdAndDelete(jobID);
    console.log(jobDelete, "jobDelete")
    return jobDelete;
    } catch(error){
        throw error;
    }
}
// deleteJob("69035c51a7c0bfc632340939");

app.delete("/jobs/delete/:jobID", async(req, res) => {
    try{
        const deleteJobs = deleteJob(req.params.jobID);
        console.log(deleteJobs);

        if(deleteJobs){
            res.status(200).json({message: "Job deleted successfully."})
        }
    } catch(error){
        res.status(500).json({error: "Failed to delete a Job."})
    }
} );











const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
});






