import React from 'react';
import { whoisbam1, whoisbam2, whoisbam3, whoisbam4, whoisbam5 } from '../../../assets/images';
import Image from 'next/image';
import { BiSolidBadgeCheck } from 'react-icons/bi';
import { FiPlus } from 'react-icons/fi';

const WhoIsBamForPortfolioCard = () => {
  return (
    <section className="relative flex min-h-screen w-screen shrink-0 flex-col justify-center bg-[#BD0308] px-4 text-white sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-xl">
        <div className="flex h-[200px] gap-2 sm:h-[360px] sm:gap-4 md:h-[460px] lg:h-[520px]">
          {/* Left Side - Main Profile Card */}
          <div className="relative flex h-full min-w-0 flex-[0.8] flex-col overflow-hidden rounded-md sm:rounded-xl xl:min-w-[280px]">
            {/* Background Image */}
            <Image
              src={whoisbam1}
              alt="Creator portfolio preview"
              fill
              className="object-cover"
              priority
            />

            {/* Bottom Glass Card */}
            <div className="relative mt-auto flex flex-col items-center justify-center rounded-t-xl bg-black/50 px-1 py-2 sm:px-5 sm:py-5 text-center backdrop-blur-xl sm:px-8 sm:py-8">
              <p className="text-xs font-extrabold text-white xl:text-[36px]">Laila Ramesh</p>
              <p className="mt-1 text-[10px] text-white/70 xl:text-[18px] font-medium flex justify-center items-center gap-2 ">
                <BiSolidBadgeCheck className="text-[#7A9CF3]" />
                Cinematographer | <span className="font-bold">9.5/10</span>
              </p>

              <div className="mt-2 xl:mt-4 flex items-center justify-center gap-3 sm:mt-5">
                <button className="rounded-md sm:rounded-xl bg-[#444649] px-2 py-1 sm:py-3 text-[8px] font-bold text-white backdrop-blur sm:px-10 sm:text-base">
                  Follow
                </button>
                <button className="rounded-md sm:rounded-xl bg-[#BD0308] px-2 py-1 sm:py-3 text-[8px] font-bold text-white sm:px-10 sm:text-base flex items-center gap-2">
                  <FiPlus size={18} />
                  Interest
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Image Gallery */}
          <div className="flex h-full min-w-0 flex-1 flex-col gap-2 sm:gap-4 sm:min-w-[280px]">
            {/* Top Row */}
            <div className="flex flex-1 gap-2 sm:gap-4">
              <div className="flex-1 overflow-hidden rounded-md sm:rounded-xl">
                <Image
                  src={whoisbam2}
                  alt="Portfolio scene"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 overflow-hidden rounded-md sm:rounded-xl">
                <Image src={whoisbam3} alt="Studio moment" className="h-full w-full object-cover" />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex flex-1 gap-2 sm:gap-4">
              <div className="flex-[0.5] overflow-hidden rounded-md sm:rounded-xl">
                <Image
                  src={whoisbam4}
                  alt="Creative detail"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-[1.5] overflow-hidden rounded-md sm:rounded-xl">
                <Image
                  src={whoisbam5}
                  alt="Behind the scenes"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <p className="bam-connect-copy mt-3">
          Skip the fluff, Keep it real. Your journey starts with your portfolio.
        </p>
      </div>
    </section>
  );
};

export default WhoIsBamForPortfolioCard;
