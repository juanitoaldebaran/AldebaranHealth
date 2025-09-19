import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent,CardHeader } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Activity, Bot, Mic } from "lucide-react";
import { Link } from "react-router-dom";

const Services: React.FC = () => {
    const services = [
        {
            id: "doctor-ai",
            title: "Doctor AI Chatbot",
            description: "Intelligence Medical Assistant providing 24/7 healthcare guidance",
            icon: Bot,
            gradient: 'from-blue-500 to-cyan-500',
            features: ['Medical Knowledge Base', 'Symptom Analysis', 'Treatment Suggestions', 'Emergency Detection'],
            stats: { consultations: '15K+', accuracy: '94%' }
        }, 
        {
            id: 'voice-therapy',
            title: 'AI Therapist Voice Creation',
            description: 'Create personalized AI therapist voices with advanced emotional intelligence and therapeutic training.',
            icon: Mic,
            gradient: 'from-purple-500 to-pink-500',
            features: ['Voice Cloning', 'Emotional Modeling', 'Therapeutic Scripts', 'Multi-language Support'],
            stats: { users: '2.5K+', satisfaction: '96%' }
        },
        {
            id: 'stress-analysis',
            title: 'Stress Analysis Suite',
            description: 'Advanced biometric and behavioral analysis for comprehensive stress level monitoring.',
            icon: Activity,
            gradient: 'from-green-500 to-emerald-500',
            features: ['Heart Rate Monitoring', 'Voice Analysis', 'Behavioral Patterns', 'Wellness Reports'],
            stats: { analyses: '8.2K+', insights: '99%' }
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/*Navbar Section*/}
            <Navbar />

            {/*Hero Section*/}
            <motion.section 
            className="min-h-screen flex items-center bg-white py-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            >
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-6 text-center"
                >
                    <h1 className="text-6xl font-extrabold text-blue-600">🧑‍💻Our  <span className="text-black">AI </span> Services</h1>                
                    <h1 className="text-4xl font-extrabold text-blue-600">Artificial Intelligence <span className="text-black">Tools</span></h1>
                    <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="flex justify-center text-[100px] animate-bounce"
                    >
                        🤖
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-gray-800">Improving Human Health Environment Through Technology</h3>
                    <p className="text-lg text-gray-600 leading-relaxed"><span className="font-semibold text-blue-600">AldebaranHealth</span>, provided advanced voice synthesis, intelligent medical assistance and comprehensive wellness monitoring with <span className="text-blue-600">cutting-edge AI technology</span></p>
                </motion.div>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section 
                className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
            <div className="max-w-6xl mx-auto">
                <div className="mt-20 px-6 py-20 space-y-16">
                    {services.map((service) => {
                        const IconComponent = service.icon;
                        return (
                            <Card key={service.id} className=" hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
                                <CardHeader className="flex flex-col items-center justify-center">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="font-bold text-[20px]">
                                        {service.title}
                                    </div>
                                    <div className="font-light text-[16px]">
                                        {service.description}
                                    </div>
                                </CardHeader>
    
                                <CardContent className="flex flex-col justify-center">

                                    <p className="font-bold text-[16px] mt-6 text-center">
                                        ⚡️ Key Features
                                    </p>
                                    <div className="grid grid-cols-2 gap-4 mt-4">
                                        <div className="bg-gray-50 text-black p-2 rounded-lg shadow-lg">
                                            {service.features[0]}
                                        </div>
                                        <div className="bg-gray-50 text-black p-2 rounded-lg shadow-lg">
                                            {service.features[1]}
                                        </div>
                                        <div className="bg-gray-50 text-black p-2 rounded-lg shadow-lg">
                                            {service.features[2]}
                                        </div>
                                        <div className="bg-gray-50 text-black p-2 rounded-lg shadow-lg">
                                            {service.features[3]}
                                        </div>
                                    </div>

                                    <Link to={"/conversation"} className={`bg-gradient-to-br ${service.gradient} mt-8 w-full bg-black rounded-lg text-white text-center p-4`}>
                                        Get Started
                                    </Link>
                                </CardContent>
                        </Card>
                        )
                    })}
                </div>
            </div>
            </motion.section>
                    
            {/*Footer Section*/}
            <Footer />
        </div>
    )
}

export default Services;