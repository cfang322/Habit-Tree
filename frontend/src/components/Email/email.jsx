import { useState, useEffect } from "react";
import jwtFetch from "../../store/jwt";

const ReminderButton = ({ userEmail }) => {
  const [reminderSent, setReminderSent] = useState(
    localStorage.getItem("reminderSent") === "true" ? true : false
  );

  useEffect(() => {
    localStorage.setItem("reminderSent", reminderSent);
  }, [reminderSent]);

  const sendReminderEmail = async () => {
    try {
      const res = await jwtFetch("/api/send-reminder", {
        method: "POST",
        body: JSON.stringify({ email: userEmail }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Reminder email sent:", res);
      setReminderSent(true);
    } catch (error) {
      console.error("Error sending reminder email:", error);
    }
  };

  const handleButtonClick = () => {
    if (!reminderSent) {
      sendReminderEmail();
    } else {
      setReminderSent(false);
    }
  };

  return (
    <div>
      <button onClick={handleButtonClick} className="reminderBtn">
        {reminderSent ? "Email Reminder Sent" : "Send Email Reminder"}
      </button>
    </div>
  );
};

export default ReminderButton;
