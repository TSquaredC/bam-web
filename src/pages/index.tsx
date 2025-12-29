import React from 'react';
import Home from './home';
import Navbar from './home/navbar';

const index = () => {
  return (
    <div className="bg-[#BD0308]">
      <Navbar />
      <Home />
    </div>
  );
};

export default index;
