import Link from 'next/link';
import Image from 'next/image';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-black border-t-2 border-gray-700 mt-32">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image src="/SS.png" alt="Skill Shift Logo" width={120} height={40} className="mb-6 object-contain" />
            <p className="text-gray-400 text-base font-medium">Shift Your Potential. Join the modern tech community.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-black mb-6 uppercase text-sm tracking-wider text-white">Platform</h4>
            <ul className="space-y-3 text-base text-gray-400">
              <li><Link href="/forum" className="hover:text-white transition-colors font-medium">Forum</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors font-medium">Resources</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors font-medium">Events</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-black mb-6 uppercase text-sm tracking-wider text-white">Company</h4>
            <ul className="space-y-3 text-base text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors font-medium">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-medium">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors font-medium">Terms</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-black mb-6 uppercase text-sm tracking-wider text-white">Connect</h4>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 border-2 border-gray-700 hover:border-gray-600 border-sharp">
                <FiGithub size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 border-2 border-gray-700 hover:border-gray-600 border-sharp">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 border-2 border-gray-700 hover:border-gray-600 border-sharp">
                <FiLinkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors p-2 border-2 border-gray-700 hover:border-gray-600 border-sharp">
                <FiMail size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-gray-700 pt-12">
          <p className="text-center text-gray-500 text-sm font-bold uppercase tracking-wide">
            &copy; 2024 SKILL SHIFT. All rights reserved. | Shift Your Potential
          </p>
        </div>
      </div>
    </footer>
  );
}
