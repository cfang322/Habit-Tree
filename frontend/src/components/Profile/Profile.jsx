// Profile.js

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReminderButton from "../Email/email";
import "./Profile.css";
import NavBar from "../NavBar/NavBar";
import setting from "../../assets/images/setting.png";

const Profile = () => {
  const userEmail = useSelector((state) => state.session.user.email);
  const user = useSelector((state) => state.session.user);
  const [showSettings, setShowSettings] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(() => {
    return localStorage.getItem(`profilePictureURL_${userEmail}`) || "";
  });

  useEffect(() => {
    if (profilePicture) {
      const url = URL.createObjectURL(profilePicture);
      setProfilePictureURL(url);
      localStorage.setItem(`profilePictureURL_${userEmail}`, url);
    }
  }, [profilePicture, userEmail]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleDeleteProfilePicture = () => {
    setProfilePicture(null);
    setProfilePictureURL("");
    localStorage.removeItem(`profilePictureURL_${userEmail}`);
  };

  const handleSaveSettings = () => {
    setShowSettings(false);
  };

  return (
    <div className="profileWrapper">
      <div>
        <NavBar />
      </div>

      <div className="profileBody">
        <div className="profileBox">
          <div className="profilePhoto">
            {profilePictureURL && (
              <img
                src={profilePictureURL}
                alt="Profile"
                className="preview"
                width={400}
                height={400}
              />
            )}
          </div>
          <div className="profileInfo">
            <p>
              <span>Username:</span> {user.username}
            </p>
            <p>
              <span>Email:</span> {userEmail}
            </p>
          </div>
        </div>

        <div className="profileHeader">
          <div className="settingContainer">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="setting"
            >
              <img src={setting} alt="Settings" className="settingIcon" />
            </button>
            {showSettings && (
              <div className="profileSettings">
                <div className="profilePicture">
                  <input
                    type="file"
                    id="profilePicture"
                    accept="image/*"
                    onChange={handleProfilePictureChange}
                  />
                  <button onClick={handleDeleteProfilePicture}>
                    Delete Picture
                  </button>
                </div>
                <div>
                  <div className="emailReminderSetting">
                    <ReminderButton userEmail={userEmail} />
                  </div>
                  <span>Receive Weekly Reminder: Every Sunday at 9 AM</span>
                </div>
                <div>
                  <button onClick={handleSaveSettings}>Save Settings</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
