import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Lightbulb, Target, Users, ChevronRight, Heart, Leaf, Accessibility, Stethoscope, Building, Wifi, Shield, BookOpen, Home, Car, Utensils, X, Brain, ShoppingCart, Code, Bookmark } from "lucide-react";
import { useState, useEffect } from "react";
import ProblemDetail from "@/components/ProblemDetail";
import SavedProblems from "@/components/SavedProblems";
import WelcomeAnimation from "@/components/WelcomeAnimation";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "../components/FeedbackForm";
import React from "react";
import ParticleBackground from "@/components/ParticleBackground"; // adjust path if needed





//icons



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
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);


  // Check if user has seen the welcome animation before
  useEffect(() => {
    setShowWelcome(true);
  }, []);

  

  

  const handleWelcomeComplete = () => {
    localStorage.setItem('evolve-welcome-seen', 'true');
    setShowWelcome(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };
  
  // fetching problems here
const [problems, setProblems] = useState([]);

useEffect(() => {
  const fetchProblems = async () => {
    try {
      
      const API_URL = import.meta.env.VITE_API_URL;
      const url = selectedCategory
        ? `evolve-backend-nu.vercel.app/api/problems/category/${selectedCategory}`
        : `evolve-backend-nu.vercel.app/api/problems`;

      const res = await fetch(url);
      const data = await res.json();
      console.log("Fetched problems:", data); // ✅ Debug log
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
    { name: "Software Engineering", icon: <Code className="w-4 h-4" />, color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30", key: "software-engineering" }
  ];

  const filteredProblems = problems.filter(problem => {
    
  const matchesCategory = selectedCategory
    ? problem.category.toLowerCase() === selectedCategory.toLowerCase()
    : true;

  const matchesSearch = searchQuery 
    ? problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.domain.toLowerCase().includes(searchQuery.toLowerCase())
    : true;

  

    

  return matchesCategory && matchesSearch;
});

  const handleExploreProblems = () => {
    setShowSearch(true);
    // Scroll to problems section
    document.getElementById('problems')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Show welcome animation on first visit
  if (showWelcome) {
    return <WelcomeAnimation onComplete={handleWelcomeComplete} />;
  }

  if (showSaved) {
    return <SavedProblems onBack={() => setShowSaved(false)} onSelectProblem={setSelectedProblem} />;
  }

  if (selectedProblem) {
    const problem = problems.find(p => p._id === selectedProblem);
    return <ProblemDetail problem={problem!} onBack={() => setSelectedProblem(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
       {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
      
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Evolve</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#problems" className="text-gray-300 hover:text-white transition-colors">Problems</a>
              <button onClick={() => setShowSaved(true)} className="text-gray-300 hover:text-white transition-colors flex items-center">
                <Bookmark className="w-4 h-4 mr-1" />
                Saved
              </button>
              <button onClick={() => setShowAbout(true)} className="text-gray-300 hover:text-white transition-colors animate-slideInLeft delay-300">About</button>
            </nav>
          </div>
        </div>
      </header>

      {/* About Model */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-slate-800 rounded-lg p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-sora text-4xl font-bold">About Evolve</h2>
              <button 
                onClick={() => setShowAbout(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="text-gray-300 space-y-4 animate-fadeUp">
              <p>
                Evolve is a platform designed to bridge the gap between innovation and real-world impact. We believe that the most meaningful solutions come from understanding genuine problems that affect communities, organizations, and individuals.
              </p>
              <p>
                Our mission is to connect innovators, entrepreneurs, researchers, and problem-solvers with challenges that matter. Whether you're looking for your next project, seeking to make a difference, or wanting to contribute your skills to meaningful causes, Evolve helps you discover opportunities that align with your passion and expertise.
              </p>
              <p>
                We curate problems across various domains including healthcare, environment, accessibility, public services, and education. Each problem is carefully documented with background information, existing solutions, their limitations, and the potential for innovation.
              </p>
              <p>
                Join us in building a future where technology and innovation serve humanity's greatest needs.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      
<section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight animate-fadeUp">
              Discover. Solve.
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Evolve.</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed animate-fadeUp">
              Discover meaningful problems across healthcare, environment, technology, and public services. 
              Find your next project that makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3" onClick={handleExploreProblems}>
                <Search className="w-5 h-5 mr-2" />
                Explore Problems
              </Button>
              <Button size="lg" className="bg-slate-800/80 border-slate-700/50 text-white hover:bg-slate-700/80 px-8 py-3" onClick={() => setShowAbout(true)}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      {showSearch && (
  <section className="py-8 px-6">
    <div className="container mx-auto max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Search problems by title, description, or domain..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-800/50 border-slate-700/50 text-white placeholder:text-gray-400 focus:border-blue-500/50 focus:ring-blue-500/20"
        />
      </div>
    </div>
  </section>
)}

      {/* Categories */}
      <section className="py-20 px-6" id="problems">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h3 className="text-4xl font-bold text-white mb-4">Explore by Category</h3>
      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Choose your domain and discover impactful challenges to work on.
      </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {/* All Problems Card */}
      <div
        onClick={() => setSelectedCategory(null)}
        className={`relative p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl cursor-pointer transition-all duration-300 group hover:bg-white/10 ${
          selectedCategory === null ? 'ring-2 ring-blue-400/50' : ''
        }`}
      >
        <div className="w-12 h-12 rounded-xl bg-blue-400/20 text-blue-300 border-blue-400/30 border flex items-center justify-center mb-4 mx-auto">
          <Target className="w-5 h-5" />
        </div>
        <h4 className="text-white text-sm font-semibold text-center">All Problems</h4>
      </div>

      {/* Dynamic Category Cards */}
      {categories.map((category) => (
        <div
          key={category.key}
          onClick={() => setSelectedCategory(category.key)}
          className={`relative p-6 rounded-2xl backdrop-blur-md bg-white/5 border border-white/10 shadow-xl cursor-pointer transition-all duration-300 group hover:bg-white/10 ${
            selectedCategory === category.key ? 'ring-2 ring-blue-400/50' : ''
          }`}
        >
          <div
            className={`w-12 h-12 rounded-xl ${category.color} border flex items-center justify-center mb-4 mx-auto`}
          >
            {category.icon}
          </div>
          <h4 className="text-white text-sm font-semibold text-center">{category.name}</h4>
        </div>
      ))}
    </div>
  </div>
</section>
      

      
      

     


      

      


      {/* Featured Problems */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              {selectedCategory 
                ? `${categories.find(c => c.key === selectedCategory)?.name} Problems` 
                : 'Featured Problems'
              }
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {selectedCategory 
                ? `Explore ${categories.find(c => c.key === selectedCategory)?.name.toLowerCase()} challenges that need innovative solutions`
                : 'Dive into complex challenges that need innovative solutions'
              }
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProblems.map((problem) => (
              <Card 
                key={problem._id} 
                className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group backdrop-blur-sm"
                onClick={() => setSelectedProblem(problem._id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/30">
                      {problem.domain}
                    </Badge>
                  <div>
                    {getIconForProblem(problem.category || problem.domain)}
                  </div>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors">
                    {problem.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {problem.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-blue-400 font-medium group-hover:text-blue-300 transition-colors">
                    Explore Challenge
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filteredProblems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No problems found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">Ready to Make an Impact?</h3>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of innovators who are building solutions that matter. 
              Start exploring problems that align with your passion and skills.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3">
              Get Started Today
            </Button>
          </div>
        </div>
      </section>

     


      {/*feedback*/}

      <FeedbackForm />
      




      


    
      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white">Evolve</h4>
              </div>
              <p className="text-gray-400">
                Connecting innovation with real-world impact.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-white mb-3">About</h5>
              <div className="text-gray-400 space-y-2">
                <p>
                  Evolve is a platform designed to bridge the gap between innovation and real-world impact. We believe that the most meaningful solutions come from understanding genuine problems that affect communities, organizations, and individuals.
                </p>
                <p>
                  Our mission is to connect innovators, entrepreneurs, researchers, and problem-solvers with challenges that matter.
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Evolve. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;


