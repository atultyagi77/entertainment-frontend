import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import { setMovieData } from '../Redux/allMovieReducer';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SearchIcon from '@mui/icons-material/Search';
import { getMovieDetails } from '../Redux/allMovieReducer';
import { useSelector, useDispatch } from 'react-redux'
import Spiner from '../components/spinerFolder/Spiner';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { bookmarksDetailsSendToDatabase } from "../Redux/bookMarks"
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Movies = () => {
  AOS.init();

  // Initialize Redux dispatch
  const dispatch = useDispatch();

  // Initialize React Router navigate functions
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // get movies from redux store and bookmarkresponse
  const movie = useSelector(state => state.addMoviesDetails)
  const bookmarkResponse = useSelector(state => state.bookmarkDetails.bookmarkApiCallingResponse)
  const mDetails = movie.details

  // get trending movies from API and update Redux store
  useEffect(() => {
    document.title = "Movies";

    const getMoviesAndTvseries = async () => {
      // try and catch block to handle erros
      try {
        const options = {
          url: 'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDA3MmZkYmY3ODkxMjUxYzM3MGVhNzk2ZTNjNjYyZiIsIm5iZiI6MTcyMDY5MTU3NC4yMDE1NjgsInN1YiI6IjY2OGZhOTEyOWNkZGU2M2I4M2I2MzE1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CXuLEFK_aYiPCLgS27OdIH-M3AXxZ6pSvk_whCSOovw"
          }
        }

        let moviesData = await axios(options)
        if (moviesData.status === 200) {
          dispatch(setMovieData(moviesData.data.results))
        }
      } catch (error) {
        console.log(error)
      }
    }
    getMoviesAndTvseries()

  }, [dispatch])
  
  // dispatch function to send specific movie details
  const sendDataToSinglePage = (id) => {
    dispatch(getMovieDetails(id))
  }

  // function when user click on bookmark
  const bookmarkMovies = (type, id) => {
    const cookie = Cookies.get("loginCookies")

    if (cookie) {
      // console.log(cookie)
      dispatch(bookmarksDetailsSendToDatabase({ data: { media_type: type, media_id: id } }))
      // console.log("bookmarked")
      if (bookmarkResponse.success) {
        toast.success(bookmarkResponse.status_message, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",

        });
        // alert(bookmarkResponse.status_message);
      }
    } else {
      navigate("/login")
    }
  }
  const styles = {
    widht: "30px",
    height: "30px"
  }
  if (!mDetails) {
    return (
      <Spiner />
    )
  }
  else {
    // search movie using title
    const filteredMovies = mDetails.filter(movie =>
      movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
        <div id='searchButton' className=" mb-3 relative top-20 mx-6 w-auto  md:ml-16 md:mr-10  ">
          <div className='absolute left-2 top-[0.35rem]' >
            <SearchIcon />
          </div>
          <input value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} type="text" className='px-10  hover:border-2 w-full
        border-blue-800
        hover:border-blue-700 py-2 rounded-2xl ' />
        </div>
        {/* const {adult ,id , original_title , poster_path ,backdrop_path , release_date} = items */}
        <section data-aos="zoom-in-up" data-aos-easing="linear"
          data-aos-duration="1500" className='flex my-24  flex-wrap mx-16' >
          {filteredMovies.length === 0 ? (
            <div className="text-center text-red-500 font-bold">
              No movies found for your search query.
            </div>
          ) : (
            filteredMovies.map((items) => {
              const { media_type, id, original_title, poster_path, original_language, release_date } = items
              return (
                <>
                  <div key={id} className='my-3 mr-auto ml-auto w-full h-full  sm:w-60  md:w-72  items-center' >
                    <Link className=' flex ' onClick={() => sendDataToSinglePage(id)} title={original_title} to={`/movie/${original_title}`} >

                      <div className='  hover:scale-105 hover:transition hover:ease-in-out hover:delay-150  hover:m-2 ml-auto mr-auto  flex flex-col justify-center w-full h-full  sm:w-60  md:w-72 ' >

                        <div className=' relative w-full h-[14rem] flex justify-center  ' >
                          <img className='w-full object-cover rounded-2xl  ' height={210} src={`https://image.tmdb.org/t/p/w185${poster_path}`} alt="" />
                          <div className='absolute bottom-5 w-full  ' >
                            <div className='text-zinc-200 flex justify-evenly' >
                              <span>{media_type}</span>
                              <span>{release_date}</span>
                              <span>{original_language}</span>
                            </div>
                            <div className='text-zinc-100 flex justify-center font-bold ' >
                              <div>{original_title}</div></div>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div onClick={() => bookmarkMovies(media_type, id)} className='bg-black rounded-2xl mt-2 flex justify-center ' >
                      {
                        <button className='text-white rounded-3xl   ' >
                          <BookmarkBorderIcon style={styles} className='  rounded-full pb-3 text-white ml-4 mt-3' />Bookmark
                        </button>
                      }



                    </div>
                  </div>
                </>
              )
            }))}


        </section>

      </>
    )
  }
}

export default Movies