import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import logo from "../../assets/logo.jpg"
import logo_dark from "../../assets/logo.jpg"
import "../Navbar/Navbar.css"
import { IoAdd, IoLogOut, IoMoon, IoSearch, IoSunny } from "react-icons/io5";
import { Flex, Image, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { Link, useNavigate } from 'react-router-dom'
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { selectuserr } from '../../Redux/userReducer';
import { persistor } from '../../Redux/Store'
import FileUploader from '../FileUploader'


const Navbar = ({ user, setsearchTerm, searchTerm }) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showsavepic,setShowSavepic] = useState(false);
  const [showimagein, setShowImagein] = useState(false);
  const [userData, setUserData] = useState();
  const [addShow, setAddShow] = useState(false)
  const [dp, setDp] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(null);
  const [file, setFile] = useState()
  const { colorMode, toggleColorMode } = useColorMode()
  const userr = useSelector(selectuserr)
  const bg = useColorModeValue("gray.600", "gray.300")
  const [imagecategory, setCategory] = useState('Enter');
  const [imagecaption,setImageCaption]=useState("");
  const [imageurl,setImageUrl]=useState("");
  const [imagelikes,setImageLike]=useState(0);
  const [imagesave,setImageSave]=useState(false);
  const [showaddimg,setShowAddImage]=useState(false);
  const [userid,setUserId]=useState();
  const [imageData,setImageData]=useState();

  
    const imageset={
      id:userData?.id,
      username:userData?.username,
      user:{
        id:userData?.id,
        username:userData?.username,
        email:userData?.email,
        password:userData?.password,
        code:userData?.code,
        profileurl:userData?.profileurl
      },
      images:[{
      imagecaption: imagecaption,
      imageurl: imageurl,
      category: imagecategory,
      likes: 0,
      saved: true,
      id:{
        id:userData?.id,
        username:userData?.username,
        email:userData?.email,
        password:userData?.password,
        code:userData?.code,
        profileurl:userData?.profileurl
      }
      }]
    };
  




  const logoutprofile = () => {
    persistor.purge();
    window.location.reload()
  }
  const handleChange = (e) => {
    if (e.target.value.length > 15) {
      setError("word limit is ksdbvjsbvebeiubvu")
      console.log(setError)
    }
    else {
      setDesc(e.target.value)
      setError(null)
    }
  }




  function handleFile(event) {
    setFile(event.target.files[0])
    console.log(file)
  }

  
  //<----------------------------------->


  useEffect(() => {
    // Make a request to fetch user information
    axios.get(`http://localhost:8080/getdetail/${userr ? userr.username : 'guest'}`)
      .then((response) => {
        setUserData(response.data[0]);
        // const sampledata = userData.id.imageid;

        console.log(userData?.id);

        console.log(response.data[0]?.profileurl.replaceAll("\"", ""));
        setUserId(response.data[0]?.id);
        
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
  }, []);

  const UploadProfile = (e) => {
    e.preventDefault();
    axios.get(`http://localhost:8080/login/update-image/${userr ? userr.username : 'guest'}`, { params: { dp: dp } })
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      }).catch((err)=>{
        setShowSavepic(false);
        console.log('upload img',err)
      })

    console.log(dp)
  };
  const likes = 0;
  const saved = false;
  const handleUpload=(e)=> {
    e.preventDefault();
    console.log(userData?.id);
    console.log(imageset);
    console.log(userData);
    axios.post(`http://localhost:8080/image_user/postimagesbyuser`,imageset).then((res)=>{
      console.log(res.data);
      console.log(userr?.id);
      if(res.data==='image added')
      {
        console.log('success');
      }
       window.location.reload();
    })
    
  }

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
            <div className="logopic"><Image src={colorMode == "light" ? logo_dark : logo} borderRadius={"50px"} width={"80px"} /></div>
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
            >
              {colorMode == "light" ? (
                <IoMoon fontSize={25} />
              ) : (
                <IoSunny fontSize={25} />
              )}
            </Flex>
            {/* create Btn */}
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
                onClick={() => { setAddShow(!addShow);setShowProfile(false);setShowImagein(false);setShowAddImage(false) }}
              />
            </Flex>

            <Menu>
              <MenuButton onClick={() => { setShowProfile(!showProfile); { setShowImagein(false) };setShowAddImage(false);setAddShow(false) }}>
                <Image
                  src={userData?.profileurl.replaceAll("\"", "")}
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
        <div className="profile_container">
          <div className="profile_box">
            <div className='img_package'>
                      <img className="profile_img" src={userData?.profileurl.replaceAll("\"", "")} alt="imgplace" />
                      <div className="editbutton"><button onClick={() => {setShowImagein(!showimagein);setShowSavepic(!showsavepic)}}>EDIT</button></div>
                      
                      </div>
            <div className="profile_detail">
              <div className="profile_name">NAME &nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;{userData?.username} </div>
              <div className="profile_email">EMAIL &nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;{userData?.email} </div>
              <div className="logout"  ><button onClick={logoutprofile}>LOGOUT</button></div>
            </div>
          </div>
        </div>
      }
      {
        showsavepic&&
        <div className="savepic"><button onClick={UploadProfile} > Save picture</button></div>
      }
      {showimagein &&
        <div className="imageupload-container">
          {
            <div className="uploaderbox">
                <FileUploader setImageUrl={setDp} />
            </div>
          }
        </div>
      }
      {addShow &&
        <div className="add_container">
          <div className="create">
            <h2>Add a New Post</h2>
            <form onSubmit={handleUpload}  >
              <label>Post title:</label>
              <input
                type="text"
                required
                value={imagecaption}
                onChange={(e) => setImageCaption(e.target.value)}
              />
              <label>Post description:</label>
              <textarea required value={desc} onChange={handleChange}>
              <span className='errorLimit'>{error && error}</span>
              </textarea>
              <label>Category:</label>
              <select value={imagecategory} onChange={(e) => setCategory(e.target.value)}>
                <option value="Games">Games</option>
                <option value="Funny">Funny</option>
                <option value="Technology">Technology</option>
                <option value="Nature">Nature</option>
                <option value="Animals">Animals</option>
              </select>
              <div className="uploadaddimg"><button className='upload-image-button' onClick={(e)=>{{e.preventDefault();setShowAddImage(!showaddimg)}}} >uploadImage</button></div>
                <button type='submit'>Upload</button>
            </form>
          </div>
        </div>
      }
      {showaddimg &&
        <div className="addimage-container">
            <div className="add-uploaderbox">
                <FileUploader setImageUrl={setImageUrl} />
            </div>
        </div>
      }
    </>

  )
}

export default Navbar