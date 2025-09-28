import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Brain, User, AlertTriangle, Clock } from "lucide-react";
import { TrafficDecision } from "@/hooks/useTrafficSystem";

interface DecisionLogProps {
  decisions: TrafficDecision[];
}

export function DecisionLog({ decisions }: DecisionLogProps) {
  const getDecisionIcon = (type: string) => {
    switch (type) {
      case 'ai':
        return <Brain className="h-4 w-4 text-accent" />;
      case 'manual':
        return <User className="h-4 w-4 text-warning" />;
      case 'emergency':
        return <AlertTriangle className="h-4 w-4 text-emergency" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getDecisionBadge = (type: string) => {
    switch (type) {
      case 'ai':
        return <Badge variant="default" className="bg-accent text-accent-foreground">AI</Badge>;
      case 'manual':
        return <Badge variant="secondary" className="bg-warning text-black">Manual</Badge>;
      case 'emergency':
        return <Badge variant="destructive">Emergency</Badge>;
      default:
        return <Badge variant="outline">System</Badge>;
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Brain className="mr-2 h-5 w-5 text-accent" />
          Recent Decisions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-3">
            {decisions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Brain className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No decisions recorded yet</p>
              </div>
            ) : (
              decisions.map((decision) => (
                <div
                  key={decision.id}
                  className="p-3 bg-secondary/30 rounded-lg border border-border"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getDecisionIcon(decision.type)}
                      <span className="text-sm font-medium">
                        Intersection {decision.intersectionId}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getDecisionBadge(decision.type)}
                      <span className="text-xs text-muted-foreground">
                        {decision.timestamp}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">Decision:</span>{" "}
                      <span className="capitalize">
                        {decision.decision.replace(/_/g, ' ')}
                      </span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {decision.reason}
                    </p>
                    {decision.confidence && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Confidence:</span>
                        <Badge variant="outline" className="text-xs">
                          {decision.confidence}%
                        </Badge>
                      </div>
                    )}
                    {decision.user && (
                      <p className="text-xs text-muted-foreground">
                        by {decision.user}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}