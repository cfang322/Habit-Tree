import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReminderButton from "../Email/email";
import "./Profile.css";
import NavBar from "../NavBar/NavBar";
import setting from "../../assets/images/setting.png";
import ProfileInfo from "./ProfileInfo";

const Profile = () => {
  const userEmail = useSelector((state) => state.session.user.email);
  const user = useSelector((state) => state.session.user);
  const [showSettings, setShowSettings] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState(() => {
    return localStorage.getItem(`profilePictureURL_${userEmail}`) || "";
  });

  useEffect(() => {
    async function fetchProfilePicture() {
      try {
        const response = await fetch(`/api/user/profile-picture/${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setProfilePictureURL(data.profilePictureURL);
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    }

    fetchProfilePicture();
  }, [userEmail]);

  useEffect(() => {
    if (profilePicture) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePictureURL(reader.result);
        localStorage.setItem(`profilePictureURL_${userEmail}`, reader.result);
      };
      reader.readAsDataURL(profilePicture);
    }
  }, [profilePicture, userEmail]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    setProfilePicture(file);
  };

  const handleDeleteProfilePicture = async () => {
    setProfilePicture(null);
    setProfilePictureURL("");
    localStorage.removeItem(`profilePictureURL_${userEmail}`);
    try {
      const response = await fetch("/api/user/delete-profile-picture", {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Profile picture deleted successfully");
      } else {
        console.error("Failed to delete profile picture");
      }
    } catch (error) {
      console.error("Error deleting profile picture:", error);
    }
  };

  const handleSaveSettings = async () => {
    setShowSettings(false);
    if (profilePicture) {
      const formData = new FormData();
      formData.append("profilePicture", profilePicture);

      try {
        const response = await fetch("/api/user/profile-picture", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          console.log("Profile picture uploaded successfully");
        } else {
          console.error("Failed to upload profile picture");
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="profileWrapper">
      <NavBar />
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
            <p><span>Username:</span>{user.username}</p>
            <p>
              <span>Email:</span> {userEmail}
            </p>
            <ProfileInfo />
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
                <br>
                </br>
                <br>
                </br>
                <div className="emailStuff">
                  <div className="emailReminderSetting">
                    <ReminderButton userEmail={userEmail} />
                  </div>
                  <div className="spanDiv">
                    <span>Receive Weekly Reminders: Every Sunday at 9 AM</span>
                  </div>
                </div>
                <div className="saveSettingsDiv">
                  <button onClick={handleSaveSettings}>Save Settings</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ul className='upperFooter' onClick={scrollToTop}>
        <p className="backToTopP">Back to top</p>
      </ul>
      <ul className='lowerFooter'>
        <p className='footerItem'>Copyright &copy; 2024 Habit Tree</p>
      </ul>
    </div>
  );
};

export default Profile;
