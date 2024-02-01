// Import necessary modules and setup Express app
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");
const Habit = require("../../models/Habit");
const User = require("../../models/User");
// const { user, pass } = require("../../config/keys");

router.post("/", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Function to send welcome email to new user
    const sendWelcomeEmail = async (userEmail) => {
      const welcomeEmailContent = `
        <h1>Welcome to HabitTree!</h1>
        <p>Thank you for signing up with us. We're excited to help you build good habits!</p>
        <p>Stay tuned for your weekly habit reminders every Sunday at 9:00 AM.</p>
        <p>Keep up the good work!</p>
      `;

      await transporter.sendMail({
        from: process.env.EMAIL_USERNAME,
        to: userEmail,
        subject: "Welcome to HabitTree!",
        html: welcomeEmailContent,
      });

      console.log("Welcome email sent successfully to:", userEmail);
    };

    const user = await User.findOne({ email: req.body.email });

    // Check if the user exists
    if (!user) {
      // User not found, send welcome email and save the user
      await sendWelcomeEmail(req.body.email);
      await User.create({ email: req.body.email });
    }

    const users = await User.find();

    // Schedule the reminder to be sent every Sunday at 9:00 AM
    const weeklyReminder = schedule.scheduleJob("0 9 * * 0", async () => {
      try {
        const habits = await Habit.find();

        // Construct email content for weekly reminder
        const emailContent = `
          <h1>Your Weekly Habit Reminder</h1>
          <p>Here are your habits for this week:</p>
          <ul>
            ${habits
              .map(
                (habit) =>
                  `<li>${habit.name} - Achieved: ${habit.achieved}</li>`
              )
              .join("")}
          </ul>
          <p>Keep up the good work!</p>
        `;

        // Send reminder email to each user
        for (const user of users) {
          await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: "Weekly Habit Reminder",
            html: emailContent,
          });
          console.log(user.email);
        }

        console.log("Reminder emails sent successfully");
      } catch (error) {
        console.error("Error sending reminder emails:", error);
      }
    });

    // Send a success response
    res.status(200).json({ message: "Reminder emails scheduled successfully" });
  } catch (error) {
    console.error("Error scheduling reminder emails:", error);
    // Send an error response
    res.status(500).json({ error: "Failed to schedule reminder emails" });
  }
});

// Export the router to use in your main server file (app.js or index.js)
module.exports = router;
