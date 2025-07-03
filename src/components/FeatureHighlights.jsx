import React from "react";
import { FaStar, FaCogs, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaStar size={28} className="text-white drop-shadow-lg" />, 
    title: <><span className="font-extrabold text-black">Premium</span> Quality</>,
    desc: "Engineered for excellence with top-grade materials and precision manufacturing."
  },
  {
    icon: <FaCogs size={28} className="text-white drop-shadow-lg" />, 
    title: <><span className="font-extrabold text-black">Advanced</span> Features</>,
    desc: "Packed with innovative features for reliability and long-term performance."
  },
  {
    icon: <FaShieldAlt size={28} className="text-white drop-shadow-lg" />, 
    title: <><span className="font-extrabold text-black">Trusted</span> & Secure</>,
    desc: "A partner you can rely on—trusted by industry leaders worldwide."
  }
];

const FeatureHighlights = () => (
  <section className="w-full py-10 sm:py-12 md:py-14 px-2 bg-gradient-to-b from-white via-blue-50 to-white">
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 px-2 sm:px-4 md:px-0">
      {features.map((f, i) => (
        <div
          key={i}
          className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl border border-blue-100"
        >
          <div className="mb-5 flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br bg-black shadow-lg border-2 border-blue-200 group-hover:shadow-blue-300/60 group-hover:scale-110 transition-all duration-300">
            {f.icon}
          </div>
          <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
            {f.title}
          </div>
          <div className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {f.desc}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeatureHighlights; 