"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Product = {
  _id: string;
  title: string;
  price: number;
  stock: number;
  image1: string;
  category: string;
  averageRating: number;
  reviewCount: number;
  replacementDays?: number;
  freeDelivery?: boolean;
  warranty?: string;
  payOnDelivery?: boolean;
  vendor?: {
    _id?: string;
    shopName?: string;
    name?: string;
  };
};

type Message = {
  role: "user" | "assistant";
  content: string;
  products?: Product[];
};

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! 👋 I'm MultiCart AI. How can I help you today?",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) {
      return;
    }

    const userMessage = input.trim();

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: userMessage,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to generate response");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
          products: data.products || [],
        },
      ]);
    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating AI Button */}

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.7,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: [1, 1.05, 1],
              y: [0, -6, 0],
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
              y: 20,
            }}
            transition={{
              opacity: {
                duration: 0.2,
              },
              scale: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
              y: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="fixed bottom-6 right-6 z-[9999]"
          >
            {/* Glow */}

            <motion.div
              animate={{
                scale: [1, 1.35, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full bg-indigo-500"
            />

            <motion.button
              whileHover={{
                scale: 1.1,
              }}
              whileTap={{
                scale: 0.92,
              }}
              onClick={() => setIsOpen(true)}
              aria-label="Open MultiCart AI"
              className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-2xl text-white shadow-2xl ring-1 ring-white/10"
            >
              🤖
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.85,
              y: 30,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="fixed bottom-6 right-6 z-[9999] w-[calc(100vw-2rem)] max-w-md"
          >
            <div className="flex h-[600px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
              {/* Header */}

              <div className="flex items-center justify-between bg-slate-900 px-5 py-4 text-white">
                <div>
                  <h2 className="text-sm font-semibold">MultiCart AI</h2>

                  <p className="mt-1 text-xs text-white/60">
                    Your shopping assistant
                  </p>
                </div>

                <motion.button
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  onClick={() => setIsOpen(false)}
                  aria-label="Close MultiCart AI"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg transition hover:bg-white/20"
                >
                  ×
                </motion.button>
              </div>

              {/* Messages */}

              <div className="flex-1 space-y-4 overflow-y-auto bg-white p-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="max-w-[88%]">
                      <div
                        className={`rounded-2xl px-4 py-3 text-sm ${
                          message.role === "user"
                            ? "bg-indigo-600 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {message.content}
                      </div>

                      {/* Products */}

                      {message.role === "assistant" &&
                        message.products &&
                        message.products.length > 0 && (
                          <div className="mt-3 space-y-3">
                            {message.products.map((product) => (
                              <div
                                key={product._id}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                              >
                                <img
                                  src={product.image1}
                                  alt={product.title}
                                  className="h-40 w-full object-cover"
                                />

                                <div className="p-4">
                                  <h3 className="text-sm font-semibold text-slate-900">
                                    {product.title}
                                  </h3>

                                  <p className="mt-2 text-lg font-bold text-slate-900">
                                    ₹{product.price.toLocaleString("en-IN")}
                                  </p>

                                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-slate-500">
                                    <span>⭐ {product.averageRating}</span>

                                    <span>({product.reviewCount} reviews)</span>
                                  </div>

                                  {product.vendor?.shopName && (
                                    <p className="mt-2 text-xs text-slate-500">
                                      Seller:{" "}
                                      <span className="font-medium text-slate-700">
                                        {product.vendor.shopName}
                                      </span>
                                    </p>
                                  )}

                                  <div className="mt-3 flex flex-wrap gap-2">
                                    {product.freeDelivery && (
                                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-600">
                                        Free Delivery
                                      </span>
                                    )}

                                    {product.payOnDelivery && (
                                      <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-600">
                                        COD
                                      </span>
                                    )}

                                    {product.warranty &&
                                      product.warranty !== "No Warranty" && (
                                        <span className="rounded-full bg-violet-50 px-2.5 py-1 text-[11px] font-medium text-violet-600">
                                          Warranty
                                        </span>
                                      )}
                                  </div>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      (window.location.href = `/viewProduct/${product._id}`)
                                    }
                                    className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-medium text-white transition hover:bg-indigo-600"
                                  >
                                    View Product
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  </motion.div>
                ))}

                {/* Loading */}

                {loading && (
                  <motion.div
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1 rounded-2xl bg-slate-100 px-4 py-3">
                      <motion.span
                        animate={{
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                        }}
                        className="h-2 w-2 rounded-full bg-slate-400"
                      />

                      <motion.span
                        animate={{
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.15,
                        }}
                        className="h-2 w-2 rounded-full bg-slate-400"
                      />

                      <motion.span
                        animate={{
                          y: [0, -4, 0],
                        }}
                        transition={{
                          duration: 0.6,
                          repeat: Infinity,
                          delay: 0.3,
                        }}
                        className="h-2 w-2 rounded-full bg-slate-400"
                      />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input */}

              <div className="border-t border-slate-200 bg-white p-3">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                    placeholder="Ask MultiCart AI..."
                    className="min-w-0 flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-500"
                  />

                  <motion.button
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Send
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
