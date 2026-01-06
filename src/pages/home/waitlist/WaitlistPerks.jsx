import { useState } from 'react';
import Image from 'next/image';
import waitlistBg from '../../../assets/images/home/waitlist.png';
import waitlistsmall from '../../../assets/images/home/waitlistsmall.png';

const WaitlistPerks = () => {
  const [activeTab, setActiveTab] = useState('talent');

  return (
    <section className="dotted-bg relative py-20 text-white sm:py-28 ">
      <div className="pointer-events-none absolute inset-x-0 top-80 section-width flex lg:hidden mt-[340px] sm:mt-[400px] md:mt-[450px]">
        <Image
          src={waitlistsmall}
          alt="waitlistsmall"
          width={2000}
          height={1000}
          className="max-h-96 bg-no-repeat"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 md:top-80 section-width pb-20 lg:mt-0 md:flex hidden">
        <Image src={waitlistBg} alt="waitlistBg" width={2000} height={1000} className="" />
      </div>

      <div className="section-width relative z-10">
        <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-xl">
            <p className="text-xs font-medium uppercase text-[#BD0308] sm:text-xl hidden md:block">
              Join the waitlist
            </p>
            <h2 className="mt-4 text-4xl font-black uppercase leading-[0.85] tracking-tight sm:text-5xl xl:text-[82px]">
              Early Access
              <br />
              Perks
            </h2>
          </div>

          <div className="relative lg:w-[90%]">
            <div className="inline-flex overflow-hidden rounded-t-lg border-none bg-[#101010]">
              <button
                type="button"
                onClick={() => setActiveTab('talent')}
                className={`px-4 py-2 text-xs font-semibold tracking-[0.1em] transition ${
                  activeTab === 'talent'
                    ? 'bg-[#BD0308] text-white'
                    : 'bg-[#1a1a1a] text-white/70 hover:text-white'
                }`}
              >
                For Talent
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 text-xs font-semibold tracking-[0.1em] transition ${
                  activeTab === 'users'
                    ? 'bg-[#BD0308] text-white'
                    : 'bg-[#1a1a1a] text-white/70 hover:text-white'
                }`}
              >
                For Users
              </button>
            </div>

            <div className="relative z-10 rounded-b-xl rounded-tr-xl border border-white/15 bg-[#1a1a1a] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.55)] sm:p-8">
              <form className="space-y-6">
                <label className="block text-base text-white">
                  Name
                  <input
                    type="text"
                    placeholder=""
                    className=" w-full border-b border-white bg-transparent text-base text-white outline-none placeholder:text-white"
                  />
                </label>

                <label className="block text-base text-white">
                  Phone
                  <input
                    type="text"
                    placeholder=""
                    className=" w-full border-b border-white bg-transparent text-base text-white outline-none placeholder:text-white"
                  />
                </label>

                <label className="block text-base text-white">
                  Email
                  <input
                    type="text"
                    placeholder=""
                    className=" w-full border-b border-white bg-transparent text-base text-white outline-none placeholder:text-white"
                  />
                </label>

                <label className="block text-base text-white">
                  Category
                  <div className=" flex items-center border-b border-white pb-2">
                    <select
                      className="w-full appearance-none bg-transparent text-sm text-white outline-none"
                      defaultValue=""
                    >
                      <option value="artist">Artist</option>
                      <option value="producer">Producer</option>
                      <option value="brand">Brand</option>
                      <option value="fan">Fan</option>
                    </select>
                    <span className="ml-2 text-white/60" aria-hidden>
                      v
                    </span>
                  </div>
                </label>

                <label className="block text-base text-white">
                  Send message
                  <textarea
                    rows={1}
                    className=" w-full resize-none border-b border-white bg-transparent text-base text-white outline-none placeholder:text-white/40 focus:border-white/60"
                  />
                </label>

                <button
                  type="button"
                  className="mt-2 w-full rounded-xl border-2 border-white bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_6px_0_rgba(189,3,8,0.9)] transition"
                >
                  Join Waitlist !!
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistPerks;
