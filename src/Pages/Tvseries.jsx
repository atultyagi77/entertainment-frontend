import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setTvData, getTvDetails } from "../Redux/tvSeriesReducer";
import { bookmarksDetailsSendToDatabase } from "../Redux/bookMarks";
import axios from "axios";
import Spiner from "../components/spinerFolder/Spiner";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SearchIcon from "@mui/icons-material/Search";
import AOS from "aos";
import "aos/dist/aos.css";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Tvseries = () => {
  AOS.init();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  // get tvseries from store
  const tvSeries = useSelector((state) => state.addTvSeriesDetails.tvDetails);
  // console.log(tvSeries, "from tvseries component");
  useEffect(() => {
    document.title = "Tv Series"
    const getfunt = async () => {
      try {
        const options = {
          method: "GET",
          url: "https://api.themoviedb.org/3/trending/tv/day?language=en-US",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDA3MmZkYmY3ODkxMjUxYzM3MGVhNzk2ZTNjNjYyZiIsIm5iZiI6MTcyMDY5MTU3NC4yMDE1NjgsInN1YiI6IjY2OGZhOTEyOWNkZGU2M2I4M2I2MzE1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CXuLEFK_aYiPCLgS27OdIH-M3AXxZ6pSvk_whCSOovw",
          },
        };
        let tvSeriesData = await axios(options);
        if (tvSeriesData.status === 200) {
          // console.log(tvSeriesData.status);
          dispatch(setTvData(tvSeriesData.data.results));
        } else {
          console.log("some errro occured");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getfunt();
  }, [dispatch]);
  // get single tvseries full details
  const sendDataToSinglePage = (id) => {
    dispatch(getTvDetails(id));
  };

  // style for bookmark icon
  const styles = {
    widht: "30px",
    height: "30px",
  };
  // function for bookmark tv series
  const bookmarksTvSeries = (type, id) => {
    const cookie = Cookies.get("loginCookies");
    if (cookie) {
      // dispatch data to redux to bookmark tvseries
      dispatch(
        bookmarksDetailsSendToDatabase({
          data: { media_type: type, media_id: id },
        })
      );
      toast.success("bookmarked Successfully", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      alert("bookmarked Successfully");
    } else {
      navigate("/login");
    }
  };
  if (!tvSeries) {
    return <Spiner />;
  } else {
    // filter tvseries
    const filteredTvseries = tvSeries.filter((movie) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <>
        <div
          id="searchButton"
          className=" mb-3 relative top-20 mx-6 w-auto  md:ml-16 md:mr-10  "
        >
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
        <section
          data-aos="zoom-in-up"
          data-aos-easing="linear"
          data-aos-duration="1500"
          className="flex my-24  flex-wrap mx-16"
        >
          {filteredTvseries.length === 0 ? (
            <div className="text-center text-red-500 font-bold">
              No tv series found for your search query.
            </div>
          ) : (
            filteredTvseries.map((items) => {
              const {
                media_type,
                id,
                name,
                poster_path,
                origin_country,
                first_air_date,
              } = items;
              return (
                <>
                  <div
                    key={id}
                    className="my-3 mr-auto ml-auto w-full h-full  sm:w-60  md:w-72  items-center"
                  >
                    <Link
                      className=" flex "
                      onClick={() => sendDataToSinglePage(id)}
                      title={name}
                      to={`/tvseries/${name}`}
                    >
                      <div className="  hover:scale-105 hover:transition hover:ease-in-out hover:delay-150  hover:m-2 ml-auto mr-auto  flex flex-col justify-center w-full h-full  sm:w-60  md:w-72 ">
                        <div className=" relative w-full h-[14rem] flex justify-center  ">
                          <img
                            className="w-full object-cover rounded-2xl  "
                            height={210}
                            src={`https://image.tmdb.org/t/p/w185${poster_path}`}
                            alt=""
                          />
                          <div className="absolute bottom-5 w-full  ">
                            <div className="text-zinc-200 flex justify-evenly">
                              <span>{media_type}</span>
                              <span>{first_air_date}</span>
                              <span>{origin_country}</span>
                            </div>
                            <div className="text-zinc-100 flex justify-center font-bold ">
                              <div>{name}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div
                      onClick={() => bookmarksTvSeries(media_type, id)}
                      className="bg-black rounded-2xl mt-2 flex justify-center "
                    >
                      {
                        <button className="text-white rounded-3xl   ">
                          <BookmarkBorderIcon
                            style={styles}
                            className="  rounded-full pb-3 text-white ml-4 mt-3"
                          />
                          Bookmark
                        </button>
                      }
                    </div>
                  </div>
                </>
              );
            })
          )}
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
  }
};

export default Tvseries;
