import React, { useEffect, useState } from "react";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import TheatersIcon from "@mui/icons-material/Theaters";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import AppsIcon from "@mui/icons-material/Apps";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";
import { useSelector } from "react-redux";

const Header = () => {
  const loginType = useSelector(state => state.userLoginDetails.loginType);

  const navigate = useNavigate();

  const [logout, setLogout] = useState(false);
  // get user details from localstorage
  const getUserDetails = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (getUserDetails && getUserDetails.email) {
      setLogout(true);
    } else {
      setLogout(false);
    }
  }, [getUserDetails]);

  // remove user data from localstorage to logout user and navigate to home page
  const logoutUser = async () => {
    try {
      if (loginType === "database") {
        const token = Cookies.get("loginCookies");
        const options = {
          method: "POST",
          url: `https://entertainment-backend-axzp.onrender.com/api/logout`,
          headers: {
            accept: "application/json",
          },
          data: { token, email: getUserDetails.email },
        };
        const newUserDetails = await axios(options);
        if (newUserDetails.status === 200) {
          //alert on logout
          Swal.fire({
            // title: 'Success!',
            text: 'Logout Successfully',
            icon: 'success',
            timer: 1000,
            timerProgressBar: true
          });
          Cookies.remove("loginCookies");
          localStorage.removeItem("user");
          setLogout(false);
          setTimeout(() => {
            navigate("/");
          }, 100);
        }
      } else {
        Swal.fire({
          // title: 'Success!',
          text: 'Logout Successfully',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true
        });
        Cookies.remove("loginCookies");
        localStorage.removeItem("user");
        setLogout(false);
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to set AOS effect based on screen width

  return (
    <>
      <section className="md:h-[80%] md:flex block md:w-12 m-2 h-14 w-full bg-[#1c1e26] text-[#d3d4d8] rounded-2xl fixed ">
        <div className="flex md:flex-col space-y-4 justify-between flex-row">
          <div className="md:ml-3 md:mt-4 ml-4 mt-3 ">
            <Link title="Entertaiment" to="/">
              <TheatersIcon className="bg-[#FC4747] rounded-lg " />{" "}
            </Link>
          </div>
          <div className="flex">
            <nav>
              <ul className="flex md:ml-2 md:space-y-6 space-x-4 md:space-x-0 md:block ">
                {/* defult link recommended by API */}
                <Link title="Home" to="/">
                  <AppsIcon />
                </Link>
                {/* Link to only movies */}
                <Link title="Movies" to="movies">
                  <VideoLibraryIcon />
                </Link>
                {/* Link to TV Series only */}
                <Link title="Tv Series" to="tvseries">
                  <PersonalVideoIcon />
                </Link>
                <Link title="Bookmarks" to="bookmarks">
                  <BookmarksIcon />
                </Link>
              </ul>
            </nav>
          </div>

          <div className="md:mt-4 flex justify-end">
            {/* Link to Login or Signup */}
            <Link
              title="Login/Signup"
              to={"login"}
              className="md:ml-3 mr-4 mt-0 mb-2  md:mb-4 "
            >
              {/* Check user is log in or not */}
              {getUserDetails ? (
                // if login then shows logout icon
                <LogoutIcon
                  onClick={logoutUser}
                  title={"logout"}
                  className="mb-2 md:mb-4  bg-[#4747FC] rounded-lg "
                />
              ) : (
                // if not logged in shows no accound logged in icon
                <NoAccountsIcon className="mb-2 bg-[#165524]  rounded-lg md:mb-4" />
              )}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Header;
