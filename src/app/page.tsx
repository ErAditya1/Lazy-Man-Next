// pages/index.js
'use client'
import { useApp } from "@/context/AppContext";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

export default function Home() {
  // TODO: Replace with real auth state (e.g., useSession from next-auth)
  const {isAuthenticated}= useApp() // change to real session check
  const [mobileOpen, setMobileOpen] = useState(false);

  // helper to close mobile menu when navigating
  const navLinkProps = { onClick: () => setMobileOpen(false) };

  return (
    <>
      <Head>
        <title>Lazy Man — On-demand Mini Services</title>
        <meta
          name="description"
          content="Find trusted local helpers instantly — plumbers, maids, electricians and more. Book, contact, and track in seconds."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        {/* NAV */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">
                LM
              </div>
              <div>
                <Link href="/" className="text-lg font-bold">
                  Lazy Man
                </Link>
                <p className="text-xs text-gray-500">Instant local helpers</p>
              </div>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
              {isAuthenticated ? (
                <Link href="/home" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/auth" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
                  Get Started
                </Link>
              )}

              <Link href="#features" className="hover:text-orange-600">
                Features
              </Link>
              <Link href="#how" className="hover:text-orange-600">
                How it works
              </Link>
              <Link href="#pricing" className="hover:text-orange-600">
                Pricing
              </Link>
              <Link href="#contact" className="hover:text-orange-600">
                Contact
              </Link>
              <Link href="/app" className="ml-2 inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg">
                Get App
              </Link>
            </nav>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              <Link href="/app" className="inline-flex items-center gap-2 px-3 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm">
                Get App
              </Link>

              <button
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((s) => !s)}
                className="p-2 rounded-md bg-gray-100 hover:bg-gray-200"
              >
                {mobileOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu (slide down) */}
          <div className={`md:hidden transition-max-height duration-300 overflow-hidden bg-white ${mobileOpen ? "max-h-96 border-t" : "max-h-0"}`}>
            <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
              {isAuthenticated ? (
                <Link href="/home" className="w-full text-center px-4 py-2 bg-orange-500 text-white rounded-md" {...navLinkProps}>
                  Go to Dashboard
                </Link>
              ) : (
                <Link href="/auth" className="w-full text-center px-4 py-2 bg-orange-500 text-white rounded-md" {...navLinkProps}>
                  Get Started
                </Link>
              )}

              <Link href="#features" className="px-4 py-2 rounded-md hover:bg-gray-50" {...navLinkProps}>
                Features
              </Link>
              <Link href="#how" className="px-4 py-2 rounded-md hover:bg-gray-50" {...navLinkProps}>
                How it works
              </Link>
              <Link href="#pricing" className="px-4 py-2 rounded-md hover:bg-gray-50" {...navLinkProps}>
                Pricing
              </Link>
              <Link href="#contact" className="px-4 py-2 rounded-md hover:bg-gray-50" {...navLinkProps}>
                Contact
              </Link>
            </div>
          </div>
        </header>

        {/* HERO */}
        <main className="flex-1">
          <section className="container mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Lazy Man — Get local help, instantly</h1>
              <p className="mt-6 text-gray-600 text-lg">
                Find trusted plumbers, maids, electricians, peons and more — direct contact, fast booking, and verified professionals in your neighborhood.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={isAuthenticated ? "/home" : "/auth"} className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold">
                  Book a Helper
                </Link>
                <Link href="#how" className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-100">
                  How it works
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-50 rounded-full">✔️</div>
                  <div>
                    <div className="font-semibold">Verified Pros</div>
                    <div className="text-xs text-gray-500">Background checked</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-full">⏱</div>
                  <div>
                    <div className="font-semibold">Fast Booking</div>
                    <div className="text-xs text-gray-500">Book in 3 taps</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-yellow-50 rounded-full">💳</div>
                  <div>
                    <div className="font-semibold">Multiple Payments</div>
                    <div className="text-xs text-gray-500">Cash or Razorpay</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a className="text-xs text-gray-500" href="tel:8896205860">Owner: Ashish Kumar • 8896205860</a>
                <a className="text-xs text-gray-500" href="mailto:ashish@gmail.com">ashish@gmail.com</a>
              </div>
            </div>

            <div className="relative">
              <div className="w-full h-80 md:h-96 bg-linear-to-br from-gray-100 to-white rounded-2xl shadow-lg overflow-hidden flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1581091012184-7b0e8be1d3e7?auto=format&fit=crop&w=1200&q=60" alt="helpers" className="w-full h-full object-cover opacity-95" />
              </div>

              <div className="absolute bottom-6 left-6 bg-white p-4 rounded-xl shadow-md w-72">
                <div className="text-xs text-gray-500">Nearby helper</div>
                <div className="mt-2 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200" />
                  <div>
                    <div className="font-semibold">Suresh • Plumber</div>
                    <div className="text-xs text-gray-500">1.2 km • 4.8 ★</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Link href="/provider/suresh" className="flex-1 text-center rounded-md py-2 bg-orange-500 text-white">Call</Link>
                  <Link href="/provider/suresh/book" className="flex-1 text-center rounded-md py-2 border border-gray-200">Book</Link>
                </div>
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section id="features" className="container mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold">Features</h2>
            <p className="text-gray-600 mt-2">Everything you need to hire local helpers quickly and safely.</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Search & Map", desc: "Find helpers on a live map, or list view with distance and ETA." },
                { title: "Direct Contact", desc: "Call or chat with providers directly — no middlemen." },
                { title: "Verified Profiles", desc: "ID docs, ratings, and reviews for trust." },
                { title: "Booking & Tracking", desc: "Schedule, track arrival, and pay securely." },
              ].map((f) => (
                <div key={f.title} className="p-6 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl">🔧</div>
                  <h3 className="mt-4 font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* HOW IT WORKS */}
          <section id="how" className="container mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold">How it works</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="text-2xl">1</div>
                <h4 className="mt-2 font-semibold">Search & Discover</h4>
                <p className="text-sm text-gray-600 mt-1">Select a category or search by your needs. Toggle map view to see nearby helpers.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="text-2xl">2</div>
                <h4 className="mt-2 font-semibold">Contact & Book</h4>
                <p className="text-sm text-gray-600 mt-1">Call directly or book in-app. Providers can accept or decline requests.</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="text-2xl">3</div>
                <h4 className="mt-2 font-semibold">Rate & Pay</h4>
                <p className="text-sm text-gray-600 mt-1">Mark job complete, give ratings, and pay via Cash or Razorpay.</p>
              </div>
            </div>
          </section>

          {/* PRICING */}
          <section id="pricing" className="container mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold">Pricing & Plans</h2>
            <p className="text-gray-600 mt-2">Simple and transparent: pay per job or subscribe for premium listing.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Pay as you go</div>
                <div className="mt-4 text-3xl font-bold">Free</div>
                <p className="mt-2 text-sm text-gray-600">Contact providers directly, pay on job completion.</p>
                {isAuthenticated ? (
                  <Link href="/dashboard" className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-md">Go to Dashboard</Link>
                ) : (
                  <Link href="/auth/register" className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-md">Get Started</Link>
                )}
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm border-2 border-orange-100">
                <div className="text-sm text-gray-500">Featured Listing</div>
                <div className="mt-4 text-3xl font-bold">₹499 / month</div>
                <p className="mt-2 text-sm text-gray-600">Promote your profile to get more leads.</p>
                <Link href="/promote" className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-md">Promote</Link>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="text-sm text-gray-500">Business</div>
                <div className="mt-4 text-3xl font-bold">Custom</div>
                <p className="mt-2 text-sm text-gray-600">Enterprise solutions and service partnerships.</p>
                <Link href="/contact/sales" className="mt-4 inline-block px-4 py-2 bg-orange-500 text-white rounded-md">Contact Sales</Link>
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="container mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold">What people say</h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <blockquote className="p-6 bg-white rounded-lg shadow-sm">“Quick and reliable — booked a plumber within 10 minutes.” <div className="mt-3 text-xs text-gray-500">— Ramesh</div></blockquote>
              <blockquote className="p-6 bg-white rounded-lg shadow-sm">“The maid service was polite and punctual.” <div className="mt-3 text-xs text-gray-500">— Priya</div></blockquote>
              <blockquote className="p-6 bg-white rounded-lg shadow-sm">“Great app for small household repairs.” <div className="mt-3 text-xs text-gray-500">— Sunil</div></blockquote>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="container mx-auto px-6 py-12">
            <h2 className="text-2xl font-bold">Contact & Support</h2>
            <p className="text-gray-600 mt-2">Questions, partnerships, or press? Reach out to the owner or developer directly.</p>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold">Owner</h3>
                <p className="text-sm text-gray-600 mt-2">Ashish Kumar</p>
                <p className="text-sm mt-1"><a className="text-orange-600 font-medium" href="tel:8896205860">8896205860</a></p>
                <p className="text-sm mt-1"><a className="text-orange-600 font-medium" href="mailto:ashish@gmail.com">ashish@gmail.com</a></p>

                <div className="mt-6">
                  <h4 className="font-semibold">Business queries</h4>
                  <p className="text-sm text-gray-600 mt-1">For partnerships and vendor onboarding, please email or call.</p>
                </div>
              </div>

              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold">Developer</h3>
                <p className="text-sm text-gray-600 mt-2">Aditya Kumar</p>
                <p className="text-sm mt-1"><a className="text-orange-600 font-medium" href="tel:9473774390">9473774390</a></p>
                <p className="text-sm mt-1"><a className="text-orange-600 font-medium" href="mailto:mradityaji2@gmail.com">mradityaji2@gmail.com</a></p>

                <div className="mt-6">
                  <h4 className="font-semibold">Developer support</h4>
                  <p className="text-sm text-gray-600 mt-1">For technical integrations, API access, or debugging help.</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="p-3 rounded-md border" placeholder="Your name" />
                <input className="p-3 rounded-md border" placeholder="Your email" />
                <textarea className="p-3 rounded-md border md:col-span-2" rows={4} placeholder="How can we help?"></textarea>
                <button type="button" className="md:col-span-2 px-6 py-3 bg-orange-500 text-white rounded-md">Send Message</button>
              </form>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="bg-white border-t mt-12">
          <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold">LM</div>
                <div>
                  <div className="font-bold">Lazy Man</div>
                  <div className="text-xs text-gray-500">On-demand mini services</div>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-4">Find local helpers instantly. Verified professionals for daily needs — plumbing, cleaning, electrical and more.</p>
            </div>

            <div>
              <h4 className="font-semibold">Product</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><Link href="#features">Features</Link></li>
                <li><Link href="#how">How it works</Link></li>
                <li><Link href="#pricing">Pricing</Link></li>
                <li><Link href="/app">Get the App</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li><Link href="#contact">Contact</Link></li>
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Contact</h4>
              <div className="mt-4 text-sm text-gray-600">
                <div>Owner: Ashish Kumar</div>
                <div>Phone: <a className="text-orange-600" href="tel:8896205860">8896205860</a></div>
                <div>Email: <a className="text-orange-600" href="mailto:ashish@gmail.com">ashish@gmail.com</a></div>

                <div className="mt-4">Developer: Aditya Kumar</div>
                <div>Phone: <a className="text-orange-600" href="tel:9473774390">9473774390</a></div>
                <div>Email: <a className="text-orange-600" href="mailto:mradityaji2@gmail.com">mradityaji2@gmail.com</a></div>
              </div>

              <div className="mt-6 flex gap-3">
                <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">f</a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">in</a>
                <a href="#" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center">t</a>
              </div>
            </div>
          </div>

          <div className="border-t bg-gray-50 py-4">
            <div className="container mx-auto px-6 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
              <div>© {new Date().getFullYear()} Lazy Man — All rights reserved.</div>
              <div className="mt-2 md:mt-0">Built by <a className="text-orange-600 font-medium" href="mailto:mradityaji2@gmail.com">Aditya Kumar</a></div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
