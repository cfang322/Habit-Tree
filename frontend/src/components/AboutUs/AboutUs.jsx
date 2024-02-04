import dominicProfile from '../../assets/dominicProfile.jpg';
import christinaProfile from "../../assets/christinaProfile.jpeg";
import farhatProfile from "../../assets/farhatProfile.jpeg";
import "./AboutUs.css";


function AboutUs() {
  const profiles = [
    {
      name: "Farhat Sumaiya",
      role: "Frontend",
      description:
        "As a beginner full stack developer, I'm dedicated to creating user-friendly websites and applications while constantly learning and adapting to new technologies",
      image: farhatProfile,
      github: "https://github.com/Farhatt18",
      linkedin: "https://www.linkedin.com/in/farhat-sumaiya-4704b11a3/",
    },
    {
      name: "Yaqi Fang",
      role: "Lead",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: christinaProfile,
      github: "https://github.com/cfang322",
      linkedin: "https://www.linkedin.com/in/yaqi-fang-125807250/",
    },
    {
      name: "Dominic Cashiola",
      role: "Backend",
      description: "Student at App Academy",
      image: dominicProfile,
      github: "https://github.com/Dominic5591",
      linkedin: "https://www.linkedin.com/in/dominic-c-1076322a8/",
    },
  ];
  
  return (
    <div className="aboutUsWrapper">
      <div className="aboutUsContainer">
        {profiles.map((profile, index) => (
          <div key={index} className="personCard">
            <img src={profile.image} alt={`profile-img-${index}`} />
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
            <p>{profile.description}</p>
            <div className="socialLinks">
              <a
                className="gitLink"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                className="linkedinLink"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
