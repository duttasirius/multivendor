"use client";

import { motion, Variants } from "framer-motion";

const Price = () => {
  const plans = [
    {
      name: "FREE",
      price: "₹0",
      description: "Everything you need for everyday shopping on MultiCart.",
      dotClass: "bg-neutral-500",
      innerBorderClass: "border-neutral-800",
      buttonClass:
        "border border-neutral-700 bg-neutral-900 hover:bg-neutral-800",
      buttonText: "CURRENT PLAN",
      features: [
        { text: "Browse unlimited products", included: true },
        { text: "Wishlist & saved items", included: true },
        { text: "Order tracking", included: true },
        { text: "Regular offers & promotions", included: true },
        { text: "Standard customer support", included: true },
        { text: "Free delivery on eligible orders", included: false },
        { text: "Exclusive member discounts", included: false },
        { text: "Early access to special deals", included: false },
      ],
    },

    {
      name: "PLUS",
      price: "₹149",
      description:
        "More savings, faster delivery, and extra rewards for frequent shoppers.",
      dotClass: "bg-orange-500",
      innerBorderClass: "border-orange-500/30",
      buttonClass:
        "bg-orange-600 hover:bg-orange-500 shadow-lg shadow-orange-600/20",
      buttonText: "JOIN PLUS",
      badge: "MOST POPULAR",
      featured: true,
      features: [
        { text: "Everything in Free", included: true },
        { text: "Free delivery on eligible orders", included: true },
        { text: "Exclusive member discounts", included: true },
        { text: "Extra reward points", included: true },
        { text: "Early access to selected deals", included: true },
        { text: "Priority customer support", included: true },
        { text: "Birthday & special offers", included: true },
        { text: "Lower replacement fees", included: true },
      ],
    },

    {
      name: "PREMIUM",
      price: "₹299",
      description:
        "The ultimate MultiCart experience for frequent shoppers and deal lovers.",
      dotClass: "bg-sky-300",
      innerBorderClass: "border-sky-200/20",
      buttonClass: "border border-sky-200/20 bg-sky-200/10 hover:bg-sky-200/15",
      buttonText: "GO PREMIUM",
      features: [
        { text: "Everything in Plus", included: true },
        { text: "Free delivery on more orders", included: true },
        { text: "Higher reward points", included: true },
        { text: "Premium member-only deals", included: true },
        { text: "Early access to major sales", included: true },
        { text: "Priority returns & replacements", included: true },
        { text: "Exclusive flash-sale access", included: true },
        { text: "Premium customer support", included: true },
      ],
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.97,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const CheckIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="8.33" stroke="white" strokeWidth="1.5" />
      <path
        d="M7.5 10.003L9.167 11.669L12.5 8.336"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  const CrossIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <circle cx="10" cy="10" r="8.33" stroke="#555555" strokeWidth="1.5" />

      <path
        d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5"
        stroke="#555555"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );

  const ArrowIcon = ({ className = "" }) => (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.167 10H15.833M10 4.164L15.833 10L10 15.831"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <>
      <section className="relative overflow-hidden bg-black px-4 py-24 md:py-28">
        {/* Ambient background glow */}
        <motion.div
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-orange-500/10 blur-[140px]"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        <motion.div
          className="pointer-events-none absolute left-0 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-blue-500/5 blur-[120px]"
          animate={{
            x: [0, 35, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="relative mx-auto flex max-w-6xl flex-col items-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 rounded-full border border-orange-500/20 bg-neutral-900/80 px-5 py-2 backdrop-blur-md"
          >
            <motion.span
              className="size-1.5 rounded-full bg-orange-500"
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

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-300">
              MultiCart Membership
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-7 text-center text-4xl font-medium tracking-[-0.03em] text-white md:text-6xl"
          >
            Shop More.{" "}
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-300 bg-clip-text text-transparent">
              Save More.
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-5 max-w-2xl text-center text-sm leading-7 text-neutral-400 md:text-base"
          >
            Upgrade your MultiCart experience with exclusive savings, delivery
            benefits, rewards, and member-only shopping perks.
          </motion.p>

          {/* Plans */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  transition: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                className="relative h-full"
              >
                {/* Featured glow */}
                {plan.featured && (
                  <motion.div
                    className="pointer-events-none absolute -inset-[1px] rounded-[2rem] bg-gradient-to-b from-orange-500/40 via-orange-500/5 to-transparent blur-sm"
                    animate={{
                      opacity: [0.45, 0.8, 0.45],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}

                <div
                  className={`relative h-full rounded-[2rem] border p-[1px] ${
                    plan.featured
                      ? "border-orange-500/30 bg-gradient-to-b from-orange-500/20 to-neutral-800"
                      : "border-neutral-800 bg-neutral-900/80"
                  }`}
                >
                  <div
                    className={`relative h-full overflow-hidden rounded-[1.9rem] border ${plan.innerBorderClass} bg-neutral-950 p-6 md:p-7`}
                  >
                    {/* Premium inner glow */}
                    {plan.featured && (
                      <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-orange-500/10 blur-[80px]" />
                    )}

                    {/* Popular badge */}
                    {plan.badge && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -5 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.5,
                          delay: 0.5,
                        }}
                        className="absolute right-5 top-5"
                      >
                        <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-orange-400">
                          {plan.badge}
                        </span>
                      </motion.div>
                    )}

                    {/* Plan name */}
                    <div className="relative flex items-center gap-2">
                      <span
                        className={`size-3 rounded-[3px] ${plan.dotClass}`}
                      />

                      <p className="text-xs font-semibold tracking-[0.18em] text-white">
                        {plan.name}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="relative mt-7 flex items-end gap-2">
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="text-5xl font-semibold tracking-[-0.04em] text-white"
                      >
                        {plan.price}
                      </motion.h3>

                      <p className="pb-1.5 text-xs font-medium uppercase tracking-wider text-neutral-500">
                        /month
                      </p>
                    </div>

                    {/* Description */}
                    <p className="relative mt-4 min-h-[52px] max-w-sm text-sm leading-6 text-neutral-400">
                      {plan.description}
                    </p>

                    {/* CTA */}
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group relative mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 ${plan.buttonClass}`}
                    >
                      {plan.buttonText}

                      <ArrowIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </motion.button>

                    {/* Divider */}
                    <div className="my-8 h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />

                    {/* Benefit label */}
                    <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-600">
                      Membership Benefits
                    </p>

                    {/* Features */}
                    <div className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={feature.text}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.25 + featureIndex * 0.04,
                          }}
                          className="flex items-start gap-3"
                        >
                          {feature.included ? <CheckIcon /> : <CrossIcon />}

                          <p
                            className={`text-sm leading-5 ${
                              feature.included
                                ? "text-neutral-200"
                                : "text-neutral-600"
                            }`}
                          >
                            {feature.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom note */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 max-w-2xl text-center text-xs leading-5 text-neutral-600"
          >
            Cancel anytime. Membership benefits may vary by product, seller,
            location, and order eligibility.
          </motion.p>
        </div>
      </section>
    </>
  );
};

export default Price;
