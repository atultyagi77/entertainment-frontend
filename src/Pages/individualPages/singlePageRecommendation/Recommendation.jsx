import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Spiner from '../../../components/spinerFolder/Spiner'
import AOS from 'aos';
import 'aos/dist/aos.css';
const Recommendation = () => {
  // Initialize Animation library
  AOS.init();

  // Set document title when the component mounts
  useEffect(() => {
    document.title = `Recommendation Details Page`
  }, [])

  // Get recommendation details from Redux store
  const allDetails = useSelector((state) => state.addMoviesDetails.recommendation)
  
   // Check if recommendation details are not available, display a spinner
  if (allDetails === null || !allDetails) {
    return (
      <Spiner />
    )
  } else {
    // Destructure required recommendation details
    const { genres, name, original_title, poster_path, release_date, spoken_languages, status, vote_count,
      first_air_date, overview, popularity
    } = allDetails
    // console.log(allDetails)

    return (
      <>
        <section className="text-gray-600 body-font overflow-hidden">
          <div data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500" className="container px-5 py-24 mx-auto">
            <div className="lg:w-4/5 mx-auto flex flex-wrap">
              <img alt="loading..." title={original_title ? original_title : name} className="lg:w-1/2 w-full lg:h-full h-64 object-cover object-center rounded" src={`https://image.tmdb.org/t/p/w185${poster_path}`} />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-white text-3xl title-font font-medium mb-1">{original_title ? original_title : name}</h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-indigo-500" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                    <span className="text-gray-600 ml-3">{vote_count} Reviews</span>
                  </span>

                </div>
                <div className='flex  justify-between ' >
                  <div>
                    <span>Popularity</span>
                    <div className='text-zinc-200' > {popularity}</div>
                  </div>
                  <div>
                    <span>Language</span>
                    {spoken_languages.map((language, index) => {
                      return (
                        <div className='text-zinc-200' key={index} >{language.english_name}</div>
                      )

                    })}
                  </div>
                  <div>
                    <span>Year</span>
                    <div className='text-zinc-200' >{!release_date ? first_air_date : release_date}</div>
                  </div>
                  <div>
                    <span>Status</span>
                    <div className='text-zinc-200' >{status}</div>
                  </div>
                </div>
                <div>
                  <div className='mb-2 text-xl ' >
                    Genres
                  </div>
                  <div className='flex flex-wrap' >
                    {
                      !genres ? <span >loading...</span> : genres.map((gerne, index) => {
                        return (
                          <span key={index} className='rounded-2xl font-medium bg-zinc-300 mb-3 mx-2 px-2 py-1 '>
                            {gerne.name}
                          </span>
                        )
                      })
                    } </div>
                </div>
                <div className='text-xl my-2'>
                  Synopsis
                </div>
                <p className="leading-relaxed text-zinc-200 ">{overview}</p>

                <div className="flex">

                  <button className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Website</button>
                  <button className="flex ml-3 text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">
                    IMDB
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default Recommendation