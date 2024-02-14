import { useState, useEffect } from "react";
import jwtFetch from "../../store/jwt";
import "./email.css";

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

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      sendReminderEmail();
    } else {
      setReminderSent(false);
    }
  };

  return (
    <div className="emailReminder">
      <label>
        <input
          type="checkbox"
          checked={reminderSent}
          onChange={handleCheckboxChange}
          className="reminderCheckbox"
        />
        {reminderSent ? "Email Reminder Sent" : "Receive Email Reminders"}
      </label>
    </div>
  );
};

export default ReminderButton;
