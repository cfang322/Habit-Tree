import './AboutUs.css';

function AboutUs() {
    return (
        <div className="aboutUsWrapper">
            <div className="aboutUsContainer">
                <div className="personCard">
                    <img src="person1.jpg" alt="dominic-img" />
                    <h2>Dominic Cashiola</h2>
                    <p>Backened</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="personCard">
                    <img src="christina-profile.jpg" alt="christina-img" />
                    <h2>Yaqi Fang</h2>
                    <p>Lead</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className="personCard">
                    <img src="person3.jpg" alt="farhat-img" />
                    <h2>Farhat Sumaiya</h2>
                    <p>Frontend</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;