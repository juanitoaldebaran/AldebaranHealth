import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  Users, 
  ShieldCheck, 
  Brain, 
  Globe, 
  Sparkles, 
  Clock, 
  Stethoscope,
  AlertTriangle,
  Smile,
  Frown,
  Laptop,
  HeartPulse,
  Activity,
  Mic,
  MessageSquare
} from "lucide-react";

const About: React.FC = () => {
  const awarenessStats = [
    { icon: <AlertTriangle className="w-8 h-8 text-red-500" />, value: "1 in 4", label: "People experience mental health issues globally." },
    { icon: <Frown className="w-8 h-8 text-yellow-500" />, value: "75%", label: "Receive no treatment due to stigma or lack of access." },
    { icon: <Smile className="w-8 h-8 text-green-500" />, value: "80%", label: "Can see improvement with proper awareness & support." },
    { icon: <Users className="w-8 h-8 text-blue-500" />, value: "1B+", label: "People affected by mental health conditions worldwide." },
  ];

  const features = [
    { 
        title: "Personalized AI Support", 
        desc: "Tailored health recommendations that adapt to your unique needs.", 
        icon: <Brain className="w-6 h-6 text-blue-600" /> 
    },
    { 
        title: "Global Accessibility", 
        desc: "Available anytime, anywhere—healthcare without borders.", 
        icon: <Globe className="w-6 h-6 text-blue-600" /> 
    },
    { 
        title: "Data Privacy & Security", 
        desc: "Your health data is encrypted and kept safe at all times.", 
        icon: <ShieldCheck 
        className="w-6 h-6 text-blue-600" /> 
    },
    { 
        title: "24/7 Support", 
        desc: "Our AI assistant and team are available around the clock.", 
        icon: <Clock className="w-6 h-6 text-blue-600" /> 
    },
    { 
        title: "Human + AI Care", 
        desc: "Seamless collaboration between doctors and AI for best outcomes.", 
        icon: <Stethoscope className="w-6 h-6 text-blue-600" /> 
    },
    { 
        title: "Constant Innovation", 
        desc: "We evolve continuously to bring you the latest in AI healthcare.", 
        icon: <Sparkles className="w-6 h-6 text-blue-600" /> 
    },
  ];
const missions = [
  {
    id: "health",
    title: "Improve Quality of Health",
    description:
      "Dedicated to enhancing human health through AI-driven prevention, early detection, and continuous care.",
    icon: <HeartPulse className="w-8 h-8" />,
    color: "bg-red-500",
  },
  {
    id: "awareness",
    title: "Raise Health Awareness",
    description:
      "Break the stigma surrounding mental health and educate communities with accessible, data-driven insights.",
    icon: <AlertTriangle className="w-8 h-8" />,
    color: "bg-yellow-500",
  },
  {
    id: "technology",
    title: "Innovate Healthcare Technology",
    description:
      "Provide the most reliable AI healthcare platform that empowers both individuals and professionals.",
    icon: <Laptop className="w-8 h-8" />,
    color: "bg-green-500",
  },
  {
    id: "equity",
    title: "Accessible & Inclusive Care",
    description:
      "Ensure that healthcare support is available to everyone, regardless of geography, income, or background.",
    icon: <Globe className="w-8 h-8" />,
    color: "bg-sky-500",
  },
  {
    id: "privacy",
    title: "Protect Data & Build Trust",
    description:
      "Uphold the highest standards of privacy and security, ensuring user trust remains at the core.",
    icon: <ShieldCheck className="w-8 h-8" />,
    color: "bg-blue-500",
  },
  {
    id: "future",
    title: "Shape the Future of Healthcare",
    description:
      "Lead the way in combining compassion with innovation, building a healthier, smarter, and more connected world.",
    icon: <Sparkles className="w-8 h-8" />,
    color: "bg-purple-500",
  },
];

const services = [
    {
      id: "chatbot",
      title: "AI Doctor Chatbot",
      description:
        "Instant medical guidance and personalized advice, powered by our AI-driven doctor assistant.",
      icon: <MessageSquare className="w-8 h-8" />,
      color: "bg-blue-500",
    },
    {
      id: "voice",
      title: "Voice Therapist AI",
      description:
        "Talk to an AI therapist in real-time with speech-to-text technology designed for mental health support.",
      icon: <Mic className="w-8 h-8" />,
      color: "bg-green-500",
    },
    {
      id: "stress",
      title: "Stress Analysis",
      description:
        "Measure and track stress levels to gain insights into your mental well-being and lifestyle balance.",
      icon: <Brain className="w-8 h-8" />,
      color: "bg-purple-500",
    },
    {
      id: "insights",
      title: "Health Insights",
      description:
        "Access data-driven insights on your overall health, supported by continuous AI monitoring.",
      icon: <Activity className="w-8 h-8" />,
      color: "bg-yellow-500",
    },
    {
      id: "privacy",
      title: "Secure Data",
      description:
        "Your health data is protected with cutting-edge encryption and strict privacy compliance.",
      icon: <ShieldCheck className="w-8 h-8" />,
      color: "bg-red-500",
    },
    {
      id: "global",
      title: "Worldwide Access",
      description:
        "Our AI healthcare solutions are accessible from anywhere in the world, 24/7.",
      icon: <Globe className="w-8 h-8" />,
      color: "bg-sky-500",
    },
  ];


  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navbar */}
      <Navbar />

   {/* Hero Section */}
    <section className="min-h-screen flex items-center bg-gradient-to-b from-slate-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl font-extrabold tracking-tight text-blue-600">
                About <span className="text-black">AldebaranHealth </span>
            </h1>
            <h3 className="text-2xl font-semibold tracking-tight text-gray-800">
                Revolutionizing Healthcare with Artificial Intelligence
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
                At <span className="font-semibold text-blue-600">AldebaranHealth</span>, 
                I believe healthcare should be <span className="font-semibold">accessible, personalized, and stigma-free</span>. 
                The mission is to merge <span className="text-blue-600">cutting-edge AI technology</span> with 
                <span className="font-semibold"> compassion</span>, making reliable health support available for everyone.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
                Born from a passion to raise awareness about <span className="font-semibold">mental health</span> 
                and improve <span className="font-semibold">global well-being</span>, AldebaranHealth empowers individuals 
                to take charge of their health journey—anytime, anywhere.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h4 className="text-xl font-semibold text-blue-600">🌍 Vision</h4>
                <p className="text-gray-600 mt-2">
                    A world where healthcare is universally accessible, trusted, and enhanced by AI innovation.
                </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h4 className="text-xl font-semibold text-blue-600">💡 Mission</h4>
                <p className="text-gray-600 mt-2">
                    To create AI-powered tools that raise awareness, support mental well-being, 
                    and provide personalized healthcare to all.
                </p>
                </div>
            </div>
            </div>

            <div className="flex justify-center text-[200px]">
            👨🏻‍⚕️🩺
            </div>

        </div>
    </section>

{/* Features Section */}
      <section id="features" className="min-h-screen py-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center items-center space-y-2">
            <h2 className="text-3xl font-semibold text-center">
              Our AI-Powered Healthcare Solutions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="flex flex-col justify-between items-center text-center shadow-md p-8 rounded-lg bg-white hover:shadow-xl transition-all min-h-[320px]"
                >
                  <div
                    className={`${service.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-6`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-gray-600 mt-4">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    {/* Awareness Section */}
    <section className="py-20 bg-gradient-to-b from-slate-50 to-blue-50 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-600">Why I Built This 💻</h2>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            AldebaranHealth was born from a desire to raise <span className="font-semibold text-blue-600">mental health awareness </span> 
            and make healthcare more accessible. Too many people silently struggle due to <span className="font-semibold">stigma</span>, 
            <span className="font-semibold"> lack of resources</span>, or <span className="font-semibold">limited access to professionals</span>.  
            Our platform uses AI to bridge that gap—offering guidance, support, and hope.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12">
            {awarenessStats.map((stat, idx) => (
              <div key={idx} className="bg-white shadow p-6 rounded-xl hover:shadow-lg transition">
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-600">Why Choose Us 💡</h2>
          <p className="text-lg text-gray-600 mt-4">
            Empowering individuals with cutting-edge AI healthcare solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white shadow p-6 rounded-xl hover:shadow-lg transition flex flex-col items-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 mt-2">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-blue-50 min-h-[70vh] flex items-center">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-3xl font-bold text-blue-600">Vision & Mission 🚀</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            <span className="font-semibold text-blue-600">Vision:</span> A future where healthcare is accessible, affordable, and personalized for everyone.  
            <br />
            <span className="font-semibold text-blue-600">Mission:</span> To empower individuals with AI-driven tools that enhance health outcomes while ensuring compassion, trust, and data security.
          </p>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 w-full">
              {missions.map((mission) => (
                <div
                  key={mission.id}
                  className="flex flex-col justify-between items-center text-center shadow-md p-8 rounded-lg bg-white hover:shadow-xl transition-all min-h-[320px]"
                >
                  <div
                    className={`${mission.color} w-16 h-16 rounded-full flex items-center justify-center text-white mb-6`}
                  >
                    {mission.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{mission.title}</h3>
                  <p className="text-gray-600 mt-4">{mission.description}</p>
                </div>
              ))}
            </div>

        </div>
      </section>

      {/*FOOTER SECTION*/}
      <Footer />
    </div>
  );
};

export default About;
