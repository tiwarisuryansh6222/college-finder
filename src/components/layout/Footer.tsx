import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-white pt-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* Col 1 */}
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary-600 rounded-[8px] flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <span className="font-display font-bold text-xl text-white tracking-tight">
              Edu<span className="text-primary-400">Finder</span>
            </span>
          </Link>
          <p className="text-neutral-400 text-sm leading-relaxed mb-4">
            India's most trusted college discovery platform. Find, compare, and apply to the best colleges across the country.
          </p>
          <p className="text-neutral-500 text-sm">© 2025 EduFinder</p>
        </div>

        {/* Col 2 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-3">
            <li><Link href="/colleges" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Colleges</Link></li>
            <li><Link href="/courses" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Courses</Link></li>
            <li><Link href="/careers" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Career Paths</Link></li>
            <li><Link href="/compare" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Compare Colleges</Link></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Streams</h3>
          <ul className="space-y-3">
            <li><Link href="/colleges?stream=Engineering" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Engineering</Link></li>
            <li><Link href="/colleges?stream=Management" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">MBA / Management</Link></li>
            <li><Link href="/colleges?stream=Medical" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Medical</Link></li>
            <li><Link href="/colleges?stream=Law" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Law</Link></li>
            <li><Link href="/colleges?stream=Design" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Design</Link></li>
            <li><Link href="/colleges?stream=Science" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Science</Link></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white">Support</h3>
          <ul className="space-y-3">
            <li><Link href="#" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">About Us</Link></li>
            <li><Link href="#" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Contact</Link></li>
            <li><Link href="#" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="text-sm text-neutral-400 hover:text-primary-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom thin bar */}
      <div className="bg-neutral-800 text-neutral-400 text-xs py-3 text-center border-t border-neutral-700">
        <p>Built for the AI Software Engineer Internship assignment. All data is mock data.</p>
      </div>
    </footer>
  );
}
