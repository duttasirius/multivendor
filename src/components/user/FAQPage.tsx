"use client";

import React, { useState } from "react";

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqsData = [
    {
      question: "How does the multi-vendor marketplace work?",
      answer:
        "Our marketplace brings multiple independent sellers together in one platform. You can browse products from different vendors, compare options, place orders, and manage your purchases from a single account.",
    },
    {
      question: "Can I buy products from multiple vendors in one order?",
      answer:
        "Yes. You can add products from different vendors to your cart. Depending on the vendors and shipping locations, your order may be split into separate shipments and deliveries.",
    },
    {
      question: "How do I know which vendor is selling a product?",
      answer:
        "Every product listing displays the vendor or store name along with relevant seller information. You can also visit a vendor's storefront to explore their other products.",
    },
    {
      question: "Are all vendors verified?",
      answer:
        "Vendors go through our marketplace onboarding and verification process before they can sell products. We also continuously monitor vendor activity to help maintain marketplace quality and trust.",
    },
    {
      question: "What payment methods are available?",
      answer:
        "You can pay using the payment methods available at checkout, which may include online payments and Cash on Delivery for eligible products, locations, and vendors.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes. Once your order has been shipped, you can view its status and tracking information from your account's order section. Tracking availability may vary by shipping partner.",
    },
    {
      question: "Why are my products arriving in separate packages?",
      answer:
        "Products purchased from different vendors may be shipped separately because each vendor manages their own inventory, packaging, and fulfillment. This means delivery dates can differ between items in the same cart.",
    },
    {
      question: "How can I return or cancel an order?",
      answer:
        "Cancellation and return availability depends on the product, vendor, and order status. You can check the applicable return policy from the product page or your order details before requesting a return or cancellation.",
    },
    {
      question: "Who should I contact about a product issue?",
      answer:
        "For product-specific questions, delivery concerns, or issues with an order, you can contact the vendor through the available support options. Our marketplace support team can also assist when escalation is required.",
    },
    {
      question: "Can vendors set their own product prices?",
      answer:
        "Yes. Vendors can manage their own product listings, pricing, inventory, and product information while following our marketplace rules and policies.",
    },
    {
      question: "How do vendors receive payments?",
      answer:
        "Vendor earnings are processed according to the marketplace's payout schedule and applicable fees, commissions, refunds, and settlement rules.",
    },
    {
      question: "Is there a fee for becoming a vendor?",
      answer:
        "Vendor fees depend on the seller plan and marketplace policies. Applicable commissions, transaction charges, or other service fees are communicated during the vendor onboarding process.",
    },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8 bg-[radial-gradient(circle_at_top_right,_rgba(79,70,229,0.18),_transparent_35%),linear-gradient(to_bottom_right,_#000,_#020617,_#0f172a)]">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
            FAQ
          </span>

          <h1 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
            Everything you need to know about shopping, selling, payments,
            shipping, returns, and managing orders on our marketplace.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {faqsData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`group overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-indigo-200 shadow-[0_12px_35px_-18px_rgba(79,70,229,0.35)]"
                    : "border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-300 ${
                        isOpen
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
                      }`}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h2 className="text-sm font-semibold leading-6 text-slate-800 sm:text-base">
                      {faq.question}
                    </h2>
                  </div>

                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? "rotate-180 border-indigo-200 bg-indigo-50 text-indigo-600"
                        : "border-slate-200 bg-white text-slate-500 group-hover:border-indigo-100 group-hover:text-indigo-600"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-slate-100 px-5 pb-6 pt-4 sm:px-6">
                      <p className="pl-12 text-sm leading-7 text-slate-500">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
          <div className="flex flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <p className="text-base font-semibold text-slate-900">
                Still have questions?
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Our support team is here to help with your marketplace, orders,
                or vendor-related questions.
              </p>
            </div>

            <button
              type="button"
              className="w-full rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 sm:w-auto"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQPage;
