import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getMoviesAndSeries,
  getMovieAndTvSeriesDetails,
} from "../../Redux/allMovieReducer";
import { Link } from "react-router-dom";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import AOS from "aos";
import "aos/dist/aos.css";
import Spiner from "../../components/spinerFolder/Spiner";
const SecondComp = () => {
  // console.clear();
  AOS.init();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  // access recommedation movies and tvseries
  const moviesAndSeries = useSelector((state) => state.addMoviesDetails.all);
  const [time, setTime] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const getUserDetials = JSON.parse(localStorage.getItem("user"));

  // calling setInterval to get real time update
  useEffect(() => {
    document.title = "Home"
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
    // get movies and tvSeries and save to redux store initialstate.recommedation
    const getMoviesAndTvseries = async () => {
      // try and catch block to handle erros
      try {
        const options = {
          url: "https://api.themoviedb.org/3/trending/all/day?language=en-US",
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDA3MmZkYmY3ODkxMjUxYzM3MGVhNzk2ZTNjNjYyZiIsIm5iZiI6MTcyMDY5MTU3NC4yMDE1NjgsInN1YiI6IjY2OGZhOTEyOWNkZGU2M2I4M2I2MzE1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CXuLEFK_aYiPCLgS27OdIH-M3AXxZ6pSvk_whCSOovw",
          },
        };
        let moviesAndTvSeriesData = await axios(options);
        if (moviesAndTvSeriesData.status === 200) {
          // console.log(moviesAndTvSeriesData.data.results , "second component")
          dispatch(getMoviesAndSeries(moviesAndTvSeriesData.data.results));
        }
        // const {id , original_title, release_date , poster_path} = moviesData.data.results
        // console.log(moviesData.data.results , "movies.data")
      } catch (error) {
        console.log(error);
      }
      /*{
  "success": true,
  "expires_at": "2024-03-23 15:13:19 UTC",
  "request_token": "b15fb05076e8888d0aac3fc72fdd88eeeec73590"
} */
    };

    if (!moviesAndSeries || moviesAndSeries.length === 0) {
      getMoviesAndTvseries();
    }
  }, [dispatch, moviesAndSeries]);
  const sendIdAndTypeToReducer = useCallback(
    (id, type) => {
      // console.log(id, type, "from second comp");
      // dispatch function to find full for  specific tvseries or movie
      dispatch(getMovieAndTvSeriesDetails({ id, type }));
    },
    [dispatch]
  );

  if (!moviesAndSeries) {
    return <Spiner />;
  } else if (moviesAndSeries.length === 0) {
    // Data is fetched but empty
    return <div>No movies or series found.</div>;
  } else {
    // console.clear();
    // filter movie or tvsereis using filter method
    const filteredMovies = moviesAndSeries.filter((movie) =>
      movie.original_title
        ? movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
        : movie.original_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
      <>
        <div className="flex  items-end justify-end">
          <div className="flex flex-col mt-20 mr-8">
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
            {/* {getUserDetials ? (
              <div className="text-red-300"> {getUserDetials.email} </div>
            ) : (
              ""
            )} */}
          </div>
        </div>

        <div
          id="searchButton"
          className=" mb-3  relative  mx-6 w-auto  md:ml-16 md:mr-10  "
        >
          <div className="mt-6">
            <div className="absolute left-2 top-[0.35rem]">
              <SearchIcon />
            </div>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              className="px-10  hover:border-2 w-full
        border-blue-800
        hover:border-blue-700 py-2 rounded-2xl "
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <h1 className="text-zinc-300 text-4xl">Recommendation For You</h1>
        </div>
        <section
          data-aos="zoom-in-up"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="flex my-24  flex-wrap mx-16"
        >
          {filteredMovies.length === 0 ? (
            <div className="text-center text-red-500 font-bold">
              No movies found for your search query.
            </div>
          ) : (
            filteredMovies.map((items) => {
              const {
                id,
                media_type,
                first_air_date,
                original_name,
                original_title,
                original_language,
                poster_path,
                release_date,
              } = items;
              return (
                <>
                  <div
                    key={id}
                    className="my-3 mr-auto ml-auto w-full h-full  sm:w-60  md:w-72  items-center"
                  >
                    <Link
                      className=" flex "
                      onClick={() => sendIdAndTypeToReducer(id, media_type)}
                      title={!original_title ? original_name : original_title}
                      to={`/recommendation/${!original_title ? original_name : original_title
                        }`}
                    >
                      <div className="  hover:scale-105 hover:transition hover:ease-in-out hover:delay-150  hover:m-2 ml-auto mr-auto  flex flex-col justify-center w-full h-full  sm:w-60  md:w-72 ">
                        <div className=" relative w-full h-[14rem] flex justify-center  ">
                          <img
                            className="w-full object-cover rounded-2xl  "
                            height={210}
                            src={`https://image.tmdb.org/t/p/w185${poster_path}`}
                            alt="loading..."
                          />
                          <div className="absolute bottom-5 w-full  ">
                            <div className="text-zinc-200 flex justify-evenly">
                              <span>{media_type}</span>
                              <span>
                                {!release_date ? first_air_date : release_date}
                              </span>
                              <span>{original_language}</span>
                            </div>
                            <div className="text-zinc-100 flex justify-center font-bold ">
                              <div>
                                {!original_title
                                  ? original_name
                                  : original_title}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              );
            })
          )}
        </section>
      </>
    );
  }
};

export default SecondComp;
