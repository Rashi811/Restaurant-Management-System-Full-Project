const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/MenuRoute");
const inventoryRouter = require("./Route/InventoryRoute");  // Ensure the path is correct
const path = require("path");
const cors = require("cors");



const app = express();

// Serve static files from the 'uploads' directory (e.g., images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Inventory routes




app.use(express.json()); 
app.use(cors());

const staffRouter = require('./Route/staffMembers');
const reportRoutes = require('./Route/reportRoutes');
const attendanceRoutes = require('./Route/attendanceRoutes');
const performanceRoutes = require('./Route/performanceRoutes');
const trainingRoutes = require('./Route/training'); 
const feedbackRoutes = require('./Route/feedback');
const scheduleRoutes = require('./Route/schedule');
const feedbackRouter = require("./Route/FeedbackRoutes");
const authRoutes = require('./Route/auth.route.js');
const Items = require('./Route/items.route.js');
const tableRouter = require('./Route/tables.js');
const routes = require("./Route/events");
const bookingroutes = require("./Route/bookings");
const routerProfile = require("./Route/profiles");




app.use('/staff', staffRouter); 
app.use('/api/reports', reportRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/performance', performanceRoutes);
app.use('/api/training', trainingRoutes); 
app.use('/api/feedback', feedbackRoutes);
app.use('/api/schedule', scheduleRoutes);
app.use("/feedbacks", feedbackRouter);
app.use("/menus", router);
app.use('/api/auth', authRoutes);
app.use('/api/items', Items);
app.use("/inventories", inventoryRouter);
app.use("/tables",tableRouter);
app.use("/api/events", routes);
app.use("/api/bookings", bookingroutes);
app.use("/api/profile", routerProfile);


mongoose.connect("mongodb+srv://admin:hNcnrxeigFUbXbEZ@cluster0.kqbj6.mongodb.net/")
    .then(() => console.log("Connected to MongoDB"))
    .then(() => {
        app.listen(5000, () => console.log());
    })
    .catch((err) => console.log(err));


// PDF email sending route
app.post("/send-pdf", async (req, res) => {
    const { base64, email } = req.body;
  
    // Configure the email transport using Nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail", // or another email service
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password", // Consider using environment variables for security
      },
    });
  
    // Create the email options
    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Feedback Table PDF",
      text: "Please find attached the feedback table PDF.",
      attachments: [
        {
          filename: "feedback_table.pdf",
          content: base64,
          encoding: "base64",
        },
      ],
    };
  
    // Send the email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).send("Error sending email");
    }
  });
