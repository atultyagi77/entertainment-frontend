import React from 'react'
import "./spiner.css" // import spinner css 
const Spiner = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="flex flex-col justify-center items-center">
          <div className="loader"></div>
          <div className="flex text-4xl text-white mt-4">
            Loading...
          </div>
        </div>
      </div>
    </>
  )
}

export default Spiner