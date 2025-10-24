
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, AlertCircle, Lightbulb, CheckCircle, X, Bookmark, BookmarkCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

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

interface ProblemDetailProps {
  problem: Problem;
  onBack: () => void;
}

const ProblemDetail = ({ problem, onBack }: ProblemDetailProps) => {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {

    window.scrollTo(0, 0);
    
    // Check if problem is already saved
    
    const savedProblems = JSON.parse(localStorage.getItem('savedProblems') || '[]');
    setIsSaved(savedProblems.some((p: Problem) => p._id === problem._id));
  }, [problem._id]);

  const handleSaveProblem = () => {
    const savedProblems = JSON.parse(localStorage.getItem('savedProblems') || '[]');
    
    if (isSaved) {
      // Remove from saved
      const updatedProblems = savedProblems.filter((p: Problem) => p._id !== problem._id);
      localStorage.setItem('savedProblems', JSON.stringify(updatedProblems));
      setIsSaved(false);
      toast({
        title: "Problem removed",
        description: "Problem removed from your saved list",
      });
    } else {
      // Add to saved
      const updatedProblems = [...savedProblems, problem];
      localStorage.setItem('savedProblems', JSON.stringify(updatedProblems));
      setIsSaved(true);
      toast({
        title: "Problem saved!",
        description: "Problem added to your saved list",
      });
    }
  };

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
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                {problem.domain}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Problem Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              {problem.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {problem.title}
              </h1>
              <p className="text-xl text-gray-300">
                {problem.description}
              </p>
            </div>
            <Button
              onClick={handleSaveProblem}
              variant="outline"
              className="bg-slate-800/50 border-slate-700/50 text-white hover:bg-slate-700/50"
            >
              {isSaved ? (
                <>
                  <BookmarkCheck className="w-4 h-4 mr-2" />
                  Saved
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Problem
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Problem Background */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-400" />
                Problem Background
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                {problem.background}
              </p>
            </CardContent>
          </Card>

          {/* Existing Solutions */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                Existing Solutions
              </CardTitle>
              <CardDescription className="text-gray-400">
                Current approaches and their implementations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {problem.existingSolutions.map((solution, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">{solution}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Limitations */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <X className="w-5 h-5 mr-2 text-red-400" />
                Current Limitations
              </CardTitle>
              <CardDescription className="text-gray-400">
                Challenges and gaps in existing solutions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {problem.limitations.map((limitation, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">{limitation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Innovation Challenge */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-400" />
                What Can You Do Better?
              </CardTitle>
              <CardDescription className="text-gray-400">
                Your opportunity to innovate and make an impact
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Given the existing solutions and their limitations, how might you approach this problem differently? 
                  Consider new technologies, methodologies, or perspectives that could address the current gaps.
                </p>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <h4 className="text-blue-300 font-semibold mb-2">Think About:</h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>• How could emerging technologies be applied?</li>
                    <li>• What user needs are currently unmet?</li>
                    <li>• How might you reduce costs or complexity?</li>
                    <li>• What partnerships or collaborations could enable new solutions?</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
