import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { bookmarksDetailsMovies } from '../../Redux/bookMarks';
import Spiner from '../../components/spinerFolder/Spiner';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import SearchIcon from '@mui/icons-material/Search';
import AOS from 'aos';
import 'aos/dist/aos.css';


const BMovies = () => {
  AOS.init();
  const dispatch = useDispatch()
  const [searchQuery, setSearchQuery] = useState('');
  // get bookmarkedmovies from store
  const bookmarksMovies = useSelector((state) => state.bookmarkDetails.bookmarksDataMovies)
  useEffect(() => {
    const bookmarkMoviesData = async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://api.themoviedb.org/3/account/21026937/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc',
          headers: {
            accept: 'application/json',
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDA3MmZkYmY3ODkxMjUxYzM3MGVhNzk2ZTNjNjYyZiIsIm5iZiI6MTcyMDY5MTU3NC4yMDE1NjgsInN1YiI6IjY2OGZhOTEyOWNkZGU2M2I4M2I2MzE1YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CXuLEFK_aYiPCLgS27OdIH-M3AXxZ6pSvk_whCSOovw"
          }
        };
        const fetchBookmarkedMovies = await axios(options)
        // if data found in bookmarks 
        if (fetchBookmarkedMovies.status === 200) {
          // send data to store
          // dispatch function to store in store
          dispatch(bookmarksDetailsMovies(fetchBookmarkedMovies.data.results))
        }
      } catch (error) {
        console.log(error)
      }
    }
    bookmarkMoviesData();

  }, [dispatch])
  // show spiner until full data not load 
  if (!bookmarksMovies || bookmarksMovies === undefined) {
    return (
      //show spiner until data is loading...
      <Spiner />
    )
    // check bookmarksMovies is avaliable or not
  } else if (bookmarksMovies.length === 0 || !Array.isArray(bookmarksMovies)) {
    return (
      <div>
        You don't have any bookmaked movies
      </div>
    )
  } else {

    // find movie on user information or search movie
    const filteredMovies = bookmarksMovies.filter(movie =>
      movie.original_title.toLowerCase().includes(searchQuery.toLowerCase())
    );
   
    return (
      <>
        <div id='searchButton' className=" mb-3 relative top-20 mx-6 w-auto  md:ml-16 md:mr-10  ">
          <div className='absolute left-2 top-[0.35rem]' >
            <SearchIcon />
          </div>
          <input value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} type="text" className='px-10  hover:border-2 w-full
        border-blue-800
        hover:border-blue-700 py-2 rounded-2xl ' />
        </div>
        <div className="flex justify-center ">
          <h1 className='text-zinc-200 text-2xl mt-[100px]' >Bookmarked Movies
          </h1></div>
        <section data-aos="zoom-in-up" data-aos-easing="linear"
          data-aos-duration="1500" className='flex my-12 flex-wrap mx-16' >
            {/* iterate over the all bookmarked */}
          {filteredMovies.map((items) => {
            const { media_type, id, original_title, poster_path, original_language, release_date } = items

            return (
              <>

                <div key={id} className='  my-3 mr-auto ml-auto w-full h-full  sm:w-60  md:w-72  items-center' >

                  <div className=' hover:scale-105 hover:transition hover:ease-in-out hover:delay-150  hover:m-2 ml-auto mr-auto  flex flex-col justify-center w-full h-full  sm:w-60  md:w-72 ' >

                    <div className=' relative w-full h-[14rem] flex justify-center  ' >

                      <img className='w-full object-cover rounded-2xl  ' height={210} src={`https://image.tmdb.org/t/p/w185${poster_path}`} alt="" />
                      <div className='text-white absolute top-3 right-60' >
                        <BookmarkIcon />
                      </div>
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
                  {/* <div onClick = {()=>removeBookmarkMovies(media_type ,id)} className='bg-black rounded-2xl m-2 p-1 flex justify-center ' >
      {
        <button className='text-white rounded-lg   ' >
       Remove Bookmark
        </button>
        }

   </div> */}
                </div>
              </>
            )
          })}


        </section>
      </>
    )
  }


}

export default BMovies