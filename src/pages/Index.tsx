import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Lightbulb, Target, X, Brain, Stethoscope, Leaf, Accessibility, Building, BookOpen, ShoppingCart, Code, Bookmark, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import ProblemDetail from "@/components/ProblemDetail";
import SavedProblems from "@/components/SavedProblems";
import WelcomeAnimation from "@/components/WelcomeAnimation";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";
import React from "react";

const getIconForProblem = (categoryOrDomain: string) => {
  const key = categoryOrDomain.toLowerCase();
  const iconMap: Record<string, JSX.Element> = {
    healthcare: <Stethoscope className="w-5 h-5 text-red-400" />,
    environment: <Leaf className="w-5 h-5 text-green-400" />,
    accessibility: <Accessibility className="w-5 h-5 text-blue-400" />,
    "public services": <Building className="w-5 h-5 text-purple-400" />,
    education: <BookOpen className="w-5 h-5 text-yellow-400" />,
    "machine learning": <Brain className="w-5 h-5 text-pink-400" />,
    ai: <Brain className="w-5 h-5 text-indigo-400" />,
    ecommerce: <ShoppingCart className="w-5 h-5 text-orange-400" />,
    "software engineering": <Code className="w-5 h-5 text-cyan-400" />,
    default: <Lightbulb className="w-5 h-5 text-white" />,
  };
  return iconMap[key] || iconMap["default"];
};

const Index = () => {
  const navigate = useNavigate();
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [problems, setProblems] = useState([]);

  useEffect(() => setShowWelcome(true), []);

  const handleWelcomeComplete = () => {
    localStorage.setItem("evolve-welcome-seen", "true");
    setShowWelcome(false);
  };

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const url = selectedCategory
          ? `https://evolve-backend-nu.vercel.app/api/problems/category/${selectedCategory}`
          : `https://evolve-backend-nu.vercel.app/api/problems`;
        const res = await fetch(url);
        const data = await res.json();
        setProblems(data);
      } catch (err) {
        console.error("Error fetching problems:", err);
      }
    };
    fetchProblems();
  }, [selectedCategory]);

  const categories = [
    { name: "Healthcare", icon: <Stethoscope className="w-4 h-4" />, color: "bg-red-500/20 text-red-300 border-red-500/30", key: "healthcare" },
    { name: "Environment", icon: <Leaf className="w-4 h-4" />, color: "bg-green-500/20 text-green-300 border-green-500/30", key: "environment" },
    { name: "Accessibility", icon: <Accessibility className="w-4 h-4" />, color: "bg-blue-500/20 text-blue-300 border-blue-500/30", key: "accessibility" },
    { name: "Public Services", icon: <Building className="w-4 h-4" />, color: "bg-purple-500/20 text-purple-300 border-purple-500/30", key: "public-services" },
    { name: "Education", icon: <BookOpen className="w-4 h-4" />, color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30", key: "education" },
    { name: "Machine Learning", icon: <Brain className="w-4 h-4" />, color: "bg-pink-500/20 text-pink-300 border-pink-500/30", key: "machine-learning" },
    { name: "AI", icon: <Brain className="w-4 h-4" />, color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30", key: "ai" },
    { name: "E-commerce", icon: <ShoppingCart className="w-4 h-4" />, color: "bg-orange-500/20 text-orange-300 border-orange-500/30", key: "ecommerce" },
    { name: "Software Engineering", icon: <Code className="w-4 h-4" />, color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30", key: "software-engineering" },
  ];

  if (showWelcome) return <WelcomeAnimation onComplete={handleWelcomeComplete} />;
  if (showSaved) return <SavedProblems onBack={() => setShowSaved(false)} onSelectProblem={setSelectedProblem} />;
  if (selectedProblem) {
    const problem = problems.find(p => p._id === selectedProblem);
    return <ProblemDetail problem={problem!} onBack={() => setSelectedProblem(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">Evolve</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6">
            <a href="#problems" className="text-gray-300 hover:text-white">Problems</a>
            <button onClick={() => setShowSaved(true)} className="text-gray-300 hover:text-white flex items-center">
              <Bookmark className="w-4 h-4 mr-1" /> Saved
            </button>
            <button onClick={() => setShowAbout(true)} className="text-gray-300 hover:text-white">About</button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-300" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black/90 border-t border-white/10 px-4 py-3 space-y-3 text-gray-300">
            <a href="#problems" onClick={() => setMobileMenuOpen(false)}>Problems</a>
            <button onClick={() => { setShowSaved(true); setMobileMenuOpen(false); }}>Saved</button>
            <button onClick={() => { setShowAbout(true); setMobileMenuOpen(false); }}>About</button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 text-center md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
            Discover. Solve.
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Evolve.</span>
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl mb-8">
            Discover meaningful problems across healthcare, environment, and technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => setShowSearch(true)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <Search className="w-5 h-5 mr-2" /> Explore Problems
            </Button>
            <Button className="bg-slate-800 border-slate-700 text-white" onClick={() => setShowAbout(true)}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 md:px-6" id="problems">
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-4xl font-bold mb-2">Explore by Category</h3>
          <p className="text-gray-400 text-sm md:text-lg">Choose your domain and discover impactful challenges.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map(category => (
            <div
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`p-4 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 text-center cursor-pointer transition-all duration-300 hover:bg-white/10 ${
                selectedCategory === category.key ? "ring-2 ring-blue-400/50" : ""
              }`}
            >
              <div className={`w-10 h-10 ${category.color} border flex items-center justify-center rounded-lg mx-auto mb-2`}>
                {category.icon}
              </div>
              <h4 className="text-sm font-semibold">{category.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Problems Section */}
      <section className="py-12 px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {problems.map(problem => (
            <Card
              key={problem._id}
              className="bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300"
              onClick={() => setSelectedProblem(problem._id)}
            >
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge className="bg-blue-500/20 text-blue-300">{problem.domain}</Badge>
                  {getIconForProblem(problem.category || problem.domain)}
                </div>
                <CardTitle className="text-white text-lg">{problem.title}</CardTitle>
                <CardDescription className="text-gray-400 text-sm">{problem.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-10 px-6 text-center md:text-left">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-xl font-bold mb-2">Evolve</h4>
            <p className="text-gray-400 mb-3">Transforming problems into innovation.</p>
            <p className="text-sm text-gray-400">📧 <a href="mailto:yashwanthkonnuru@gmail.com" className="text-blue-400 hover:underline">yashwanthkonnuru@gmail.com</a></p>
          </div>
          <div>
            <h5 className="font-semibold mb-2">About</h5>
            <p className="text-gray-400 text-sm">Built by student developers for the world. Join us in connecting ideas with innovation.</p>
          </div>
        </div>
        <div className="border-t border-white/10 mt-6 pt-4 text-gray-500 text-sm text-center">
          © 2025 Evolve. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;