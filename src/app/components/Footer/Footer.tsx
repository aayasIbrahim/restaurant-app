"use client";

import { Facebook, Instagram, Twitter, Github } from "lucide-react";
import Logo from "../UI/Logo";

type LinkSection = {
  title: string;
  links: { label: string; href: string }[];
};

const linkSections: LinkSection[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Catering", href: "#" },
      { label: "Food Delivery", href: "#" },
      { label: "Private Events", href: "#" },
      { label: "SEO Optimization", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "Github" },
];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 text-gray-100">
      <div className="max-w-7xl px-6 py-14 mx-auto">
        <div className="grid gap-12 md:grid-cols-4 sm:grid-cols-2">
          {/* Brand / About Section */}
          <div>
            <Logo />
            <p className="mt-4 text-sm text-pink-100/80 leading-relaxed max-w-xs">
              Explore the art of gastronomy in every bite, where passion for
              culinary excellence meets innovation.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <a
                    key={idx}
                    href={item.href}
                    aria-label={item.label}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shadow-md"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Other Sections */}
          {linkSections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-lg font-semibold text-white border-l-4 border-white pl-2">
                {section.title}
              </h2>
              <ul className="mt-5 space-y-3 text-sm">
                {section.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="hover:text-white hover:underline underline-offset-4 transition-all"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 border-t border-pink-300/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-pink-100/80">
            © {new Date().getFullYear()} Uriford International Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white hover:underline underline-offset-4">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white hover:underline underline-offset-4">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
