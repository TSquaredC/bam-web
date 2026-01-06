import React from 'react';
import Home from './home/find/index';
import Navbar from './home/navbar';
import AboutIntro from './home/about/AboutIntro';
import AboutGallery from './home/about/AboutGallery';
import WhoIsBamFor from './home/whoisbamfor/WhoIsBamFor';
import GettingStarted from './home/getting-started/GettingStarted';
import WaitlistPerks from './home/waitlist/WaitlistPerks';
import FAQ from './home/faq/FAQ';
import Footer from './home/footer/Footer';

const Index = () => {
  return (
    <>
      <div className="min-h-80 bg-[#BD0308] p-2 sm:p-5">
        <div className="home-hero-bg relative isolate overflow-hidden min-h-screen bg-contain rounded-t-[24px] bg-cover bg-center bg-no-repeat">
          <div className="relative z-10 flex flex-col gap-6">
            <Navbar />
            <Home />
          </div>
        </div>
        <section className="dotted-bg py-32">
          <div className="w-full">
            <AboutIntro />
            <div id="about-gallery">
              <AboutGallery />
            </div>
          </div>
        </section>
        <WhoIsBamFor />
        <GettingStarted />
        <div className="dotted-bg rounded-b-3xl">
          <WaitlistPerks />
          <FAQ />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
