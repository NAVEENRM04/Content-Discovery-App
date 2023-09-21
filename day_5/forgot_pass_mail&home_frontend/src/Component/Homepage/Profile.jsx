import React,{useState} from 'react'
import './profile.css';
const Profile = () => {
    const [showProfile, setShowProfile] = useState(true);
    
    const handleclose =()=>{
        setShowProfile(false)
      };

  return (
    <>
    {showProfile&&
        <div className="contact-container">
            <div className="contact-box">
                <div className="profilepicbox"><img src="onjn" alt='pic'/></div>
                <div className="detail">
                    NAME :<br/>
                    MAIL:<br/>
                    PHONE:  

                </div>

            </div>
        </div>
    }
    </>
  )
}

export default Profile;