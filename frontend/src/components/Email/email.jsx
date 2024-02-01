import { useState } from "react";
import jwtFetch from "../../store/jwt"; // Assuming jwtFetch.js is in the same directory

const ReminderButton = ({ userEmail }) => {
  // Pass userEmail as a prop
  const [reminderSent, setReminderSent] = useState(false);

  const sendReminderEmail = async () => {
    try {
      const res = await jwtFetch("/api/send-reminder", {
        method: "POST",
        body: JSON.stringify({ email: userEmail }), // Include userEmail in the request body
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Reminder email sent:", res);
    } catch (error) {
      console.error("Error sending reminder email:", error);
    }
    setReminderSent(true);
  };

  return (
    <div>
      <button onClick={sendReminderEmail} className="reminderBtn">
        {reminderSent ? "Email Reminder Sent" : "Send Email Reminder"}
      </button>
    </div>
  );
};

export default ReminderButton;
