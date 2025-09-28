import { useState, useEffect, useCallback } from 'react';

export interface TrafficIntersection {
  id: number;
  name: string;
  currentSignal: 'red' | 'amber' | 'green';
  timer: number;
  maxTimer: number;
  queueLength: number;
  cars: number;
  trucks: number;
  bikes: number;
  buses: number;
  emergencyVehicle: boolean;
  aiSuggestion: string;
  confidence: number;
  lastDecision: string;
  decisionReason: string;
  status: 'online' | 'offline' | 'maintenance';
  coordinates: { x: number; y: number };
  congestionLevel: 'low' | 'medium' | 'high';
}

export interface TrafficDecision {
  id: number;
  intersectionId: number;
  timestamp: string;
  decision: string;
  reason: string;
  confidence: number;
  type: 'ai' | 'manual' | 'emergency';
  user?: string;
}

export interface SystemMode {
  current: 'auto' | 'semi' | 'manual';
  emergencyActive: boolean;
  peakHourActive: boolean;
  eventModeActive: boolean;
}

const initialIntersections: TrafficIntersection[] = [
  {
    id: 1,
    name: 'Main St & 1st Ave',
    currentSignal: 'green',
    timer: 45,
    maxTimer: 60,
    queueLength: 12,
    cars: 12,
    trucks: 2,
    bikes: 3,
    buses: 1,
    emergencyVehicle: false,
    aiSuggestion: 'extend_green',
    confidence: 92,
    lastDecision: 'Extended green by 15s',
    decisionReason: 'High queue length detected, optimizing flow',
    status: 'online',
    coordinates: { x: 30, y: 40 },
    congestionLevel: 'medium'
  },
  {
    id: 2,
    name: 'Oak St & 2nd Ave',
    currentSignal: 'red',
    timer: 25,
    maxTimer: 45,
    queueLength: 8,
    cars: 8,
    trucks: 1,
    bikes: 1,
    buses: 0,
    emergencyVehicle: false,
    aiSuggestion: 'maintain_red',
    confidence: 88,
    lastDecision: 'Maintained red signal',
    decisionReason: 'Cross traffic priority required',
    status: 'online',
    coordinates: { x: 50, y: 60 },
    congestionLevel: 'low'
  },
  {
    id: 3,
    name: 'Pine St & 3rd Ave',
    currentSignal: 'amber',
    timer: 5,
    maxTimer: 10,
    queueLength: 15,
    cars: 15,
    trucks: 4,
    bikes: 2,
    buses: 2,
    emergencyVehicle: true,
    aiSuggestion: 'switch_to_green',
    confidence: 95,
    lastDecision: 'Emergency override - Green wave',
    decisionReason: 'Emergency vehicle detected, creating priority corridor',
    status: 'online',
    coordinates: { x: 70, y: 30 },
    congestionLevel: 'high'
  },
  {
    id: 4,
    name: 'Elm St & 4th Ave',
    currentSignal: 'green',
    timer: 28,
    maxTimer: 50,
    queueLength: 6,
    cars: 6,
    trucks: 0,
    bikes: 5,
    buses: 0,
    emergencyVehicle: false,
    aiSuggestion: 'reduce_green',
    confidence: 78,
    lastDecision: 'Reduced green time',
    decisionReason: 'Low traffic detected, balancing network',
    status: 'online',
    coordinates: { x: 20, y: 70 },
    congestionLevel: 'low'
  }
];

export function useTrafficSystem() {
  const [intersections, setIntersections] = useState<TrafficIntersection[]>(initialIntersections);
  const [decisions, setDecisions] = useState<TrafficDecision[]>([]);
  const [systemMode, setSystemMode] = useState<SystemMode>({
    current: 'auto',
    emergencyActive: false,
    peakHourActive: false,
    eventModeActive: false
  });
  const [isRunning, setIsRunning] = useState(true);

  // AI Decision Logic
  const makeAIDecision = useCallback((intersection: TrafficIntersection): { decision: string; reason: string; confidence: number } => {
    const { currentSignal, timer, queueLength, emergencyVehicle, cars, trucks, buses } = intersection;
    
    // Emergency vehicle priority
    if (emergencyVehicle) {
      return {
        decision: 'create_green_wave',
        reason: 'Emergency vehicle detected - creating priority corridor',
        confidence: 98
      };
    }

    // High congestion logic
    if (queueLength > 10 && currentSignal === 'red' && timer < 10) {
      return {
        decision: 'switch_to_green',
        reason: 'High queue detected - reducing wait time',
        confidence: 85 + Math.min(queueLength, 10)
      };
    }

    // Traffic balancing
    const totalVehicles = cars + trucks * 2 + buses * 3; // Weight heavier vehicles
    
    if (currentSignal === 'green') {
      if (totalVehicles < 5 && timer > 20) {
        return {
          decision: 'reduce_green',
          reason: 'Low traffic - balancing network efficiency',
          confidence: 80
        };
      }
      if (totalVehicles > 15 && timer < 40) {
        return {
          decision: 'extend_green',
          reason: 'High traffic volume - extending green phase',
          confidence: 88
        };
      }
    }

    // Default maintenance
    return {
      decision: 'maintain_current',
      reason: 'Traffic flow stable - maintaining current state',
      confidence: 75
    };
  }, []);

  // Apply AI Decision
  const applyAIDecision = useCallback((intersectionId: number) => {
    if (systemMode.current === 'manual') return;

    setIntersections(prev => prev.map(intersection => {
      if (intersection.id !== intersectionId) return intersection;

      const aiDecision = makeAIDecision(intersection);
      let newSignal = intersection.currentSignal;
      let newTimer = intersection.timer;
      let newMaxTimer = intersection.maxTimer;

      switch (aiDecision.decision) {
        case 'switch_to_green':
          if (intersection.currentSignal === 'red') {
            newSignal = 'green';
            newTimer = 45;
            newMaxTimer = 60;
          }
          break;
        case 'switch_to_red':
          if (intersection.currentSignal === 'green') {
            newSignal = 'amber';
            newTimer = 5;
            newMaxTimer = 5;
          }
          break;
        case 'extend_green':
          if (intersection.currentSignal === 'green') {
            newTimer = Math.min(newTimer + 15, 80);
            newMaxTimer = Math.min(newMaxTimer + 15, 80);
          }
          break;
        case 'reduce_green':
          if (intersection.currentSignal === 'green') {
            newTimer = Math.max(newTimer - 10, 10);
          }
          break;
        case 'create_green_wave':
          newSignal = 'green';
          newTimer = 60;
          newMaxTimer = 60;
          break;
      }

      // Record decision
      const decision: TrafficDecision = {
        id: Date.now() + Math.random(),
        intersectionId: intersection.id,
        timestamp: new Date().toLocaleTimeString(),
        decision: aiDecision.decision,
        reason: aiDecision.reason,
        confidence: aiDecision.confidence,
        type: intersection.emergencyVehicle ? 'emergency' : 'ai'
      };

      setDecisions(prev => [decision, ...prev.slice(0, 19)]); // Keep last 20 decisions

      return {
        ...intersection,
        currentSignal: newSignal,
        timer: newTimer,
        maxTimer: newMaxTimer,
        aiSuggestion: aiDecision.decision,
        confidence: aiDecision.confidence,
        lastDecision: aiDecision.decision.replace('_', ' ').toUpperCase(),
        decisionReason: aiDecision.reason
      };
    }));
  }, [makeAIDecision, systemMode.current]);

  // Manual Override
  const manualOverride = useCallback((intersectionId: number, signal: 'red' | 'amber' | 'green', user: string = 'Traffic Officer') => {
    setIntersections(prev => prev.map(intersection => {
      if (intersection.id !== intersectionId) return intersection;

      let newTimer = intersection.timer;
      switch (signal) {
        case 'green':
          newTimer = 45;
          break;
        case 'amber':
          newTimer = 5;
          break;
        case 'red':
          newTimer = 30;
          break;
      }

      // Record manual decision
      const decision: TrafficDecision = {
        id: Date.now() + Math.random(),
        intersectionId: intersection.id,
        timestamp: new Date().toLocaleTimeString(),
        decision: `force_${signal}`,
        reason: `Manual override by ${user}`,
        confidence: 100,
        type: 'manual',
        user
      };

      setDecisions(prev => [decision, ...prev.slice(0, 19)]);

      return {
        ...intersection,
        currentSignal: signal,
        timer: newTimer,
        lastDecision: `Manual ${signal.toUpperCase()}`,
        decisionReason: `Manual override by ${user}`
      };
    }));
  }, []);

  // Simulate traffic changes
  const simulateTrafficUpdate = useCallback(() => {
    setIntersections(prev => prev.map(intersection => {
      // Simulate vehicle arrivals/departures
      const vehicleChange = Math.floor(Math.random() * 6) - 3; // -3 to +3
      const newCars = Math.max(0, intersection.cars + vehicleChange);
      const newQueueLength = Math.max(0, intersection.queueLength + Math.floor(Math.random() * 4) - 2);
      
      // Randomly trigger emergency vehicles (5% chance)
      const emergencyVehicle = Math.random() < 0.05 ? true : intersection.emergencyVehicle;
      
      // Update congestion level
      let congestionLevel: 'low' | 'medium' | 'high' = 'low';
      if (newQueueLength > 8) congestionLevel = 'medium';
      if (newQueueLength > 15) congestionLevel = 'high';

      return {
        ...intersection,
        cars: newCars,
        queueLength: newQueueLength,
        emergencyVehicle,
        congestionLevel,
        trucks: Math.max(0, intersection.trucks + Math.floor(Math.random() * 3) - 1),
        bikes: Math.max(0, intersection.bikes + Math.floor(Math.random() * 3) - 1)
      };
    }));
  }, []);

  // Timer countdown and signal progression
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setIntersections(prev => prev.map(intersection => {
        if (intersection.timer <= 0) {
          let newSignal: 'red' | 'amber' | 'green' = intersection.currentSignal;
          let newTimer = intersection.timer;

          // Signal progression logic
          switch (intersection.currentSignal) {
            case 'green':
              newSignal = 'amber';
              newTimer = 5;
              break;
            case 'amber':
              newSignal = 'red';
              newTimer = 30;
              break;
            case 'red':
              newSignal = 'green';
              newTimer = 45;
              break;
          }

          return { ...intersection, currentSignal: newSignal, timer: newTimer };
        }

        return { ...intersection, timer: intersection.timer - 1 };
      }));

      // Trigger AI decisions periodically
      if (Math.random() < 0.3) { // 30% chance each second
        const randomIntersection = Math.floor(Math.random() * intersections.length) + 1;
        applyAIDecision(randomIntersection);
      }

      // Update traffic simulation
      if (Math.random() < 0.1) { // 10% chance each second
        simulateTrafficUpdate();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, intersections.length, applyAIDecision, simulateTrafficUpdate]);

  return {
    intersections,
    decisions,
    systemMode,
    isRunning,
    setSystemMode,
    setIsRunning,
    manualOverride,
    applyAIDecision
  };
}