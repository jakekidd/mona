import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-charcoal/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl text-charcoal mb-4">
              Mona Empire
            </h3>
            <p className="font-body text-sm text-charcoal-muted max-w-sm leading-relaxed">
              Luxurious lip glosses crafted with care. We believe in the power 
              of a perfect shade to transform how you feel.
            </p>
            
            {/* Email Signup */}
            <div className="mt-8">
              <p className="font-body text-sm text-charcoal mb-3">
                Join the empire
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-charcoal/20 rounded-sm font-body text-sm text-charcoal placeholder:text-charcoal-muted focus:outline-none focus:border-rose-deep transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-charcoal text-white font-body text-sm tracking-wide rounded-sm hover:bg-charcoal-light transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-display text-sm text-charcoal mb-4 uppercase tracking-wider">
              Shop
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="#bestsellers" 
                  className="font-body text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link 
                  href="#shop" 
                  className="font-body text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  href="#finder" 
                  className="font-body text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  Shade Finder
                </Link>
              </li>
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h4 className="font-display text-sm text-charcoal mb-4 uppercase tracking-wider">
              Info
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/shipping" 
                  className="font-body text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link 
                  href="/returns" 
                  className="font-body text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="font-body text-sm text-charcoal-muted hover:text-charcoal transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-charcoal/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-charcoal-muted">
            &copy; {new Date().getFullYear()} Mona Empire. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-muted hover:text-charcoal transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-muted hover:text-charcoal transition-colors"
              aria-label="TikTok"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-charcoal-muted hover:text-charcoal transition-colors"
              aria-label="Pinterest"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0a12 12 0 00-4.37 23.17c-.1-.94-.2-2.4.04-3.44l1.4-5.96s-.35-.72-.35-1.78c0-1.67.97-2.9 2.17-2.9 1.02 0 1.52.77 1.52 1.7 0 1.03-.66 2.58-1 4-.28 1.2.6 2.17 1.78 2.17 2.13 0 3.77-2.25 3.77-5.5 0-2.87-2.06-4.88-5-4.88-3.4 0-5.4 2.55-5.4 5.2 0 1.03.4 2.13.89 2.73.1.12.11.22.08.34l-.33 1.36c-.05.22-.18.27-.4.16-1.5-.7-2.43-2.88-2.43-4.64 0-3.78 2.75-7.25 7.92-7.25 4.16 0 7.4 2.97 7.4 6.93 0 4.13-2.6 7.46-6.22 7.46-1.21 0-2.36-.63-2.75-1.38l-.75 2.85c-.27 1.04-1 2.35-1.49 3.15A12 12 0 1012 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

