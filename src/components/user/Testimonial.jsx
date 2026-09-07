"use client";

const Testimonial = () => {
  return (
    <section className="px-6 py-16 md:px-16 lg:px-24 bg-gradient-to-br from-black via-slate-950 to-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 1.5L8.545 4.63L12 5.132L9.5 7.567L10.09 11L7 9.38L3.91 11L4.5 7.567L2 5.132L5.455 4.63L7 1.5Z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>

            <span>Customer Reviews</span>
          </div>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Loved by shoppers on MultiCart
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500 md:text-base">
            See what customers have to say about their shopping experience,
            product quality, delivery, and the vendors they purchased from on
            MultiCart.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl">
            <div className="flex items-center gap-1 text-amber-400">
              <span>★★★★★</span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              "I ordered products from three different sellers and everything
              arrived exactly as described. The whole shopping experience on
              MultiCart was smooth and reliable."
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
              <img
                className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
                alt="Ananya Sharma"
              />

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Ananya Sharma
                </h2>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-xs text-slate-500">
                    Verified Customer
                  </span>

                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl">
            <div className="flex items-center gap-1 text-amber-400">
              <span>★★★★★</span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              "The checkout process was incredibly simple, and my order arrived
              earlier than expected. I especially liked being able to track
              everything from one place."
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
              <img
                className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"
                alt="Rahul Mehta"
              />

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Rahul Mehta
                </h2>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-xs text-slate-500">
                    Verified Customer
                  </span>

                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl">
            <div className="flex items-center gap-1 text-amber-400">
              <span>★★★★★</span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              "I was a little hesitant about buying from multiple vendors, but
              every product matched the listing. Great prices, good packaging,
              and a very convenient platform."
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
              <img
                className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200"
                alt="Priya Das"
              />

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Priya Das
                </h2>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-xs text-slate-500">
                    Verified Customer
                  </span>

                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl">
            <div className="flex items-center gap-1 text-amber-400">
              <span>★★★★★</span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              "MultiCart makes online shopping feel effortless. I can discover
              different brands, compare products, and place orders without
              jumping between multiple websites."
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
              <img
                className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
                alt="Arjun Roy"
              />

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Arjun Roy
                </h2>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-xs text-slate-500">
                    Verified Customer
                  </span>

                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 5 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl">
            <div className="flex items-center gap-1 text-amber-400">
              <span>★★★★★</span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              "My order was packed carefully and delivered on time. The vendor
              information and order updates also made the entire purchase feel
              trustworthy."
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
              <img
                className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100"
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200"
                alt="Sneha Kapoor"
              />

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Sneha Kapoor
                </h2>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-xs text-slate-500">
                    Verified Customer
                  </span>

                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    ✓
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 6 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-100 hover:shadow-xl">
            <div className="flex items-center gap-1 text-amber-400">
              <span>★★★★★</span>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-500">
              "I've purchased electronics, fashion items, and home products
              through MultiCart. The platform is easy to use and having multiple
              sellers in one place is a huge advantage."
            </p>

            <div className="mt-7 flex items-center gap-3 border-t border-slate-100 pt-5">
              <img
                className="h-11 w-11 rounded-full object-cover ring-2 ring-slate-100"
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200"
                alt="Vikram Singh"
              />

              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  Vikram Singh
                </h2>

                <div className="mt-0.5 flex items-center gap-1.5">
                  <span className="text-xs text-slate-500">
                    Verified Customer
                  </span>

                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    ✓
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Your experience matters
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Share your recent purchase experience and help other shoppers make
              better decisions.
            </p>
          </div>

          <button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600">
            Write a Review
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
