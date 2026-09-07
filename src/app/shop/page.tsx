"use client";

import { IUser } from "@/model/user.model";
import { RootState } from "@/redux/store";
import { BadgeCheck, MapPin, UserRound, Store } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

function ShopPage() {
  const { allVendorsData } = useSelector((state: RootState) => state.vendor);
  const router = useRouter();

  return (
    <div className="min-h-[80vh] w-full bg-black px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <motion.h1
          initial="hidden"
          animate="visible"
          className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
        >
          {"Explore Shops & Verified Sellers".split("").map((char, index) => (
            <motion.span
              key={index}
              variants={{
                hidden: {
                  opacity: 0,
                  y: 25,
                  rotateX: -90,
                  filter: "blur(6px)",
                },
                visible: {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: "blur(0px)",
                },
              }}
              transition={{
                duration: 0.6,
                delay: index * 0.035,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.1,
          }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/50 sm:text-base"
        >
          Discover trusted shops and verified sellers offering products across
          the marketplace.
        </motion.p>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
          {allVendorsData.map((v: IUser, i: number) => (
            <motion.div
              key={v._id?.toString() || i}
              onClick={() => router.push(`/shopDetails/${v._id}`)}
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.45,
                delay: Math.min(i * 0.07, 0.5),
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{
                y: -7,
                scale: 1.015,
              }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] shadow-[0_15px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07] hover:shadow-[0_25px_70px_rgba(0,0,0,0.5)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative h-52 w-full overflow-hidden bg-white/[0.03]">
                {v.image ? (
                  <Image
                    src={v.image}
                    alt={v.shopName || "Shop image"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-white/[0.04]">
                    <Store className="h-16 w-16 text-white/20" />
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute right-4 top-4">
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-black/45 px-3 py-1.5 text-xs font-medium text-emerald-300 backdrop-blur-md">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    <span className="font-bold text-base">
                      {v.verificationStatus || "Verified"}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
                  <Store className="h-5 w-5 text-white/80" />
                </div>
              </div>

              <div className="relative p-5">
                <h2 className="line-clamp-1 text-lg font-semibold tracking-tight text-white">
                  {v.shopName || "Unnamed Shop"}
                </h2>

                <div className="mt-3 flex items-start gap-2 text-sm text-white/50">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/35" />

                  <p className="line-clamp-2 leading-5">
                    {v.shopAddress || "Shop address unavailable"}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{
                        scale: 1.1,
                        rotate: 4,
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-400/10"
                    >
                      <BadgeCheck className="h-4 w-4 text-emerald-300" />
                    </motion.div>

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
                        Seller
                      </p>

                      <p className="text-sm font-medium text-emerald-300">
                        {v.verificationStatus || "Verified"}
                      </p>
                    </div>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <UserRound className="h-4 w-4 text-white/40" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
