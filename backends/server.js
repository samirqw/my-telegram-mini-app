require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

const lessonSchema = new mongoose.Schema({
  title: String,
  pdfLesson: String,
  pdfExercise: String,
  pdfSolution: String
}, { timestamps: true });
const ticketSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
}, { timestamps: true });

const Lesson = mongoose.model("Lesson", lessonSchema);
const Ticket = mongoose.model("Ticket", ticketSchema);

app.get("/api/lessons", async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: 1 });
    res.json(lessons);
  } catch {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/tickets", async (req, res) => {
  try {
    await new Ticket(req.body).save();
    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));