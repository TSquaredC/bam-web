import { IoMicOutline, IoSend } from 'react-icons/io5';

const faqChips = [
  'Who can use Bam?',
  'How do gigs and listings work?',
  'Is Bam only for film and entertainment?',
  'Is Bam free to use?',
];

const FAQ = () => {
  return (
    <section className=" py-20 text-white sm:py-28 mt-40  sm:mt-60 xl:mt-80">
      <div className="section-width 2xl:max-w-screen-2xl md:w-11/12 mx-auto max-md:mx-3 items-center">
        <div className="rounded-3xl bg-white p-2 sm:p-4">
          <div className=" bg-[#111111] px-2 pb-4 sm:px-12 sm:pb-16 rounded-xl sm:rounded-3xl">
            <div className="mx-auto max-w-3xl text-center py-24 sm:py-32">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight sm:text-[42px]">
                FAQ's
              </h2>
              <p className="mt-2 text-[32px] font-semibold text-[#BD0308] sm:text-2xl max-w-xs sm:max-w-3xl mx-auto">
                Got Questions? We've Got Answers.
              </p>
            </div>

            <div className="sm:mt-10 flex flex-wrap justify-center gap-3 text-xs font-medium text-[#A1A2A3] sm:text-sm">
              {faqChips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-sm sm:rounded-lg bg-[#1E1E1E] px-2 py-1 sm:px-4 sm:py-2 "
                >
                  {chip}
                </span>
              ))}
            </div>

            <div className=" mt-6 flex w-full items-center gap-3 rounded-md sm:rounded-xl bg-[#1a1a1a] py-2 px-3 sm:px-6 sm:py-4">
              <span className="flex-1 text-xs text-white sm:text-base font-normal">
                Do I need an account to browse Bam?
              </span>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center  text-white sm:h-11 sm:w-11"
              >
                <IoMicOutline className="h-5 w-5 sm:h-8 sm:w-8" />
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#BD0308] text-white sm:h-11 sm:w-11"
              >
                <IoSend className="h-4 w-4 sm:h-6 sm:w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
