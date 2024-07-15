import React, { useEffect } from 'react';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'; //import icon

const PageNotFound = () => {
  useEffect(() => {
    document.title = "Page Not Found";
  }, []);

  return (
    <div className='flex h-[90vh]'>
      <div className="relative flex justify-center items-center h-full w-full">
        <div className='rounded-[2rem] bg-[#161D2F]'>
          <div className='rounded-[4rem]'>
            <div className='bg-[#2f3e63] rounded-[5rem] flex justify-center items-center' style={{ width: 200, height: 200 }}>
              {/* Icon of Page not found */}
              <ErrorOutlineIcon style={{ fontSize: 200, color: '#4c51bf' }} />
            </div>
          </div>
        </div>
        <div className='absolute'>
          <h2 className='text-2xl text-indigo-700 font-bold'>Sorry, Page Not Found</h2>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
