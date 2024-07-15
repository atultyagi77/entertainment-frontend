import React, { useState, useEffect } from "react";
import TheatersIcon from "@mui/icons-material/Theaters";
import { Link, useNavigate } from "react-router-dom";
import facebook from "./assets/facebook.jpeg";
import google from "./assets/google.png";
import github from "./assets/github.png";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { userSignupDetailsReducer } from "../../Redux/loginReducer";
import { useDispatch, useSelector } from "react-redux";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseFile/firebase";
import { setLoggedUserData } from "../../Redux/loginReducer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Signup = () => {
  AOS.init();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getStatus = useSelector((state) => state.userLoginDetails.newUserResponse.status);

  const [focusedField, setFocusedField] = useState("");
  const [newUserDetails, setNewUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isVaildEmail = emailRegex.test(newUserDetails.email);
  const isValid = passwordRegex.test(newUserDetails.password);

  useEffect(() => {
    document.title = `Signup`;
  }, []);

  useEffect(() => {
    if (getStatus === 201) {
      Swal.fire({
        title: "Success!",
        text: "Account Created Successfully!",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
      });
      navigate("/login");
    } else if (getStatus === 409) {
      toast.info("User already exists!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [getStatus, navigate]);

  const styles = {
    width: "50px",
    height: "50px",
  };

  const setDataToNewUserDetailsHook = (event) => {
    const { name, value } = event.target;
    setNewUserDetails((preValue) => ({
      ...preValue,
      [name]: value,
    }));
  };

  const createUserDetailsSendToBackend = (event) => {
    event.preventDefault();

    if (newUserDetails.name === "" || newUserDetails.email === "" || newUserDetails.password === "") {
      toast.info("Enter full details", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      if (isValid && isVaildEmail) {
        dispatch(userSignupDetailsReducer(newUserDetails));
      }
    }
  };

  const signupWithGoogle = async (event) => {
    event.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, email, emailVerified, photoURL, accessToken } = result.user;
      dispatch(setLoggedUserData({ displayName, email, emailVerified, photoURL, accessToken }));
      Cookies.set("loginCookies", result.user.accessToken, { expires: 30 });
      toast.success("Login Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const signupWithFacebook = async (event) => {
    event.preventDefault();
    Swal.fire({
      text: "Coming Soon",
      icon: "info",
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const signupWithGithub = async (event) => {
    event.preventDefault();
    Swal.fire({
      text: "Coming Soon",
      icon: "info",
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  return (
    <>
      <form action="submit" method="get">
        <div
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="flex mx-auto w-auto md:w-[60%] justify-center items-center"
        >
          <div className="container p-4 mt-20 rounded-lg my-8">
            <div className="flex justify-center">
              <TheatersIcon className="bg-[#FC4747] rounded-lg" style={styles} />
            </div>
            <div className="bg-[#161D2F] rounded-xl">
              <div className="flex m-6 justify-center">
                <h1 className="text-3xl text-zinc-200">Signup</h1>
              </div>
              <div className="flex mx-5 mt-5 justify-center">
                <input
                  className="bg-[#171e31] w-[75%] border-b-2 outline-0 text-zinc-200"
                  name="name"
                  required
                  onFocus={() => handleFocus("name")}
                  value={newUserDetails.name}
                  onChange={setDataToNewUserDetailsHook}
                  type="text"
                  placeholder="Enter your name"
                />
              </div>
              {focusedField === "name" && !newUserDetails.name && (
                <p className="flex justify-center text-red-500 mt-1">Name cannot be empty</p>
              )}
              <div className="flex mx-5 mt-5 justify-center">
                <input
                  className="bg-[#171e31] w-[75%] border-b-2 outline-0 text-zinc-200"
                  name="email"
                  required
                  value={newUserDetails.email}
                  onChange={setDataToNewUserDetailsHook}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              {!isVaildEmail && (
                <p className="flex justify-center text-red-500 mt-1">Email is required!</p>
              )}

              <div className="flex mx-5 mt-5 justify-center">
                <input
                  className="border-b-2 bg-[#161D2F] w-[75%] outline-0 text-zinc-200"
                  type="password"
                  name="password"
                  required
                  onChange={setDataToNewUserDetailsHook}
                  value={newUserDetails.password}
                  placeholder="Enter your password"
                />
              </div>
              {!isValid && (
                <p className="flex justify-center items-center text-red-500 mt-1">
                  Password must have a-z, 0-9, !@#$%^&*!
                </p>
              )}

              <div className="flex justify-center m-8">
                <button
                  onClick={createUserDetailsSendToBackend}
                  className="text-xl px-20 py-3 bg-[#FC4747] rounded-lg text-zinc-200"
                >
                  Create Account
                </button>
              </div>
              <div className="flex flex-wrap justify-center mb-3 mx-auto">
                <img
                  onClick={signupWithGoogle}
                  className="m-2 cursor-pointer"
                  src={google}
                  alt="loading..."
                  width={220}
                  height={150}
                />
                <img
                  onClick={signupWithFacebook}
                  className="m-2 cursor-pointer"
                  src={facebook}
                  alt="loading..."
                  width={220}
                  height={150}
                />
                <img
                  onClick={signupWithGithub}
                  className="m-2 cursor-pointer"
                  src={github}
                  alt="loading..."
                  width={220}
                  height={150}
                />
              </div>
              <div className="flex justify-center">
                <h3 className="text-lg text-zinc-200 mb-3">
                  Already have account?
                  <Link to={"/login"} className="text-blue-700">
                    Login
                  </Link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        closeButton={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
};

export default Signup;
