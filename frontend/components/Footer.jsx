import Link from 'next/link';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-dark-bg border-t border-dark-border mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-black text-accent-primary mb-4">SKILL SHIFT</h3>
            <p className="text-gray-400 text-sm">Shift Your Potential. Join the modern tech community.</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm">Platform</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/forum" className="hover:text-accent-primary transition">Forum</Link></li>
              <li><Link href="/resources" className="hover:text-accent-primary transition">Resources</Link></li>
              <li><Link href="/events" className="hover:text-accent-primary transition">Events</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm">Company</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-accent-primary transition">About</a></li>
              <li><a href="#" className="hover:text-accent-primary transition">Privacy</a></li>
              <li><a href="#" className="hover:text-accent-primary transition">Terms</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4 uppercase text-sm">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-accent-primary transition">
                <FiGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-primary transition">
                <FiTwitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-primary transition">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent-primary transition">
                <FiMail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-border pt-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2024 SKILL SHIFT. All rights reserved. | Shift Your Potential
          </p>
        </div>
      </div>
    </footer>
  );
}
