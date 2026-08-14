require("dotenv").config(); // Environment variables load karne ke liye
const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const multer = require("multer");
const path = require("path");

const router = express.Router();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", router);

// Multer Storage Setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// MongoDB Connection String (Fallback to your URL if ENV variable is not set)
const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://aakashraawat365_db_user:mkFVEVwu5GZzr2h0@cluster0.q18wivf.mongodb.net/portfolio?retryWrites=true&w=majority";

// Optimized withDB function
const withDB = async (operation, res) => {
    let client;
    try {
        client = await MongoClient.connect(MONGO_URI);
        const db = client.db("portfolio");
        await operation(db);
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({
            message: "Database Connection Error",
            error: error.message || error,
        });
    } finally {
        if (client) {
            await client.close();
        }
    }
};

// Admin Routes
router.post("/login", async (req, res) => {
    console.log(req.body);
    res.json({
        success: true,
        message: "Login working"
    });
});

// ================= PROJECTS API =================
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
        res.status(201).json({ message: "Project Added Successfully" });
    }, res);
});

app.delete("/api/projects/:id", (req, res) => {
    withDB(async (db) => {
        await db.collection("projects").deleteOne({ _id: new ObjectId(req.params.id) });
        res.status(200).json({ message: "Project Deleted Successfully" });
    }, res);
});

app.put("/api/projects/:id", (req, res) => {
    withDB(async (db) => {
        await db.collection("projects").updateOne(
            { _id: new ObjectId(req.params.id) },
            {
                $set: {
                    title: req.body.title,
                    tech: req.body.tech,
                    description: req.body.description,
                    github: req.body.github,
                },
            }
        );
        res.status(200).json({ message: "Project Updated Successfully" });
    }, res);
});

app.get("/api/projects/:id", (req, res) => {
    withDB(async (db) => {
        const project = await db.collection("projects").findOne({ _id: new ObjectId(req.params.id) });
        if (!project) return res.status(404).json({ message: "Project Not Found" });
        res.status(200).json(project);
    }, res);
});

// ================= ABOUT API =================
app.get("/api/about", (req, res) => {
    withDB(async (db) => {
        const about = await db.collection("about").findOne({});
        res.status(200).json(about || {});
    }, res);
});

app.post("/api/about", (req, res) => {
    withDB(async (db) => {
        const existing = await db.collection("about").findOne({});
        const aboutData = {
            heading: req.body.heading,
            name: req.body.name,
            title: req.body.title,
            description: req.body.description,
            experience: req.body.experience,
            email: req.body.email,
            location: req.body.location
        };

        if (existing) {
            await db.collection("about").updateOne({ _id: existing._id }, { $set: aboutData });
            res.status(200).json({ message: "About Updated Successfully" });
        } else {
            await db.collection("about").insertOne(aboutData);
            res.status(201).json({ message: "About Added Successfully" });
        }
    }, res);
});

// ================= CONTACT API =================
app.post("/api/contact", (req, res) => {
    withDB(async (db) => {
        const contact = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            createdAt: new Date(),
        };
        await db.collection("contacts").insertOne(contact);
        res.status(201).json({ message: "Message Sent Successfully" });
    }, res);
});

app.get("/api/contact", (req, res) => {
    withDB(async (db) => {
        const contacts = await db.collection("contacts").find().sort({ createdAt: -1 }).toArray();
        res.status(200).json(contacts);
    }, res);
});

app.delete("/api/contact/:id", (req, res) => {
    withDB(async (db) => {
        await db.collection("contacts").deleteOne({ _id: new ObjectId(req.params.id) });
        res.status(200).json({ message: "Message Deleted Successfully" });
    }, res);
});

// ================= SKILLS API =================
app.get("/api/skills", (req, res) => {
    withDB(async (db) => {
        const skills = await db.collection("skills").find().toArray();
        res.status(200).json(skills);
    }, res);
});

app.post("/api/skills", (req, res) => {
    withDB(async (db) => {
        await db.collection("skills").insertOne(req.body);
        res.status(201).json({ message: "Skill Added Successfully" });
    }, res);
});

app.put("/api/skills/:id", (req, res) => {
    withDB(async (db) => {
        await db.collection("skills").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: { name: req.body.name, percentage: req.body.percentage } }
        );
        res.status(200).json({ message: "Skill Updated Successfully" });
    }, res);
});

app.delete("/api/skills/:id", (req, res) => {
    withDB(async (db) => {
        await db.collection("skills").deleteOne({ _id: new ObjectId(req.params.id) });
        res.status(200).json({ message: "Skill Deleted Successfully" });
    }, res);
});

// ================= TEAM API =================
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
        res.status(201).json({ message: "Member Added Successfully" });
    }, res);
});

app.delete("/api/team/:id", (req, res) => {
    withDB(async (db) => {
        await db.collection("teams").deleteOne({ _id: new ObjectId(req.params.id) });
        res.status(200).json({ message: "Member Deleted Successfully" });
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
            { $set: updateData }
        );
        res.status(200).json({ message: "Member Updated Successfully" });
    }, res);
});

// ================= DASHBOARD API =================
app.get("/api/dashboard", (req, res) => {
    withDB(async (db) => {
        const totalProjects = await db.collection("projects").countDocuments();
        const totalSkills = await db.collection("skills").countDocuments();
        const totalTeam = await db.collection("teams").countDocuments();
        const totalMessages = await db.collection("contacts").countDocuments();

        const recentMessages = await db.collection("contacts").find().sort({ createdAt: -1 }).limit(5).toArray();

        res.status(200).json({
            totalProjects,
            totalSkills,
            totalTeam,
            totalMessages,
            recentMessages,
        });
    }, res);
});

// Server Listening
app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
