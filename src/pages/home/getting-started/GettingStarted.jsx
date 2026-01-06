const steps = [
  {
    title: 'Explore freely',
    description: 'Browse vetted talent & services. No login required.',
    offset: 'md:ml-0',
  },
  {
    title: 'Find your match',
    description: 'Check skills, portfolios, experience, and reviews.',
    offset: 'md:ml-[20vw]',
  },
  {
    title: 'Get in Touch',
    description: 'Connect directly. Zero friction.',
    offset: 'md:ml-[40vw]',
  },
  {
    title: 'Make It Happen!',
    description: 'Collaborate. Create. Ship.',
    offset: 'md:ml-[70vw]',
    accent: true,
  },
];

const GettingStarted = () => {
  return (
    <section className="dotted-bg relative overflow-hidden text-white">
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 border-x border-[#BD0308]/70" />
      <div className="relative section-width py-0 pt-12 md:py-32">
        <div className="md:px-6">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase text-[#BD0308] md:text-xl">Hang on...</p>
            <h2 className="mt-4 text-4xl font-extrabold uppercase leading-[0.9] tracking-tight md:text-6xl xl:text-[82px]">
              Getting Started Is Easy.
            </h2>
          </div>
        </div>
      </div>

      <div className="mt-12 w-screen border-y border-[#BD0308]/70 divide-y divide-[#BD0308]/70 mx-[calc(50%-50vw)]">
        {steps.map((step) => {
          const hoverBg = step.accent ? 'hover:bg-white' : 'hover:bg-[#BD0308]';
          return (
            <div
              key={step.title}
              className={`group transition-colors duration-300 ease-out ${hoverBg}`}
            >
              <div className="section-width px-3 md:px-6 py-8 md:py-10">
                <div className="flex">
                  <div className={`ml-0 max-w-md text-left ${step.offset}`}>
                    <h3
                      className={`text-lg font-bold md:text-xl ${
                        step.accent ? 'text-[#BD0308]' : 'text-white group-hover:text-white'
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`mt-2 text-sm font-normal ${
                        step.accent
                          ? 'text-[#E1E3EB] group-hover:text-black/60'
                          : 'text-[#E1E3EB] group-hover:text-white/90'
                      }`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default GettingStarted;
