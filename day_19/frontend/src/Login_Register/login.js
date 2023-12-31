import "./login.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import facebook from "../assets/facebook-icon.png";
import google from "../assets/google-icon.png";
import twitter from "../assets/twitter-icon.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux";
import { login } from "../Redux/userReducer";
import { userRegister } from "../service/api";
import { userLogin } from "../service/api";
import { getUserDetail } from "../service/api";

function Login() {
  const container = document.getElementById("container");
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();
  // const Login = (e) => {
    //   e.preventDefault();
    //   if(validateEmail && validateName && validatePassword)
    //   {
      
      //   }
      // }
  const role ="USER";
  const code =Math.random().toString(36).substring(2,7);
  const profileurl = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";
  const dispatch = useDispatch();
  // const[formdata,setFormdata] = useState({
  //   username: '';
  // })
  const validateEmail = () => {
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!emailValue) {
      setEmailError("Please enter your email");
      return false;
    } else if (!emailPattern.test(emailValue)) {
      setEmailError("Invalid email address");
      return false;
    }

    setEmailError("");
    return true;
  };

  const validateName = () => {
    if (!nameValue) {
      setNameError("Please enter your Username");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePassword = () => {
    const minLength = 6;
    const hasSymbol = /[!@#$%^&*()_+[\]{};':"\\|,.<>/?]+/;
    const hasNumber = /\d/;

    if (!passwordValue) {
      setPasswordError("Please enter your password");
      return false;
    } else if (passwordValue.length < minLength) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    } else if (!hasSymbol.test(passwordValue)) {
      setPasswordError("Password must contain at least one symbol");
      return false;
    } else if (!hasNumber.test(passwordValue)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }

    setPasswordError("");
    return true;
  };










  const handleSignUp = async(e) => {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isNameValid = validateName();
    
    if (isPasswordValid && isEmailValid && isNameValid) {
      const res = await userRegister(nameValue,passwordValue,emailValue,code,profileurl,role)
      .then((res) => {
        console.log(res.data);
        if(res.data.message===' signup successfull')
          {
          toast.success("signup sucess");
          setTimeout(()=>
          {
            container.classList.remove("right-panel-active");
          },2000) 
          }
        else if(res.data.message==='Email & Username already exist'){
          toast.error("Email & Username already exist");
        }
        else if(res.data.message===' Email already exist'){
          toast.error(" Email already exist");
        }
        else if(res.data.message===' Username already exist')
          {
          toast.error("Username already exist");
          }
       })
    }
  };
  const handleSignIn = async(e) => {
    if (nameValue === "" ||passwordValue === "") 
    {
    toast.error("Enter all fields");
  } 
  else {
    e.preventDefault();
    const res = await userLogin(nameValue,passwordValue)
    .then((res) => {
       console.log(res.data);
       localStorage.setItem("token",res.data.token);
      //  const roled = getItem()
        if(res.status===200 && res.data.role==="USER")
        { 
          toast.success("login successfull");
          setTimeout(()=>
          {
              getUserDetail(nameValue).then((res)=>{
              console.log(res);
              localStorage.setItem("username",res.data[0].username);
              localStorage.setItem("email",res.data[0].email);
              localStorage.setItem("profileurl",res.data[0].profileurl);
              localStorage.setItem("role",res.data[0].role);
              dispatch(login(res.data[0]));
            })
            navigate("/");
          },3000)   
        }
        else if((res.status)=="200"&& res.data.role=="ADMIN"){
          console.log(res.data);
          localStorage.setItem('Token', res.data.token);
          localStorage.setItem('Role', res.data.role);
          localStorage.setItem('AdminEmail', res.data.email);
    
          toast.success(` Welcome ${res.data.email} `, );
          setTimeout(() => {
            getUserDetail(nameValue).then((res)=>{
              console.log(res);
              localStorage.setItem("username",res.data[0].username);
              localStorage.setItem("email",res.data[0].email);
              localStorage.setItem("profileurl",res.data[0].profileurl);
              localStorage.setItem("role",res.data[0].role);
              dispatch(login(res.data[0]))
            })
              navigate('/admin/dashboard');   
        },1500);}

        else
        {
        toast.error(res.data);
        }
    })
    }
}

  useEffect(() => {
    const signUpButton = document.getElementById("signUp");
    const signInButton = document.getElementById("signIn");
    const container = document.getElementById("container");

    if (signUpButton && signInButton && container) {
      const signUpClickHandler = () => {
        setPasswordError("");
        setEmailError("");
        setNameError("");
        container.classList.add("right-panel-active");
      };

      const signInClickHandler = () => {
        setPasswordError("");
        setEmailError("");
        setNameError("");
        container.classList.remove("right-panel-active");
      };

      signUpButton.addEventListener("click", signUpClickHandler);
      signInButton.addEventListener("click", signInClickHandler);


      // Clean up the event listeners when the component unmounts
      return () => {
        signUpButton.removeEventListener("click", signUpClickHandler);
        signInButton.removeEventListener("click", signInClickHandler);
      };

    }
  }, []);

  return (
    <>
    <div className="doop">
      <div className="container" id="container">
            <ToastContainer
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
      />
        <div className="form-container sign-up-container">
          <form action="#" className="Login-form" onSubmit={(e)=>e.preventDefault()}>
            <h1 className="create_account">Create Account</h1>

            <div className="social-container-1">
              <img
                src={facebook}
                alt="facebook logo"
                className="social rounded-circle"
              />
              <i className="fab fa-facebook-f"></i>
              <img src={google} alt="google logo" className="social" />
              <i className="fab fa-google-plus-g"></i>
              <img src={twitter} alt="twitter logo" className="social" />
              <i className="fab fa-twitter"></i>
            </div>

            <span className="registration-text">or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              value={nameValue}
              className="signup-name"
              onChange={(e) => setNameValue(e.target.value)}
              required
            />
            <span className="error-message-1">{nameError}</span>
            <input
              type="email"
              placeholder="Email"
              value={emailValue}
              className="signup-email"
              onChange={(e) => setEmailValue(e.target.value)}
              required
            />
            <span className="error-message-2">{emailError}</span>
            <input
              type="text"
              placeholder="Password"
              value={passwordValue}
              className="signup-password"
              onChange={(e) => setPasswordValue(e.target.value)}
              required

            />
            <span className="error-message-3">{passwordError}</span>
            <button className='signupButton' onClick={handleSignUp}>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#" className= 'Login-form' onSubmit={(e) => e.preventDefault()}>
            <h1 className="signIn-account">Sign in</h1>
            <div className="social-container-2">
              <img
                src={facebook}
                alt="facebook logo"
                className="social rounded-circle"
              />
              <i className="fab fa-facebook-f"></i>
              <img src={google} alt="google logo" className="social" />
              <i className="fab fa-google-plus-g"></i>
              <img src={twitter} alt="twitter logo" className="social" />
              <i className="fab fa-twitter"></i>
            </div>
            <span className="use-account">or use your account</span>
            <input
              type="text"
              placeholder="username"
              value={nameValue}
              className="signin-email"
              onChange={(e) => setNameValue(e.target.value)}
              required
            />
            {/* <span className="error-message-4">{emailError}</span> */}
            <input
              type="password"
              placeholder="Password"
              value={passwordValue}
              className="signin-password"
              onChange={(e) => setPasswordValue(e.target.value)}
              required
            />
            {/* <span className="error-message-5">{passwordError}</span> */}
            <Link to="/forgot">
              <span className="forgot-password">Forgot your password?</span>
            </Link>
            <button className='signInbtn' onClick={handleSignIn}>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghost" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image"></div>
      </div>
    </>
  );
}

export default Login;
