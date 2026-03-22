import { useState } from "react";

const GOLD = "#C9A84C";
const NAVY = "#1B2B4B";

const faqs = [
  {
    q: "Can I customize any package?",
    a: "Yes! Every package can be customized to your dates, group size, and budget. Just send an enquiry and our team will build a plan around you.",
  },
  {
    q: "What is the cancellation policy?",
    a: "Free cancellation up to 7 days before travel. 50% refund if cancelled within 3 days. No refund on day of travel.",
  },
  {
    q: "Is travel insurance included?",
    a: "Basic travel insurance is included in all packages. Comprehensive and premium coverage can be added on request.",
  },
  {
    q: "How do I book a package?",
    a: "Click 'Send Enquiry' on any package — our travel expert will call you within 2 hours to confirm your booking.",
  },
  {
    q: "Are flights included in packages?",
    a: "Flights are not included by default, but we can assist with flight bookings and provide add-on airfare options.",
  },
  {
    q: "Do you offer group discounts?",
    a: "Yes! Groups of 6 or more get up to 15% discount. Contact us for a custom group quote.",
  },
];

export default function PackagesFAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="w-full bg-[#FAFAF7] px-4 sm:px-8 md:px-16 lg:px-24 py-16 md:py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span
            className="text-xs tracking-[3px] uppercase font-medium block mb-3"
            style={{ color: GOLD }}
          >
            Common Questions
          </span>
          <h2
            className="text-3xl md:text-4xl font-semibold"
            style={{ color: NAVY, fontFamily: "'Georgia', serif" }}
          >
            FAQ
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl overflow-hidden cursor-pointer"
              style={{ border: "0.5px solid #E5E0D5" }}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <p className="text-sm font-medium" style={{ color: NAVY }}>
                  {faq.q}
                </p>
                <span
                  className="text-lg flex-shrink-0 transition-transform duration-200"
                  style={{
                    color: GOLD,
                    transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </div>
              {openIndex === i && (
                <div
                  className="px-5 pb-4 text-xs text-gray-500 leading-relaxed"
                  style={{ borderTop: "0.5px solid #E5E0D5" }}
                >
                  <p className="pt-3">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}