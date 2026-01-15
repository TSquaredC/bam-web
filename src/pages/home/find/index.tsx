import { comingSoonImg } from '../../../assets/images';
import Image from 'next/image';

const HomePage = () => {
  return (
    <section className="relative section-width mt-30">
      <div className="">
        <div className="space-y-3 sm:space-y-6 text-center text-white lg:text-left">
          <Image
            src={comingSoonImg}
            alt="Coming soon"
            width={200}
            height={200}
            className="mx-auto lg:mx-0 w-[120px] md:w-[200px]"
          />
          <div className="space-y-5">
            <h1 className="find-hero-title text-center lg:text-left text-[48px] lg:text-[96px]">
              <span className="block whitespace-nowrap">Find. Connect.</span>
              <span className="block text-[#F29B39]">Create.</span>
            </h1>
            <p className="find-hero-copy text-base lg:text-[24px] mx-auto max-w-2xl lg:mx-0">
              Bam is a collaboration-led platform for artists and the people who build with them.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 lg:justify-start">
            <button className="find-hero-cta cursor-pointer">Join Waitlist !!</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
