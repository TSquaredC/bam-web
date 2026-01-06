import Image from 'next/image';
import scroll1 from '../../../assets/images/home/scroll1.jpg';
import scroll2 from '../../../assets/images/home/scroll2.jpg';

const galleryImages = [
  {
    src: scroll1,
    alt: 'Studio session',
    className: '-rotate-6 translate-y-1 md:-rotate-10 md:translate-y-60 right-28',
  },
  {
    src: scroll2,
    alt: 'Live performance',
    className: '-rotate-10 translate-y-8 md:translate-y-36 right-6 md:right-16',
  },
  {
    src: scroll1,
    alt: 'On stage',
    className: 'translate-y-2 md:translate-y-24',
  },
  {
    src: scroll2,
    alt: 'Camera rig',
    className: 'rotate-10 translate-y-8 md:translate-y-36 left-6  md:left-16',
  },
  {
    src: scroll1,
    alt: 'Backstage',
    className: 'rotate-6 translate-y-10 md:rotate-10 md:translate-y-60 left-28',
  },
];

const AboutGallery = () => {
  return (
    <div className="mt-16 w-full overflow-hidden sm:pb-28 mt-40 sm:mt-72">
      <div className="flex w-full items-center justify-center gap-6 sm:gap-8 pb-32">
        {galleryImages.map((image) => (
          <div
            key={image.alt}
            className={`relative aspect-[4/3] shrink-0 overflow-hidden border border-white/10 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.85)] w-[220px] md:w-[260px] lg:w-[380px] ${image.className}`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" priority />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutGallery;
