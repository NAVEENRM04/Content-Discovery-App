import React, { useState } from 'react'
import logo from "../../assets/logo.jpg"
import logo_dark from "../../assets/logo.jpg"
import "../Navbar/Navbar.css"
import { IoAdd, IoLogOut, IoMoon, IoSearch, IoSunny } from "react-icons/io5";
import { Flex, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { Link,useNavigate } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { selectuserr } from '../../Redux/userSlice';
import demopic from "../../assets/demopic.jpg"


const Navbar = ({user, setsearchTerm, searchTerm}) => {
  const navigate = useNavigate();
  const [showProfile,setShowProfile]=useState(false);
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue("gray.600","gray.300")
  const userr = useSelector(selectuserr)
  return (
    <>
    <div className="navbar-bigbox">

    
  <Flex
    justifyContent={"space-between"}
    alignItems="center"
    width={"97vw"}
    overflow={"hidden"}
    p={4}
  >
    <Link to={"/"}>
      <Image src={colorMode == "light" ? logo_dark : logo} borderRadius={"50px"}
      width={"80px"} />
    </Link>

    <InputGroup mx={6} width="60vw">
      <InputLeftElement
        pointerEvents="none"
        children={<IoSearch fontSize={25} />}
      />
      <Input
        type="text"
        placeholder="Search..."
        fontSize={18}
        fontWeight="medium"
        variant={"filled"}
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}
        onFocus={() => navigate("/search")}
      />
    </InputGroup>

    <Flex justifyContent={"center"}
    alignItems="center">
      <div className="username_caption"> {userr ? userr.username : "guest"} </div>
      {/* toggle btn */}
      <Flex
        width={"40px"}
        height="40px"
        justifyContent={"center"}
        alignItems="center"
        cursor={"pointer"}
        borderRadius="5px"
        onClick={toggleColorMode}
        // right={"210px"}
        // position={"absolute"}
        
      >
        {colorMode == "light" ? (
          <IoMoon fontSize={25} />
        ) : (
          <IoSunny fontSize={25} />
        )}
      </Flex>
      

      {/* create Btn */}
      <Link to={"/create"}>
        <Flex
          justifyContent={"center"}
          alignItems="center"
          bg={bg}
          width="40px"
          height="40px"
          borderRadius="5px"
          mx={6}
          cursor="pointer"
          _hover={{ shadow: "lg" }}
          transition="ease-in-out"
          transitionDuration={"0.3s"}
        >
          <IoAdd
            fontSize={25}
            color={`${colorMode == "dark" ? "#111" : "#f1f1f1"}`}
          />
        </Flex>
      </Link>

      <Menu>
        <MenuButton onClick={()=>setShowProfile(!showProfile)}>
          <Image
            src={logo}
            width="40px"
            height="40px"
            minWidth={"40px"}
            rounded="full"
          />
        </MenuButton>
      </Menu>
    </Flex>
  </Flex>
  </div>
  {showProfile &&
  <div className="profilecontainer">
    <div className="profile_box">
      sfsgfwsrvg
    </div>
  </div>
  }

  </>
   
  )
}

export default Navbar