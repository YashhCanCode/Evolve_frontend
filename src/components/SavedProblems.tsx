
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Bookmark, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

interface Problem {
  _id: string;
  title: string;
  domain: string;
  icon: React.ReactNode;
  description: string;
  background: string;
  existingSolutions: string[];
  limitations: string[];
}

interface SavedProblemsProps {
  onBack: () => void;
  onSelectProblem: (problemId: string) => void;
}

const SavedProblems = ({ onBack, onSelectProblem }: SavedProblemsProps) => {
  const [savedProblems, setSavedProblems] = useState<Problem[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedProblems') || '[]');
    setSavedProblems(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Problems
            </Button>
            <div className="flex items-center space-x-3">
              <Bookmark className="w-5 h-5 text-blue-400" />
              <span className="text-white font-semibold">Saved Problems</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">Your Saved Problems</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Problems you've bookmarked for future reference and exploration
            </p>
          </div>

          {savedProblems.length === 0 ? (
            <div className="text-center py-20">
              <Bookmark className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">No Saved Problems</h3>
              <p className="text-gray-400 mb-6">
                Start exploring problems and save the ones that interest you most.
              </p>
              <Button onClick={onBack} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Explore Problems
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedProblems.map((problem) => (
                <Card 
                  key={problem._id} 
                  className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer group backdrop-blur-sm"
                  onClick={() => onSelectProblem(problem._id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 border-blue-500/30">
                        {problem.domain}
                      </Badge>
                      <div className="text-white">
                        {problem.icon}
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
                      View Problem
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedProblems;
