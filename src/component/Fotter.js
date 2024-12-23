import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MessageCircle, Heart, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Health Buddy
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering your journey to better health through personalized AI nutrition guidance.
            </p>
            <div className="pt-2">
              <button className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> in 2024
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Our Team', 'Careers', 'Privacy Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center text-gray-400 hover:text-white transition-colors">
                    <span className="mr-2 transform group-hover:translate-x-1 transition-transform">
                      <ExternalLink className="w-4 h-4" />
                    </span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <a href="mailto:info@example.com">info@example.com</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <a href="tel:(123) 456-7890">(123) 456-7890</a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
                <a href="mailto:support@example.com">support@example.com</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="flex gap-4">
              {[
                { icon: Twitter, label: 'Twitter' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Instagram, label: 'Instagram' }
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="group relative w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
            <p className="text-sm text-gray-400">
              Stay updated with our latest news and updates
            </p>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Health Buddy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;