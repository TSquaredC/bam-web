import React from 'react';
import { RedBam as bamLogo } from '../../../assets/images';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="relative z-20 section-width pt-5 md:pt-10 lg:pt-10">
      <div className=" flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src={bamLogo} alt="Bam logo" className="h-10 w-auto" />
        </div>

        <button className="rounded-[12px] bg-white px-5 py-2 text-xs font-[500] text-black cursor-pointer">
          Coming Soon
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
