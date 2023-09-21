import React from "react";
import "./MainPage.css";
import { FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import Navbar from "../Navbar/Navbar";
import { categories } from "../Category/data";
import Category from "../Category/Category";
import { imageData } from "./data";

function MainPage() {

  return (
    <>
    
    <div className="main-container">
      <div className="categories-container">
        {categories.map((data) => (
          <Category key={data.id} data={data} />
        ))}
      </div>
      <motion.div className="MainPage-page">
        {imageData.map((mainPage, i) => (
          <motion.div layout key={i} className="MainPage-div">
            <img className="MainPage-img" src={mainPage.MainPageUrl} alt="" />
            <img src={FaTwitter} alt="" className="MainPage-profile-pic" />
            <div className="MainPage-caption">{mainPage.MainPageCaption}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
    </>

  );
}

export default MainPage;
