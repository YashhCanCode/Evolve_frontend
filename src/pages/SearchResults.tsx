import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Lightbulb,
  ChevronRight,
  ArrowLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import ProblemDetail from "@/components/ProblemDetail";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch problems from backend
  useEffect(() => {
  const fetchProblems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/problems");
      const data = await res.json();
      setProblems(data);
    } catch (err) {
      console.error("Error fetching problems:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchProblems();
}, [searchParams]); // 👈 re-run on URL query change

  const filteredProblems = problems.filter((problem) => {
    const query = searchQuery.toLowerCase();
    return (
      problem.title?.toLowerCase().includes(query) ||
      problem.description?.toLowerCase().includes(query) ||
      problem.domain?.toLowerCase().includes(query)
    );
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  if (selectedProblem) {
    const problem = problems.find((p) => p._id === selectedProblem);
    return <ProblemDetail problem={problem!} onBack={() => setSelectedProblem(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-gray-300 hover:text-white hover:bg-slate-800/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Evolve</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Search Section */}
      <section className="py-8 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Search Results</h2>
            <p className="text-gray-400">
              {searchQuery
                ? `Showing results for "${searchQuery}"`
                : "Enter a search term to find problems"}
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
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
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="py-8 px-6">
        <div className="container mx-auto">
          {loading ? (
            <p className="text-gray-400 text-center">Loading problems...</p>
          ) : (
            <>
              {searchQuery && (
                <div className="mb-6">
                  <p className="text-gray-400">
                    Found {filteredProblems.length} problem
                    {filteredProblems.length !== 1 && "s"}
                  </p>
                </div>
              )}

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
                        <div className="text-white">{/* optional icon */}</div>
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

              {searchQuery && filteredProblems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg mb-4">
                    No problems found matching "{searchQuery}"
                  </p>
                  <p className="text-gray-500">
                    Try using different keywords or browse all problems
                  </p>
                  <Button
                    onClick={handleBack}
                    className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Browse All Problems
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResults;