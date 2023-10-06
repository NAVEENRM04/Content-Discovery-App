import React, { useEffect } from "react";
import "./MainPage.css";
import { FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { categories } from "../Category/data";
import Category from "../Category/Category";
import axios from "axios";
import { useState } from "react";
import Heart_OutLine from "../../assets/heart-outline.png";

import save_OutLine from "../../assets/save-outline.png";
import { useNavigate } from "react-router-dom";


function MainPage() {
  const [imageData, setImageData] = useState([]);
  const navigate = useNavigate();




const onMove =()=>{
  navigate("/myuploads");
}
  useEffect(() => {
    axios.get('http://localhost:8080/image/data')
      .then((response) => {
        setImageData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error in fetching image detail', error);
      });
  }, []);

  return (
    <>

      <div className="main-container">
        <div className="categories-container">
          {categories.map((data) => (
            <Category key={data.id} data={data} />
          ))}
          <div ><button onClick={onMove} >my uploads</button></div>
        </div>
        <div className="content-container">
        <div className="MainPage-page">
          {/* <span className="MainPage_Video_Title">Trending Images</span> */}
          <motion.div className="MainPageVideo-page">
          {imageData.map((mainpage) => (
            <motion.div
              layout
              key={mainpage.id}
              className="MainPage-Video-div"
            >
              <img
                className="MainPage-Video-img"
                src={mainpage?.imageurl}
                alt=""
              />
              <div className="MainPage_Like_Save">
                <img
                  src={Heart_OutLine}
                  alt="Heart"
                  className="MainPage_Video_like"
                // onClick={() => toggleVideoLike(mainpage.id)}
                />
                <img
                  src={save_OutLine}
                  alt="Save"
                  className="MainPage_Video_save"
                // onClick={() => toggleVideoSave(mainpage.id)}
                />
              </div>
              <div className="post_profile_section">
                <img
                  src={mainpage?.id?.profileurl}
                  alt=""
                  className="MainPage-Video-profile-pic"
                />
                <div className="MainPage-Video-caption">
                  {mainpage.imagecaption}
                </div>
                <div className="MainPage-Video-username">
                  By {mainpage.id?.username}
                </div>
              </div>
              
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>
      </div>

    </>

  );
}

export default MainPage;
