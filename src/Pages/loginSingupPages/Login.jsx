import React, { useState, useMemo, useEffect } from "react";
import TheatersIcon from "@mui/icons-material/Theaters"; //import icon
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginDetailsReducer } from "../../Redux/loginReducer";
import AOS from "aos";
import "aos/dist/aos.css";
import { ToastContainer, toast } from "react-toastify"; //import alert
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress"; // import spinner

const Login = () => {
  AOS.init();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const logedUser = useSelector(
    (state) => state.userLoginDetails.loggedUserDetails
  );

  if (logedUser.status === 200) {
    toast.success("Login Successfully");
    // Redirect to home page after successful login
    navigate("/");
  }

  useEffect(() => {
    document.title = `Login`;
  }, []);

  // Memoize logged-in user details
  useMemo(() => logedUser, [logedUser]);

  const styles = {
    width: "50px",
    height: "50px",
  };

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  // Update state with form input data
  const setDataToHook = (event) => {
    const { name, value } = event.target;
    setLoginDetails((previousDetails) => ({
      ...previousDetails,
      [name]: value,
    }));
  };

  // Send login data to server
  const sendDataToServer = (event) => {
    event.preventDefault();
    setLoading(true); // Show spinner
    dispatch(userLoginDetailsReducer(loginDetails));

    // Simulate server response delay
    setTimeout(() => {
      if (loginDetails.email === "" && loginDetails.password === "") {
        toast.error("Enter details");
      } else if (logedUser.status === 200) {
        toast.success("Login Successfully");
        // Redirect to home page after successful login
        navigate("/");
      } else {
        toast.error("Login failed, Try Again");
      }
      // Hide spinner after API call completes
      setLoading(false);
    }, 2000);
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
          <div className="container p-4 mt-28 rounded-lg my-8">
            <div className="flex justify-center">
              <TheatersIcon
                className="bg-[#FC4747] rounded-lg"
                style={styles}
              />
            </div>
            <div className="bg-[#161D2F] rounded-xl">
              <div className="flex m-6 justify-center">
                <h1 className="text-3xl text-zinc-200">Login</h1>
              </div>
              <div className="flex m-6 justify-center">
                <input
                  className="bg-[#171e31] w-[75%] border-b-2 outline-0 text-zinc-200"
                  onFocus={() => handleFocus("email")}
                  name="email"
                  type="text"
                  onChange={setDataToHook}
                  value={loginDetails.email}
                  placeholder="Enter your email"
                />
              </div>
              {/* Display error message if email field is focused and empty */}
              {focusedField === "name" && !loginDetails.email && (
                <p className="flex justify-center text-red-500 mt-1">
                  Enter email
                </p>
              )}
              <div className="flex m-6 justify-center">
                <input
                  className="border-b-2 bg-[#161D2F] w-[75%] outline-0 text-zinc-200"
                  onFocus={() => handleFocus("password")}
                  name="password"
                  value={loginDetails.password}
                  onChange={setDataToHook}
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              {/* Display error message if password field is focused and empty */}
              {focusedField === "name" && !loginDetails.password && (
                <p className="flex justify-center text-red-500 mt-1">
                  Password required
                </p>
              )}
              <div className="flex justify-center m-8">
                <button
                  type="button"
                  onClick={sendDataToServer}
                  className="text-xl p-2 bg-[#FC4747] rounded-lg text-zinc-200"
                  disabled={loading} // Disable button when loading
                >
                  {/* Show spinner or button text */}
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Login To Your Account"
                  )}
                </button>
              </div>
              <div className="flex justify-center">
                <h3 className="text-lg text-zinc-200 mb-3">
                  Don't have an Account?{" "}
                  <Link to={"/signup"} className="text-blue-700">
                    SignUp
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

export default Login;
