"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubscribed(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden bg-black px-4 py-24 md:py-32">
      {/* Ambient Background */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[150px]"
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-orange-500/5 blur-[120px]"
        animate={{
          x: [0, 40, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative overflow-hidden rounded-[2rem] border border-neutral-800 bg-neutral-950 shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
        >
          {/* Top gradient line */}
          <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-orange-500/70 to-transparent" />

          {/* Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative px-6 py-14 md:px-12 md:py-16 lg:px-16">
            <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
              {/* Left Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-2"
                >
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-orange-500"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-orange-400">
                    Stay in the loop
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.15 }}
                  className="mt-6 max-w-xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl"
                >
                  Get the best of
                  <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 bg-clip-text text-transparent">
                    MultiCart.
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.25 }}
                  className="mt-5 max-w-xl text-sm leading-7 text-neutral-400 md:text-base"
                >
                  Subscribe for exclusive deals, new arrivals, seasonal offers,
                  shopping tips, and updates from MultiCart.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.35 }}
                  className="mt-7 flex flex-wrap gap-3"
                >
                  {["Exclusive Deals", "New Arrivals", "Member Offers"].map(
                    (item) => (
                      <span
                        key={item}
                        className="rounded-full border border-neutral-800 bg-neutral-900/70 px-3.5 py-2 text-xs text-neutral-400"
                      >
                        {item}
                      </span>
                    ),
                  )}
                </motion.div>
              </div>

              {/* Newsletter Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="rounded-3xl border border-neutral-800 bg-neutral-900/70 p-5 backdrop-blur-xl md:p-6">
                  {!subscribed ? (
                    <>
                      <div className="mb-5 flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10">
                          <Mail
                            size={20}
                            strokeWidth={1.7}
                            className="text-orange-400"
                          />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-white">
                            Join the MultiCart community
                          </p>

                          <p className="mt-0.5 text-xs text-neutral-500">
                            No spam. Just the good stuff.
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <div className="group flex flex-col gap-3 rounded-2xl border border-neutral-800 bg-black/60 p-2 transition-all duration-300 focus-within:border-orange-500/40 focus-within:shadow-[0_0_30px_rgba(249,115,22,0.08)] sm:flex-row">
                          <div className="flex flex-1 items-center gap-3 px-3">
                            <Mail
                              size={17}
                              className="shrink-0 text-neutral-600 transition-colors group-focus-within:text-orange-400"
                            />

                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter your email address"
                              required
                              className="w-full bg-transparent py-3 text-sm text-white outline-none placeholder:text-neutral-600"
                            />
                          </div>

                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="group flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors duration-300 hover:bg-orange-500"
                          >
                            Subscribe
                            <ArrowRight
                              size={17}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                            />
                          </motion.button>
                        </div>
                      </form>

                      <p className="mt-4 text-[11px] leading-5 text-neutral-600">
                        By subscribing, you agree to receive marketing emails
                        from MultiCart. You can unsubscribe anytime.
                      </p>
                    </>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex min-h-[220px] flex-col items-center justify-center text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1,
                          type: "spring",
                          stiffness: 180,
                        }}
                        className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/10"
                      >
                        <Check
                          size={26}
                          className="text-orange-400"
                          strokeWidth={2}
                        />
                      </motion.div>

                      <h3 className="mt-5 text-xl font-semibold text-white">
                        You&apos;re on the list!
                      </h3>

                      <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-500">
                        Welcome to MultiCart. Keep an eye on your inbox for
                        exclusive offers and fresh updates.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Bottom reassurance */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-center text-xs text-neutral-600"
        >
          Curated updates. Better deals. A smarter way to shop.
        </motion.p>
      </div>
    </section>
  );
};

export default Newsletter;
