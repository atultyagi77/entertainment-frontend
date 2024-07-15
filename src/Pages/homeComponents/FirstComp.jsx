import React, { useState, useEffect } from "react";
import movie from "./assets/movies.jpg";
import tvseries from "./assets/tvseries.jpg";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FirstComp = () => {
  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });

  // Retrieve user details from localStorage
  const getUserDetials = JSON.parse(localStorage.getItem("user"));

  // Update time every second using useEffect and setInterval
  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      setTime({
        hours: hours < 10 ? "0" + hours : hours.toString(),
        minutes: minutes < 10 ? "0" + minutes : minutes.toString(),
        seconds: seconds < 10 ? "0" + seconds : seconds.toString(),
      });
      // console.log(date.getTime())
    }, 1000);
  }, []);
  const reactToast = () => {
    // console.log("clickon");
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
  };
  //  console.log(getUserDetials , "userss")
  return (
    <>
      {/* User information and time display section */}
      <section className="text-gray-600 ml-10 body-font mr-4">
        <div className="flex  items-end justify-end">
          <div className="flex flex-col mt-10 mr-8">
            {/* Display user photo or current time if user details are not available */}
            {getUserDetials && getUserDetials.photoURL ? (
              <img
                className="rounded-lg"
                src={getUserDetials.photoURL}
                height={50}
                width={50}
                alt="loading..."
              />
            ) : (
              <h1 className="text-red-300">
                Time : {time.hours} : {time.minutes} : {time.seconds}
              </h1>
            )}
            {getUserDetials ? (
              getUserDetials.name ? (
                <h1 className="text-red-300">
                  Welcome! {getUserDetials.name}
                </h1>
              ) : (
                <h1 className="text-red-300">
                  Welcome! {getUserDetials.displayName}
                </h1>
              )
            ) : (
              ""
            )}
          </div>
        </div>

         {/* Content section with movie and TV series links */}
        <div className="container px-5 py-24 mx-auto">
          <button
            className="text-zinc-300 text-2xl bg-slate-600"
            onClick={reactToast}
          >
            react toastify
          </button>

           {/* Grid layout for movie and TV series sections */}
          <div className="flex  sm:-m-4 -mx-4 -mb-10 -mt-4">
            <div className="p-4 md:w-[60%]  sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={movie}
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                Shooting Stars
              </h2>
              <p className="text-base leading-relaxed mt-2">
                Movies transport us to different worlds, evoke emotions, spark
                imagination, and offer diverse perspectives, enriching our lives
                with storytelling magic.
              </p>
              {/* Link to Movies page */}
              <Link
                to={"/movies"}
                className="text-indigo-500 rounded-lg p-2 hover:bg-[#FC4747]  hover:text-slate-950 inline-flex items-center mt-3"
              >
                Movies
              </Link>
            </div>

             {/* TV series section */}
            <div className="p-4  md:w-[60%] sm:mb-0 mb-6">
              <div className="rounded-lg h-64 overflow-hidden">
                <img
                  alt="content"
                  className="object-cover object-center h-full w-full"
                  src={tvseries}
                />
              </div>
              <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
                The Catalyzer
              </h2>
              <p className="text-base leading-relaxed mt-2">
                TV series captivate with serialized storytelling, intricate
                character arcs, suspenseful plots, and immersive worlds,
                inviting audiences on captivating episodic journeys.
              </p>
              {/* Link to TV Series page */}
              <Link
                to={"/tvseries"}
                className="text-indigo-500 rounded-lg p-2 hover:bg-[#FC4747]  hover:text-slate-950 inline-flex items-center mt-3"
              >
                Tv Series
              </Link>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
};

export default FirstComp;
