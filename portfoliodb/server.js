const express = require("express");
const cors = require("cors");
// const { MongoClient } = require("mongodb");
const { MongoClient, ObjectId } = require("mongodb");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const dns = require("dns");

dns.setServers(['8.8.8.8','8.8.4.4'])


const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", router);


// Multer Storage

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        const uniqueName = Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

const upload = multer({
    storage,
});

const withDB = async (operation, res) => {
    try {

        const client = await MongoClient.connect("mongodb+srv://aakashraawat365_db_user:mkFVEVwu5GZzr2h0@cluster0.q18wivf.mongodb.net/portfolio?retryWrites=true&w=majority")
        // const client = await MongoClient.connect("mongodb://localhost:27017");

        const db = client.db("portfolio");

        await operation(db);

        client.close();
``
    } catch (error) {
        res.status(500).json({
            message: "Database Connection Error",
            error,
        });
    }
};

router.post("/login", async (req, res) => {

    console.log(req.body);

    res.json({
        success:true,
        message:"Login working"
    });

});

//project
app.get("/api/projects", (req, res) => {

    withDB(async (db) => {

        const projects = await db.collection("projects").find().toArray();

        res.status(200).json(projects);

    }, res);

});

app.post("/api/projects", upload.single("image"), (req, res) => {

    withDB(async (db) => {

        const newProject = {
            title: req.body.title,
            tech: req.body.tech,
            description: req.body.description,
            github: req.body.github,
            image: req.file ? req.file.filename : "",
        };

        await db.collection("projects").insertOne(newProject);

        res.status(201).json({
            message: "Project Added Successfully",
        });

    }, res);

});

// Delete Project
app.delete("/api/projects/:id", (req, res) => {

    withDB(async (db) => {

        await db.collection("projects").deleteOne({
            _id: new ObjectId(req.params.id),
        });

        res.status(200).json({
            message: "Project Deleted Successfully",
        });

    }, res);

});

// Update Project
app.put("/api/projects/:id", (req, res) => {

    console.log("PUT API HIT");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);

    withDB(async (db) => {

        await db.collection("projects").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    title: req.body.title,
                    tech: req.body.tech,
                    description: req.body.description,
                    github: req.body.github,
                    // live: req.body.live,
                },
            }
        );

        res.status(200).json({
            message: "Project Updated Successfully",
        });

    }, res);

});

// Get Single Project
app.get("/api/projects/:id", (req, res) => {

    withDB(async (db) => {

        const project = await db.collection("projects").findOne({
            _id: new ObjectId(req.params.id),
        });

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found",
            });
        }

        res.status(200).json(project);

    }, res);

});


// ================= ABOUT API =================

// Get About
app.get("/api/about", (req, res) => {
    withDB(async (db) => {

        const about = await db.collection("about").findOne({});

        res.status(200).json(about || {});

    }, res);
});

// Add / Update About
app.post("/api/about", (req, res) => {

    withDB(async (db) => {

        const existing = await db.collection("about").findOne({});

        const aboutData = {
            heading: req.body.heading,
            description: req.body.description,
        };

        if (existing) {

            await db.collection("about").updateOne(
                { _id: existing._id },
                { $set: aboutData }
            );

            res.status(200).json({
                message: "About Updated Successfully",
            });

        } else {

            await db.collection("about").insertOne(aboutData);

            res.status(201).json({
                message: "About Added Successfully",
            });

        }

    }, res);

});

// ================= CONTACT API =================

// Add Contact Message
app.post("/api/contact", (req, res) => {

    withDB(async (db) => {

        const contact = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            createdAt: new Date(),
        };

        await db.collection("contacts").insertOne(contact);

        res.status(201).json({
            message: "Message Sent Successfully",
        });

    }, res);

});

// Get All Contact Messages
app.get("/api/contact", (req, res) => {

    withDB(async (db) => {

        const contacts = await db
            .collection("contacts")
            .find()
            .sort({ createdAt: -1 })
            .toArray();

        res.status(200).json(contacts);

    }, res);

});

// Delete Contact Message
app.delete("/api/contact/:id", (req, res) => {

    withDB(async (db) => {

        await db.collection("contacts").deleteOne({
            _id: new ObjectId(req.params.id),
        });

        res.status(200).json({
            message: "Message Deleted Successfully",
        });

    }, res);

});


//skills
app.get("/api/skills", (req, res) => {

    withDB(async (db) => {

        const skills = await db.collection("skills").find().toArray();

        res.status(200).json(skills);

    }, res);

});

app.post("/api/skills", (req, res) => {

    withDB(async (db) => {

        await db.collection("skills").insertOne(req.body);

        res.status(201).json({
            message: "Skill Added Successfully",
        });

    }, res);

});

app.put("/api/skills/:id", (req, res) => {

    withDB(async (db) => {

        await db.collection("skills").updateOne(
            {
                _id: new ObjectId(req.params.id),
            },
            {
                $set: {
                    name: req.body.name,
                    percentage: req.body.percentage,
                },
            }
        );

        res.status(200).json({
            message: "Skill Updated Successfully",
        });

    }, res);

});

app.delete("/api/skills/:id", (req, res) => {

    withDB(async (db) => {

        await db.collection("skills").deleteOne({
            _id: new ObjectId(req.params.id),
        });

        res.status(200).json({
            message: "Skill Deleted Successfully",
        });

    }, res);

});

// ================= ABOUT =================

// Get About
app.get("/api/about", (req, res) => {

    withDB(async (db) => {

        const about = await db.collection("about").findOne();

        res.status(200).json(about);

    }, res);

});

// Update About

app.put("/api/about/:id", (req, res) => {

    withDB(async (db) => {

        await db.collection("about").updateOne(

            {
                _id: new ObjectId(req.params.id)
            },

            {
                $set: {
                    name: req.body.name,
                    title: req.body.title,
                    description: req.body.description,
                    experience: req.body.experience,
                    email: req.body.email,
                    location: req.body.location
                }
            }

        );

        res.status(200).json({
            message: "About Updated Successfully"
        });

    }, res);

});

//teams
// Get All Team Members
app.get("/api/team", (req, res) => {

    withDB(async (db) => {

        const members = await db.collection("teams").find().toArray();

        res.status(200).json(members);

    }, res);

});

app.post("/api/team", upload.single("image"), (req, res) => {

    withDB(async (db) => {

        const member = {
            name: req.body.name,
            role: req.body.role,
            description: req.body.description,
            github: req.body.github,
            linkedin: req.body.linkedin,
            image: req.file ? req.file.filename : "",
        };

        await db.collection("teams").insertOne(member);

        res.status(201).json({
            message: "Member Added Successfully",
        });

    }, res);

});

app.delete("/api/team/:id", (req, res) => {

    withDB(async (db) => {

        await db.collection("teams").deleteOne({
            _id: new ObjectId(req.params.id),
        });

        res.status(200).json({
            message: "Member Deleted Successfully",
        });

    }, res);

});

app.put("/api/team/:id", upload.single("image"), (req, res) => {

    withDB(async (db) => {

        const updateData = {
            name: req.body.name,
            role: req.body.role,
            description: req.body.description,
            github: req.body.github,
            linkedin: req.body.linkedin,
        };

        if (req.file) {
            updateData.image = req.file.filename;
        }

        await db.collection("teams").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: updateData,
            }
        );

        res.status(200).json({
            message: "Member Updated Successfully",
        });

    }, res);

});
//contact
app.post("/api/contact", (req, res) => {

    withDB(async (db) => {

        await db.collection("contacts").insertOne(req.body);

        res.status(201).json({
            message: "Contact Saved Successfully"
        });

    }, res);

});

// ================= DASHBOARD API =================

app.get("/api/dashboard", (req, res) => {

    withDB(async (db) => {

        const totalProjects = await db.collection("projects").countDocuments();
        const totalSkills = await db.collection("skills").countDocuments();
        const totalTeam = await db.collection("teams").countDocuments();
        const totalMessages = await db.collection("contacts").countDocuments();

        const recentMessages = await db
            .collection("contacts")
            .find()
            .sort({ createdAt: -1 })
            .limit(5)
            .toArray();

        res.status(200).json({
            totalProjects,
            totalSkills,
            totalTeam,
            totalMessages,
            recentMessages,
        });

    }, res);

});

app.listen(5000, () => {
    console.log("Server Running on Port 5000");
});