import Image from 'next/image';
import { bamWhite } from '../../../assets/images';
import { FaXTwitter } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';
import { FaDribbble } from 'react-icons/fa';

const quickLinks = ['Browse Categories', 'How Bam Works', 'About Us', 'Contact', 'FAQ'];
const talentLinks = ['Create Your Profile', 'Showcase Work', 'Get Discovered'];
const businessLinks = ['Hire Experts', 'Explore Services', 'Collaborate Seamlessly'];
const mobileLinks = [
  'For Talents',
  'For Gigs',
  'How Bam Works',
  'About Us',
  'FAQ',
  'Media kit',
  'Contact',
];
const socials = [
  { label: 'X', href: '#', Icon: FaXTwitter },
  { label: 'LinkedIn', href: '#', Icon: FaLinkedin },
  { label: 'Facebook', href: '#', Icon: FaFacebook },
  { label: 'Dribbble', href: '#', Icon: FaDribbble },
];

const Footer = () => {
  return (
    <footer className="bg-[#BD0308] text-white">
      <div className="2xl:max-w-screen-2xl md:w-11/12 mx-auto max-md:mx-3 items-center py-12 sm:py-16">
        <div className="flex flex-col gap-4 sm:gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-28">
            <Image src={bamWhite} alt="Bam logo" className="h-16 w-24 sm:h-20 sm:w-32" />

            <div className="hidden grid gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <p className="text-base font-bold uppercase text-white/80">Quick Links</p>
                <ul className="space-y-1 text-xs text-white/80 font-normal">
                  {quickLinks.map((link) => (
                    <li key={link}>
                      <a className="hover:text-white" href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-base font-bold uppercase text-white/80">For Talents</p>
                <ul className="space-y-1 text-xs text-white/80">
                  {talentLinks.map((link) => (
                    <li key={link}>
                      <a className="hover:text-white" href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <p className="text-base font-bold uppercase text-white/80">For Businesses</p>
                <ul className="space-y-1 text-xs text-white/80">
                  {businessLinks.map((link) => (
                    <li key={link}>
                      <a className="hover:text-white" href="#">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-left lg:text-right">
            <p className="text-base font-bold uppercase leading-relaxed text-white/80">
              Find trusted talent. Find real gigs.
              <br />
              Build without chaos.
            </p>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-[10px] bg-[#1E1E1E] px-5 py-2 text-sm font-semibold text-white cursor-pointer"
            >
              Join the Waitlist
            </button>
          </div>
        </div>

        <div className="mt-10 space-y-4 sm:hidden">
          <p className="text-base font-bold uppercase tracking-[0.2em] text-white/80">
            Quick Links
          </p>
          <ul className="space-y-3 text-base text-white/80">
            {mobileLinks.map((link) => (
              <li key={link}>
                <a className="hover:text-white" href="#">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border-t border-white/25 pt-6">
          <div className="flex flex-col items-center gap-4 text-center text-base text-white sm:flex-row sm:justify-between sm:text-left">
            <span className="order-2 sm:order-1">© 2025 BAM. All rights reserved.</span>
            <div className="order-1 flex items-center gap-3 sm:order-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-8 w-8 items-center justify-center  text-white"
                >
                  <social.Icon className="text-3xl" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
