"use client";

const TrustedBand = () => {
  const brands = [
    {
      name: "LG",
      domain: "lg.com",
    },
    {
      name: "Nike",
      domain: "nike.com",
    },
    {
      name: "Samsung",
      domain: "samsung.com",
    },
    {
      name: "Adidas",
      domain: "adidas.com",
    },
    {
      name: "Sony",
      domain: "sony.com",
    },
    {
      name: "Apple",
      domain: "apple.com",
    },
    {
      name: "Puma",
      domain: "puma.com",
    },
  ];

  return (
    <>
      <style jsx>{`
        .brand-marquee {
          animation: brandScroll 28s linear infinite;
        }

        .brand-marquee:hover {
          animation-play-state: paused;
        }

        @keyframes brandScroll {
          0% {
            transform: translateX(0);
          }

          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <section className="w-full bg-white py-16 md:py-20">
        {/* Heading */}
        <div className="mx-auto mb-12 max-w-3xl px-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gray-300" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gray-400">
              Our Partners
            </span>

            <span className="h-px w-8 bg-gray-300" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
            Brands That Collaborate With Us
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-500 md:text-base">
            We work with trusted brands to bring quality products and a better
            shopping experience to our customers.
          </p>
        </div>

        {/* Brand Marquee */}
        <div className="relative w-full overflow-hidden">
          {/* Left Fade */}
          <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-24 bg-gradient-to-r from-white via-white/95 to-transparent md:w-52" />

          <div className="brand-marquee flex w-max items-center">
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="group mx-3 flex h-28 w-44 shrink-0 items-center justify-center rounded-2xl border border-gray-100 bg-white px-8 shadow-[0_4px_24px_rgba(15,23,42,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-gray-200 hover:shadow-[0_15px_40px_rgba(15,23,42,0.08)] md:mx-4 md:h-32 md:w-52"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  {/* Brand Logo */}
                  <div className="flex h-14 w-28 items-center justify-center md:h-16 md:w-32">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${brand.domain}&sz=128`}
                      alt={`${brand.name} logo`}
                      className="h-12 w-12 object-contain opacity-45 grayscale transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0 md:h-14 md:w-14"
                      draggable={false}
                    />
                  </div>

                  {/* Brand Name */}
                  <span className="text-xs font-semibold tracking-[0.18em] text-gray-400 transition-colors duration-300 group-hover:text-gray-900">
                    {brand.name.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right Fade */}
          <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-24 bg-gradient-to-l from-white via-white/95 to-transparent md:w-52" />
        </div>
      </section>
    </>
  );
};

export default TrustedBand;
