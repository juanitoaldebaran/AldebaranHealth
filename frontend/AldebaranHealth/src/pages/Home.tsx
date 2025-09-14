import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center bg-gradient-to-b from-slate-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex flex-col justify-center items-center space-y-6">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-center text-4xl font-extrabold tracking-tight text-blue-500">
                AldebaranHealth
              </h1>
              <h2 className="text-3xl font-semibold tracking-tight mt-4">
                ✨ Building Future AI Healthcare
              </h2>
              <p className="leading-7 mt-6 text-justify max-w-3xl">
                Born out of the rising challenges in mental and physical health,
                <span className="font-semibold text-blue-500"> AldebaranHealth</span> 
                is an AI-powered tool designed to support your well-being. By
                combining advanced technology with compassionate care, we help
                individuals access reliable guidance, personalized insights, and
                timely support for their health.
              </p>
              <blockquote className="mt-6 border-l-2 pl-6 italic">
                &quot;The greatest wealth is health.&quot;
              </blockquote>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Link
                to="/services"
                className="bg-black text-white px-4 py-2 text-[16px] rounded-lg hover:bg-gray-700 transition-colors"
              >
                Get started with our AI 🤖
              </Link>
              <Link
                to={"/about"}
                className="bg-blue-500 text-white px-4 py-2 text-[16px] rounded-lg hover:bg-blue-800 transition-colors"
              >
                Get to know us more
              </Link>
            </div>
            <p className="text-xs bg-green-400 text-white rounded-full p-2">
              Now powered by AI Chatbots and Facial Recognition
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
