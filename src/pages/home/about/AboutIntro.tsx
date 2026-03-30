import ScrollReveal from './ScrollReveal';

const AboutIntro = () => {
  return (
    <div className="mx-auto max-w-sm sm:max-w-4xl text-center text-white">
      <p className="text-lg md:text-base font-semibold uppercase tracking-[0.35em] text-[#BD0308] font-[500]">
        About
      </p>
      <ScrollReveal
        baseRotation={0}
        containerClassName="about-intro-title mt-5 text-[32px] md:text-[48px] text-center "
      >
        <span className="text-[#BD0308]">BAM</span> is where emerging media & entertainment talent
        gets discovered, hired, and trusted - without agents, noise, or endless DMs.
      </ScrollReveal>
    </div>
  );
};

export default AboutIntro;
