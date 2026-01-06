const WhoIsBamForTitleCard = ({ scrollProgress = 0 }) => {
  const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);

  // Slower progress for the scale animation
  const scaleProgress = clampedProgress * 0.5;

  return (
    <div style={{ height: '100vh' }}>
      <div
        className="sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-[#BD0308] px-8 py-12"
        style={{
          '--title-progress': clampedProgress,
        }}
      >
        {/* Background floating cards */}
        <div className="pointer-events-none absolute inset-0 hidden 2xl:block">
          {/* top left */}
          <div
            className="absolute -left-20 top-0 h-32 w-[350px] rounded-b-xl bg-[#970206] shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * -500px)) translateY(calc(${clampedProgress} * -200px))`,
              opacity: Math.max(0, 1 - clampedProgress * 10),
            }}
          >
            <p className="text-3xl font-extrabold uppercase leading-10 tracking-tight text-[#2D0F10] pb-12 mr-3">
              ney starts with <br /> your portfolio.
            </p>
          </div>

          {/* top center */}
          <div
            className="absolute right-[30%] top-0 h-32 w-[650px] rounded-b-xl bg-[#970206] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateY(calc(${clampedProgress} * -300px)) scale(${
                1 - clampedProgress * 0.4
              })`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          >
            <p className="text-5xl font-extrabold uppercase leading-none tracking-tight text-white/90 pb-8">
              Connect quickly,
            </p>
          </div>

          {/* top right */}
          <div
            className="absolute -right-20 top-0 h-32 w-[400px] rounded-b-xl bg-[#970206] shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * 500px)) translateY(calc(${clampedProgress} * -200px))`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          />

          {/* mid left */}
          <div
            className="absolute left-0 top-[30%] h-[400px] w-[265px] rounded-r-xl bg-[#A9070B] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.2)] transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * -450px))`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          >
            <h1 className="leading-none tracking-tight text-white/90">
              idea
              <span className="block text-[#2D0F10] mt-44">ct quickly, </span>
            </h1>
          </div>

          {/* bottom left */}
          <div
            className="absolute -left-20 bottom-0 h-32 w-[350px] rounded-t-xl bg-[#970206] shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * -500px)) translateY(calc(${clampedProgress} * 200px))`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          />

          {/* bottom right */}
          <div
            className="absolute -right-20 bottom-0 h-32 w-[350px] rounded-t-xl bg-[#970206] shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * 500px)) translateY(calc(${clampedProgress} * 200px))`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          />
        </div>

        {/* mid right */}
        <div
          className="absolute right-0 top-[30%] hidden h-100 w-[320px] rounded-l-xl bg-[#A9070B] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.2)] 2xl:block transition-all duration-[2500ms] ease-out"
          style={{
            transform: `translateX(calc(${clampedProgress} * 500px))`,
            opacity: Math.max(0, 1 - clampedProgress * 1.5),
          }}
        >
          <h1 className="leading-none tracking-tight text-white/90 mt-28">
            The dream
            <span className="block text-[#2D0F10]">show your work </span>
          </h1>
        </div>

        {/* bottom center */}
        <div
          className="absolute right-[30%] bottom-0 hidden h-32 w-162.5 rounded-t-xl bg-[#970206] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.2)] 2xl:flex 2xl:items-end 2xl:justify-end transition-all duration-[2500ms] ease-out"
          style={{
            transform: `translateY(calc(${clampedProgress} * 300px)) scale(${
              1 - clampedProgress * 0.5
            })`,
            opacity: Math.max(0, 1 - clampedProgress * 1.5),
          }}
        >
          <p className="text-5xl font-extrabold uppercase leading-none tracking-tight text-white/90 pb-8">
            Connect quickly,
          </p>
        </div>

        {/* Main white card - 2x zoom effect */}
        <div
          className="absolute md:right-[36%] top-[35%] h-75 w-[400px] sm:h-[280px] sm:w-[450px] z-10 flex flex-col justify-between rounded-xl bg-white p-7 text-black md:shadow-[0_24px_60px_rgba(0,0,0,0.35)] mr-4 transition-all duration-[1500ms] ease-out"
          style={{
            transform: `scale(${1 + scaleProgress * 2})`,
            transformOrigin: 'center',
          }}
        >
          <h1 className="font-black uppercase leading-[1.05] tracking-[-0.02em] text-4xl sm:text-6xl md:text-5xl">
            WHO IS BAM
            <br />
            FOR?
          </h1>

          {/* Pagination dots */}
          <div className="flex justify-end gap-1.5">
            <span className="h-5 w-5 rounded-full bg-black" />
            <span className="h-5 w-5 rounded-full bg-black" />
            <span className="h-5 w-5 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoIsBamForTitleCard;
