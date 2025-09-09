import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic, MicOff, Play, Square, FileText, MessageCircle, TrendingUp, CheckSquare } from "lucide-react";
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

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Interview Debrief Buddy 📝
        </h1>
        <p className="text-muted-foreground text-lg">
          "Capture what happened before you forget."
        </p>
      </div>

      {/* Recording Section */}
      <Card className="relative overflow-hidden border-0 shadow-large">
        <div className="absolute inset-0 bg-gradient-accent opacity-50" />
        <CardContent className="relative p-8 text-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            {!isRecording && !isProcessing && !debriefData ? (
              <Button
                size="lg"
                variant="gradient"
                onClick={startRecording}
                className="h-20 w-20 rounded-full hover:scale-105 transition-transform duration-200"
              >
                <Mic className="h-8 w-8" />
              </Button>
            ) : isRecording ? (
              <div className="flex flex-col items-center space-y-4">
                <Button
                  size="lg"
                  variant="recording"
                  onClick={stopRecording}
                  className="h-20 w-20 rounded-full animate-pulse-recording"
                >
                  <Square className="h-6 w-6 fill-current" />
                </Button>
                <div className="flex items-center space-x-2 text-recording font-medium">
                  <div className="h-2 w-2 bg-recording rounded-full animate-pulse" />
                  <span>Recording: {formatTime(recordingTime)}</span>
                </div>
              </div>
            ) : isProcessing ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-secondary/20 flex items-center justify-center">
                  <div className="animate-spin h-8 w-8 border-2 border-secondary border-t-transparent rounded-full" />
                </div>
                <p className="text-secondary font-medium">Processing with AI...</p>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-success">
                <CheckSquare className="h-6 w-6" />
                <span className="font-medium">Debrief Complete!</span>
              </div>
            )}
          </div>
          
          {!debriefData && (
            <p className="text-muted-foreground max-w-md mx-auto">
              Right after your interview, speak a quick voice note about what happened. 
              I'll help you organize and structure your thoughts.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Transcript Section */}
      {transcript && (
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-secondary" />
              <span>Raw Transcript</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-accent/30 rounded-lg p-4 text-sm leading-relaxed">
              {transcript}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Structured Debrief */}
      {debriefData && (
        <div className="grid gap-6 md:grid-cols-2 animate-fade-in-up">
          {/* Questions Asked */}
          <Card className="border-0 shadow-medium">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-primary">
                <MessageCircle className="h-5 w-5" />
                <span>Questions Asked</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {debriefData.questionsAsked.map((question, index) => (
                <div
                  key={index}
                  className="p-3 bg-accent/40 rounded-lg border-l-3 border-primary"
                >
                  <p className="text-sm leading-relaxed">{question}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Student Answers */}
          <Card className="border-0 shadow-medium">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-secondary">
                <TrendingUp className="h-5 w-5" />
                <span>Your Answers</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {debriefData.studentAnswers.map((answer, index) => (
                <div
                  key={index}
                  className="p-3 bg-secondary/10 rounded-lg border-l-3 border-secondary"
                >
                  <p className="text-sm leading-relaxed">{answer}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recruiter Reactions */}
          <Card className="border-0 shadow-medium">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-info">
                <Play className="h-5 w-5" />
                <span>Recruiter Reactions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {debriefData.recruiterReactions.map((reaction, index) => (
                <div
                  key={index}
                  className="p-3 bg-info/10 rounded-lg border-l-3 border-info"
                >
                  <p className="text-sm leading-relaxed">{reaction}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-0 shadow-medium">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-success">
                <CheckSquare className="h-5 w-5" />
                <span>Next Steps</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {debriefData.nextSteps.map((step, index) => (
                <div
                  key={index}
                  className="p-3 bg-success/10 rounded-lg border-l-3 border-success"
                >
                  <p className="text-sm leading-relaxed">{step}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reset Button */}
      {debriefData && (
        <div className="text-center">
          <Button
            onClick={() => {
              setDebriefData(null);
              setTranscript("");
              setRecordingTime(0);
            }}
            variant="outline"
            className="bg-background hover:bg-accent"
          >
            Start New Debrief
          </Button>
        </div>
      )}
    </div>
  );
};

export default InterviewDebriefBuddy;