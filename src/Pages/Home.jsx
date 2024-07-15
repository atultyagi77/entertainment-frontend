import React, { useEffect } from 'react'
import SecondComp from './homeComponents/SecondComp'

const Home = () => {
  // Set document title when the component mounts
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <>
      {/* Render the SecondComp component */}
      <SecondComp />
    </>
  )
}

export default Home