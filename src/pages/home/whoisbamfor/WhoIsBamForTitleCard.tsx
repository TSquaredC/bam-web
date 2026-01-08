import type { CSSProperties } from 'react';

type WhoIsBamForTitleCardProps = {
  scrollProgress?: number;
};

const WhoIsBamForTitleCard = ({ scrollProgress = 0 }: WhoIsBamForTitleCardProps) => {
  const clampedProgress = Math.min(Math.max(scrollProgress, 0), 1);
  const scaleProgress = clampedProgress * 0.5;

  return (
    <div style={{ height: '100vh' }}>
      <div
        className="sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden bg-[#BD0308] px-4 py-8 sm:px-6 md:px-8 lg:px-12"
        style={
          {
            '--title-progress': clampedProgress,
          } as CSSProperties
        }
      >
        {/* Background floating cards - Hidden on mobile/tablet */}
        <div className="pointer-events-none absolute inset-0">
          {/* top left */}
          <div
            className="absolute -left-20 top-0 h-24 w-[280px] xl:h-32 xl:w-[350px] rounded-b-xl bg-[#970206] shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * -500px)) translateY(calc(${clampedProgress} * -200px))`,
              opacity: Math.max(0, 1 - clampedProgress * 10),
            }}
          >
            <p className="text-2xl xl:text-3xl font-extrabold uppercase leading-tight xl:leading-10 tracking-tight text-[#2D0F10] pb-8 xl:pb-12 mr-3">
              ney starts with <br /> your portfolio.
            </p>
          </div>

          {/* top center */}
          <div
            className="absolute right-[30%] top-0 h-24 w-[500px] xl:h-32 xl:w-[650px] rounded-b-xl bg-[#970206] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateY(calc(${clampedProgress} * -300px)) scale(${
                1 - clampedProgress * 0.4
              })`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          >
            <p className="text-3xl xl:text-5xl font-extrabold uppercase leading-none tracking-tight text-white/90 pb-6 xl:pb-8">
              Connect quickly,
            </p>
          </div>

          {/* top right */}
          <div
            className="absolute -right-20 top-0 h-24 w-[320px] xl:h-32 xl:w-[400px] rounded-b-xl bg-[#970206] shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * 500px)) translateY(calc(${clampedProgress} * -200px))`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          />

          {/* mid left */}
          <div
            className="absolute left-0 top-[30%] h-[320px] w-[220px] xl:h-[400px] xl:w-[265px] rounded-r-xl bg-[#A9070B] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.2)] transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * -450px))`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          >
            <h1 className="text-3xl xl:text-4xl leading-none tracking-tight text-white/90">
              idea
              <span className="block text-[#2D0F10] mt-32 xl:mt-44">ct quickly, </span>
            </h1>
          </div>

          {/* bottom left */}
          <div
            className="absolute -left-20 bottom-0 h-24 w-[280px] xl:h-32 xl:w-[350px] rounded-t-xl bg-[#970206] shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * -500px)) translateY(calc(${clampedProgress} * 200px))`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          />

          {/* bottom right */}
          <div
            className="absolute -right-20 bottom-0 h-24 w-[280px] xl:h-32 xl:w-[350px] rounded-t-xl bg-[#970206] shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * 500px)) translateY(calc(${clampedProgress} * 200px))`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          />

          {/* mid right */}
          <div
            className="absolute right-0 top-[30%] h-80 w-[260px] xl:h-100 xl:w-[320px] rounded-l-xl bg-[#A9070B] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.2)] transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateX(calc(${clampedProgress} * 500px))`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          >
            <h1 className="text-3xl xl:text-4xl leading-none tracking-tight text-white/90 mt-20 xl:mt-28">
              The dream
              <span className="block text-[#2D0F10]">show your work </span>
            </h1>
          </div>

          {/* bottom center */}
          <div
            className="absolute right-[30%] bottom-0 h-24 w-[500px] xl:h-32 xl:w-[650px] rounded-t-xl bg-[#970206] p-4 shadow-[0_12px_28px_rgba(0,0,0,0.2)] flex items-end justify-end transition-all duration-[2500ms] ease-out"
            style={{
              transform: `translateY(calc(${clampedProgress} * 300px)) scale(${
                1 - clampedProgress * 0.5
              })`,
              opacity: Math.max(0, 1 - clampedProgress * 1.5),
            }}
          >
            <p className="text-3xl xl:text-5xl font-extrabold uppercase leading-none tracking-tight text-white/90 pb-6 xl:pb-8">
              Connect quickly,
            </p>
          </div>
        </div>

        {/* Main white card - Responsive positioning and sizing */}
        <div
          className="relative z-10 flex flex-col justify-between rounded-xl bg-white p-5 text-black w-[45vw] max-w-[300px] h-[150px] xs:w-[35vw] xs:max-w-[200px] xs:h-[200px] sm:w-[450px] sm:h-[280px] sm:p-7 md:max-w-[480px] md:h-[300px] lg:max-w-[500px] transition-all duration-[1500ms] ease-out"
          style={{
            transform: `scale(${1 + scaleProgress * 2})`,
            transformOrigin: 'center',
          }}
        >
          <h1 className="font-black uppercase leading-[1.05] tracking-[-0.02em] text-[1.5rem] xs:text-[2rem] sm:text-5xl md:text-6xl lg:text-[4rem]">
            WHO IS BAM
            <br />
            FOR?
          </h1>

          {/* Pagination dots - Responsive sizing */}
          <div className="flex justify-end gap-1 sm:gap-1.5">
            <span className="h-2 w-2 sm:h-5 sm:w-5 rounded-full bg-black" />
            <span className="h-2 w-2 sm:h-5 sm:w-5 rounded-full bg-black" />
            <span className="h-2 w-2 sm:h-5 sm:w-5 rounded-full bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoIsBamForTitleCard;
