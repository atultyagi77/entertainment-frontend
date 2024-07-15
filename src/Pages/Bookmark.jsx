import React, { useEffect } from 'react'
import BTvSeries from './bookmarksComp/BTvSeries';
import BMovies from './bookmarksComp/BMovies';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Bookmark = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Bookmarks"
    const cookie = Cookies.get("loginCookies")
    if (!cookie) {
      // console.log(cookie)
      toast.error("User Not Login", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // Redirect to the login page
      setTimeout(() => {
        navigate("/login")
      }, 1000);
    }
  }, [navigate])

  return (
    <>
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
      <BMovies />
      <BTvSeries />
    </>

  )
}

export default Bookmark