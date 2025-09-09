import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  FileText, 
  MessageCircle, 
  TrendingUp, 
  CheckSquare,
  Clock,
  Brain,
  Target,
  Lightbulb,
  Users,
  Award,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DebriefData {
  questionsAsked: string[];
  studentAnswers: string[];
  recruiterReactions: string[];
  nextSteps: string[];
}

const InterviewDebriefBuddy = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [debriefData, setDebriefData] = useState<DebriefData | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    intervalRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    toast({
      title: "Recording started",
      description: "Speak about your interview experience",
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const sampleTranscript = "So the interview went pretty well overall. The recruiter started by asking me about my background and experience with React. I explained my projects and how I've been building web applications for the past two years. She seemed impressed and nodded positively. Then she asked about my problem-solving approach, so I walked through a recent challenge I faced with state management. She asked follow-up questions about Redux vs Context API. Her reaction was very engaged, asking detailed technical questions. At the end, she mentioned they're moving fast with the hiring process and I should expect to hear back within a week for the next round.";
      
      const sampleDebrief: DebriefData = {
        questionsAsked: [
          "Tell me about your background and experience with React",
          "How do you approach problem-solving in development?",
          "What's your experience with Redux vs Context API?",
          "Can you walk me through a recent technical challenge?"
        ],
        studentAnswers: [
          "Explained my projects and 2+ years of web app development",
          "Walked through state management challenge example",
          "Discussed pros/cons of Redux vs Context API",
          "Detailed technical problem-solving process"
        ],
        recruiterReactions: [
          "Seemed impressed and nodded positively",
          "Very engaged, asking detailed follow-up questions",
          "Asked technical depth questions about implementation",
          "Maintained good eye contact and took notes"
        ],
        nextSteps: [
          "Moving fast with hiring process",
          "Expect to hear back within a week",
          "Next round will be technical interview",
          "Will receive calendar invite if selected"
        ]
      };

      setTranscript(sampleTranscript);
      setDebriefData(sampleDebrief);
      setIsProcessing(false);
      
      toast({
        title: "Interview debrief ready!",
        description: "Your interview has been structured and organized",
      });
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced AI extracts key insights from your voice notes"
    },
    {
      icon: Clock,
      title: "Save Time",
      description: "Capture everything in minutes, not hours of note-taking"
    },
    {
      icon: Target,
      title: "Structured Output",
      description: "Organized into actionable categories for easy review"
    },
    {
      icon: Lightbulb,
      title: "Smart Recognition",
      description: "Identifies questions, reactions, and next steps automatically"
    }
  ];

  const tips = [
    {
      icon: Mic,
      title: "Speak Clearly",
      description: "Find a quiet space and speak at a normal pace"
    },
    {
      icon: Users,
      title: "Include Details",
      description: "Mention specific questions, your responses, and interviewer reactions"
    },
    {
      icon: Award,
      title: "Note Next Steps",
      description: "Don't forget to mention any follow-up actions or timelines"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center space-x-2 bg-accent/50 px-4 py-2 rounded-full">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Interview Analysis</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Interview Debrief Buddy 📝
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          "Capture what happened before you forget." Transform your post-interview thoughts into structured, 
          actionable insights with the power of AI.
        </p>
      </div>

      {/* Features Grid */}
      {!debriefData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-subtle hover:shadow-medium transition-shadow duration-300">
              <CardContent className="p-6 text-center space-y-3">
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Recording Section */}
      <Card className="relative overflow-hidden border-0 shadow-large">
        <div className="absolute inset-0 bg-gradient-accent opacity-30" />
        <CardContent className="relative p-8 space-y-8">
          {/* Recording Interface */}
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center space-y-4">
              {!isRecording && !isProcessing && !debriefData ? (
                <>
                  <Button
                    size="lg"
                    variant="gradient"
                    onClick={startRecording}
                    className="h-24 w-24 rounded-full hover:scale-105 transition-transform duration-200"
                  >
                    <Mic className="h-10 w-10" />
                  </Button>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Ready to capture your interview?</p>
                    <p className="text-muted-foreground">Click the microphone to start recording</p>
                  </div>
                </>
              ) : isRecording ? (
                <div className="flex flex-col items-center space-y-4">
                  <Button
                    size="lg"
                    variant="recording"
                    onClick={stopRecording}
                    className="h-24 w-24 rounded-full animate-pulse-recording"
                  >
                    <Square className="h-8 w-8 fill-current" />
                  </Button>
                  <div className="flex items-center space-x-3 text-recording font-medium">
                    <div className="h-3 w-3 bg-recording rounded-full animate-pulse" />
                    <span className="text-lg">Recording: {formatTime(recordingTime)}</span>
                  </div>
                  <p className="text-muted-foreground">Speak naturally about your interview experience</p>
                </div>
              ) : isProcessing ? (
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-24 w-24 rounded-full bg-secondary/20 flex items-center justify-center">
                    <div className="animate-spin h-10 w-10 border-3 border-secondary border-t-transparent rounded-full" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-secondary">Processing with AI...</p>
                    <p className="text-muted-foreground">Transcribing and analyzing your interview</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-24 w-24 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckSquare className="h-10 w-10 text-success" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-lg font-medium text-success">Debrief Complete!</p>
                    <p className="text-muted-foreground">Your interview has been analyzed and structured</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tips Section */}
          {!debriefData && !isRecording && !isProcessing && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center">💡 Tips for Best Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-background/50 rounded-lg">
                      <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <tip.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{tip.title}</p>
                        <p className="text-xs text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Transcript Section */}
      {transcript && (
        <Card className="animate-scale-in border-0 shadow-medium">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-secondary" />
              <span>Raw Transcript</span>
              <Badge variant="secondary" className="ml-2">AI Generated</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-accent/20 rounded-lg p-6 text-sm leading-relaxed border-l-4 border-secondary">
              {transcript}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Structured Debrief */}
      {debriefData && (
        <div className="space-y-8 animate-fade-in">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">📊 Structured Analysis</h2>
            <p className="text-muted-foreground">Your interview organized into actionable insights</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Questions Asked */}
            <Card className="border-0 shadow-medium hover:shadow-large transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-primary">
                  <MessageCircle className="h-5 w-5" />
                  <span>Questions Asked</span>
                  <Badge variant="outline" className="ml-2">{debriefData.questionsAsked.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {debriefData.questionsAsked.map((question, index) => (
                  <div
                    key={index}
                    className="p-4 bg-accent/30 rounded-lg border-l-4 border-primary hover:bg-accent/40 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="flex-shrink-0 mt-0.5">Q{index + 1}</Badge>
                      <p className="text-sm leading-relaxed">{question}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Student Answers */}
            <Card className="border-0 shadow-medium hover:shadow-large transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-secondary">
                  <TrendingUp className="h-5 w-5" />
                  <span>Your Responses</span>
                  <Badge variant="outline" className="ml-2">{debriefData.studentAnswers.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {debriefData.studentAnswers.map((answer, index) => (
                  <div
                    key={index}
                    className="p-4 bg-secondary/10 rounded-lg border-l-4 border-secondary hover:bg-secondary/15 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="flex-shrink-0 mt-0.5">A{index + 1}</Badge>
                      <p className="text-sm leading-relaxed">{answer}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recruiter Reactions */}
            <Card className="border-0 shadow-medium hover:shadow-large transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-info">
                  <Users className="h-5 w-5" />
                  <span>Interviewer Reactions</span>
                  <Badge variant="outline" className="ml-2">{debriefData.recruiterReactions.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {debriefData.recruiterReactions.map((reaction, index) => (
                  <div
                    key={index}
                    className="p-4 bg-info/10 rounded-lg border-l-4 border-info hover:bg-info/15 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="flex-shrink-0 mt-0.5">R{index + 1}</Badge>
                      <p className="text-sm leading-relaxed">{reaction}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-0 shadow-medium hover:shadow-large transition-shadow duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-success">
                  <ArrowRight className="h-5 w-5" />
                  <span>Next Steps</span>
                  <Badge variant="outline" className="ml-2">{debriefData.nextSteps.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {debriefData.nextSteps.map((step, index) => (
                  <div
                    key={index}
                    className="p-4 bg-success/10 rounded-lg border-l-4 border-success hover:bg-success/15 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-3">
                      <Badge variant="secondary" className="flex-shrink-0 mt-0.5">S{index + 1}</Badge>
                      <p className="text-sm leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      {debriefData && (
        <Card className="border-0 shadow-medium bg-gradient-accent/20">
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-lg font-semibold">What's Next?</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => {
                  setDebriefData(null);
                  setTranscript("");
                  setRecordingTime(0);
                }}
                variant="outline"
                className="bg-background hover:bg-accent"
              >
                Record Another Interview
              </Button>
              <Button variant="gradient" className="gap-2">
                <FileText className="h-4 w-4" />
                Export Summary
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Bottom CTA */}
      {!debriefData && (
        <Card className="border-0 shadow-large bg-gradient-primary/5">
          <CardContent className="p-8 text-center space-y-4">
            <h3 className="text-xl font-bold">Ready to Get Started?</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Record your first interview debrief and see how AI can help you organize your thoughts 
              and prepare for future opportunities.
            </p>
            <Button variant="gradient" size="lg" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Try It Now
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InterviewDebriefBuddy;