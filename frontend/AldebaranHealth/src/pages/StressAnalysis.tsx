import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, AlertTriangle, Activity, TrendingUp, Users, Award, Loader2 } from 'lucide-react';
import type { Question, AnalysisResults } from '@/types/stress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const StressAnalysis: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'intro' | 'questionnaire' | 'results'>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<number[]>(new Array(10).fill(-1));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [error, setError] = useState<string | null>(null);

  const responseOptions = [
    { value: 0, label: "Never" },
    { value: 1, label: "Almost Never" },
    { value: 2, label: "Sometimes" },
    { value: 3, label: "Fairly Often" },
    { value: 4, label: "Very Often" }
  ];

  const services = [
    {
      id: "stress-analyzer",
      title: "AI Stress Analyzer",
      description: "Advanced ML-powered stress analysis using PSS-10 questionnaire",
      icon: Brain,
      gradient: 'from-blue-500 to-cyan-500',
      features: ['ML Stress Predictor', 'Personalized Insights', 'Expert Recommendations', 'Risk Assessment'],
    }
  ];


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success) {
          setQuestions(data.data.questions);
        } else {
          throw new Error(data.error || 'Failed to fetch questions');
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questionnaire. Please check if the Flask server is running on port 5000.');

        setQuestions([
          { id: 1, question: "In the last month, how often have you been upset because of something that happened unexpectedly?" },
          { id: 2, question: "In the last month, how often have you felt that you were unable to control the important things in your life?" },
          { id: 3, question: "In the last month, how often have you felt nervous and stressed?" },
          { id: 4, question: "In the last month, how often have you felt confident about your ability to handle your personal problems?" },
          { id: 5, question: "In the last month, how often have you felt that things were going your way?" },
          { id: 6, question: "In the last month, how often have you found that you could not cope with all the things that you had to do?" },
          { id: 7, question: "In the last month, how often have you been able to control irritations in your life?" },
          { id: 8, question: "In the last month, how often have you felt that you were on top of things?" },
          { id: 9, question: "In the last month, how often have you been angered because of things that were outside of your control?" },
          { id: 10, question: "In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?" }
        ]);
      }
    };

    fetchQuestions();
  }, []);

  const handleResponseSelect = (value: number) => {
    const newResponses = [...responses];
    newResponses[currentQuestionIndex] = value;
    setResponses(newResponses);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 300);
  };

  const canSubmit = () => {
    return responses.every(response => response !== -1);
  };

  const submitAnalysis = async () => {
    if (!canSubmit()) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          responses: responses,
          user_info: {
            timestamp: new Date().toISOString(),
            browser: navigator.userAgent
          }
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setResults(data.data);
        setCurrentStep('results');
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (err) {
      console.error('Error submitting analysis:', err);
      setError('Failed to analyze responses. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetAnalysis = () => {
    setCurrentStep('intro');
    setResponses(new Array(10).fill(-1));
    setCurrentQuestionIndex(0);
    setResults(null);
    setError(null);
  };

  const getStressLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'moderate': return 'text-yellow-600 bg-yellow-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStressLevelIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'moderate': return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'high': return <AlertTriangle className="w-6 h-6 text-red-600" />;
      default: return <Activity className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navbar */}
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
                    <h1 className="text-6xl font-extrabold text-blue-600">Stress  <span className="text-black">ML </span> Analyzer</h1>                
                    <h1 className="text-4xl font-extrabold text-blue-600">Machine Learning <span className="text-black">Models</span></h1>
                    <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="flex justify-center text-[100px] animate-bounce"
                    >
                        🧑🏽‍⚕️
                    </motion.div>
                    <h3 className="text-2xl font-semibold text-gray-800">Improving Human Health Environment Through Technology</h3>
                    <p className="text-lg text-gray-600 leading-relaxed"><span className="font-semibold text-blue-600">AldebaranHealth</span>, provided advanced AI healthcare with intelligent medical assistance and comprehensive wellness monitoring with <span className="text-blue-600">cutting-edge AI technology</span></p>
                </motion.div>
                </div>
            </motion.section>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <AnimatePresence mode="wait">
            {/* Intro Step */}
            {currentStep === 'intro' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Hero Section */}
                <div className="text-center space-y-6">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-8xl"
                  >
                    🧠
                  </motion.div>
                  <h1 className="text-5xl font-bold text-gray-900">
                    AI Stress <span className="text-blue-600">Analyzer</span>
                  </h1>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Get personalized insights about your stress levels using our advanced machine learning model
                    and the scientifically validated PSS-10 questionnaire.
                  </p>
                </div>

                {/* Service Card */}
                {services.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <Card key={service.id} className="hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                      <CardHeader className="text-center">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                        <p className="text-gray-600">{service.description}</p>
                      </CardHeader>

                      <CardContent className="space-y-6">
                        {/* Features */}
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                            Key Features
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {service.features.map((feature, index) => (
                              <div key={index} className="bg-gray-50 p-3 rounded-lg text-sm font-medium text-gray-700">
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* CTA Button */}
                        <button
                          onClick={() => setCurrentStep('questionnaire')}
                          className={`w-full bg-gradient-to-r ${service.gradient} text-white py-4 px-6 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                          disabled={questions.length === 0}
                        >
                          {questions.length === 0 ? 'Loading Questions...' : 'Start Analysis'}
                        </button>

                        {error && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <p className="text-red-700 text-sm">{error}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </motion.div>
            )}

          {/* Questionnaire Step */}
          {currentStep === 'questionnaire' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Progress Bar */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {Math.round(((responses.filter(r => r !== -1).length) / questions.length) * 100)}% Complete
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((responses.filter(r => r !== -1).length) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              {questions[currentQuestionIndex] && (
                <Card className="bg-white shadow-lg border-0">
                  <CardHeader>
                    <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
                      {questions[currentQuestionIndex].question}
                    </h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-3">
                      {responseOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleResponseSelect(option.value)}
                          className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                            responses[currentQuestionIndex] === option.value
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{option.label}</span>
                            <span className="text-sm text-gray-500">({option.value})</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex + 1))}
                    disabled={currentQuestionIndex === questions.length - 1}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                  
                  {canSubmit() && (
                    <button
                      onClick={submitAnalysis}
                      disabled={isLoading}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center space-x-2"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Brain className="w-4 h-4" />
                          <span>Analyze Stress</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-700">{error}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Results Step */}
          {currentStep === 'results' && results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              {/* Results Header */}
              <div className="text-center space-y-4">
                <div className="text-6xl">📊</div>
                <h2 className="text-3xl font-bold text-gray-900">Your Stress Analysis Results</h2>
                <p className="text-gray-600">Comprehensive analysis based on your responses</p>
              </div>

              {/* Main Results Card */}
              <Card className="bg-white shadow-xl border-0">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">Stress Level Assessment</h3>
                    {getStressLevelIcon(results.pss10_results.stress_level)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* PSS-10 Score */}
                  <div className={`p-6 rounded-xl ${getStressLevelColor(results.pss10_results.stress_level)}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold">
                          {results.pss10_results.total_score}/40
                        </div>
                        <div className="text-lg font-medium capitalize">
                          {results.pss10_results.stress_description}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {results.pss10_results.percentage}%
                        </div>
                        <div className="text-sm">Stress Intensity</div>
                      </div>
                    </div>
                  </div>

                  {/* ML Prediction */}
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      AI Model Prediction
                    </h4>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-blue-800 capitalize">
                        {results.ml_prediction.predicted_level} Stress Level
                      </span>
                      <span className="text-sm text-blue-600">
                        {Math.round(results.ml_prediction.confidence * 100)}% Confidence
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Details */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Concerns */}
                {results.analysis.key_concerns.length > 0 && (
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                        Key Concerns
                      </h4>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {results.analysis.key_concerns.map((concern, index) => (
                          <div key={index} className="bg-red-50 p-3 rounded-lg text-red-800 text-sm">
                            {concern}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Strengths */}
                {results.analysis.strengths.length > 0 && (
                  <Card className="bg-white shadow-lg border-0">
                    <CardHeader>
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <Award className="w-5 h-5 mr-2 text-green-500" />
                        Your Strengths
                      </h4>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {results.analysis.strengths.map((strength, index) => (
                          <div key={index} className="bg-green-50 p-3 rounded-lg text-green-800 text-sm">
                            {strength}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Recommendations */}
              <Card className="bg-white shadow-lg border-0">
                <CardHeader>
                  <h4 className="font-semibold text-gray-900 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    Personalized Recommendations
                  </h4>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {results.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-medium text-blue-600">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{recommendation}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Risk Assessment */}
              <Card className={`shadow-lg border-0 ${getStressLevelColor(results.risk_assessment.level)}`}>
                <CardHeader>
                  <h4 className="font-semibold flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Risk Assessment
                  </h4>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-lg">{results.risk_assessment.urgency}</p>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={resetAnalysis}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Take Again
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Save Results
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Footer */}
    <Footer />
    </div>
  );
};

export default StressAnalysis;