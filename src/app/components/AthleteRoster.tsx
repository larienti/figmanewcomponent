import { useState } from 'react';
import { AthleteBall } from './AthleteBall';
import { Toolbar } from './Toolbar';
import { motion } from 'motion/react';

export interface Exercise {
  id: string;
  name: string;
  icon: string;
  assignedTools: string[];
}

export interface Athlete {
  id: string;
  name: string;
  position: string;
  color: string;
  x: number;
  y: number;
  exercises: Exercise[];
}

export interface Tool {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const MOCK_ATHLETES: Athlete[] = [
  {
    id: 'a1',
    name: 'Sarah Johnson',
    position: 'Forward',
    color: '#3B82F6',
    x: 200,
    y: 250,
    exercises: [
      { id: 'e1', name: 'Sprint', icon: '⚡', assignedTools: [] },
      { id: 'e2', name: 'Endurance', icon: '🏃', assignedTools: [] },
      { id: 'e3', name: 'Strength', icon: '💪', assignedTools: [] },
    ],
  },
  {
    id: 'a2',
    name: 'Marcus Chen',
    position: 'Midfielder',
    color: '#10B981',
    x: 450,
    y: 180,
    exercises: [
      { id: 'e4', name: 'Agility', icon: '🎯', assignedTools: [] },
      { id: 'e5', name: 'Cardio', icon: '❤️', assignedTools: [] },
      { id: 'e6', name: 'Core', icon: '🔥', assignedTools: [] },
    ],
  },
  {
    id: 'a3',
    name: 'Emily Rodriguez',
    position: 'Defender',
    color: '#F59E0B',
    x: 650,
    y: 300,
    exercises: [
      { id: 'e7', name: 'Balance', icon: '⚖️', assignedTools: [] },
      { id: 'e8', name: 'Power', icon: '💥', assignedTools: [] },
      { id: 'e9', name: 'Flexibility', icon: '🤸', assignedTools: [] },
    ],
  },
  {
    id: 'a4',
    name: 'Jordan Lee',
    position: 'Goalkeeper',
    color: '#8B5CF6',
    x: 350,
    y: 420,
    exercises: [
      { id: 'e10', name: 'Reflexes', icon: '✋', assignedTools: [] },
      { id: 'e11', name: 'Jump', icon: '🦘', assignedTools: [] },
      { id: 'e12', name: 'Focus', icon: '👁️', assignedTools: [] },
    ],
  },
  {
    id: 'a5',
    name: 'Alex Turner',
    position: 'Wing',
    color: '#EC4899',
    x: 550,
    y: 480,
    exercises: [
      { id: 'e13', name: 'Speed', icon: '🏎️', assignedTools: [] },
      { id: 'e14', name: 'Stamina', icon: '🔋', assignedTools: [] },
      { id: 'e15', name: 'Technique', icon: '⚙️', assignedTools: [] },
    ],
  },
];

const MOCK_TOOLS: Tool[] = [
  { id: 't1', name: 'Timer', icon: '⏱️', color: '#3B82F6' },
  { id: 't2', name: 'Weight', icon: '🏋️', color: '#10B981' },
  { id: 't3', name: 'Track', icon: '📊', color: '#F59E0B' },
  { id: 't4', name: 'Monitor', icon: '📱', color: '#8B5CF6' },
  { id: 't5', name: 'Video', icon: '📹', color: '#EC4899' },
];

const CONTAINER_WIDTH = 720;
const CONTAINER_HEIGHT = 520;

export function AthleteRoster() {
  const [athletes] = useState<Athlete[]>(MOCK_ATHLETES);
  const [selectedAthlete, setSelectedAthlete] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  // Calculate grid layout - optimized for 6-pack (3 columns, 2 rows)
  const columns = 3;
  const rows = Math.ceil(athletes.length / columns);

  const handleAthleteSelect = (athleteId: string) => {
    setSelectedAthlete(selectedAthlete === athleteId ? null : athleteId);
  };

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(selectedTool === toolId ? null : toolId);
  };

  const handleExerciseClick = (athleteId: string, exerciseId: string) => {
    if (!selectedTool) return;

    // Toggle tool assignment
    const athlete = athletes.find(a => a.id === athleteId);
    if (!athlete) return;

    const exercise = athlete.exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    const hasTool = exercise.assignedTools.includes(selectedTool);
    if (hasTool) {
      exercise.assignedTools = exercise.assignedTools.filter((t) => t !== selectedTool);
    } else {
      exercise.assignedTools.push(selectedTool);
    }
  };

  return (
    <div className="relative w-full h-full bg-[#f5f5f7] overflow-hidden flex items-center justify-center">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-slate-100/20 pointer-events-none" />

      {/* Main Container */}
      <motion.div
        className="relative bg-white rounded-[24px] shadow-[0_20px_60px_-20px_rgba(0,0,0,0.15)] border border-black/5 overflow-visible"
        style={{
          width: CONTAINER_WIDTH,
          height: CONTAINER_HEIGHT,
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Subtle inner shadow */}
        <div className="absolute inset-0 rounded-[24px] shadow-[inset_0_2px_8px_-2px_rgba(0,0,0,0.1)] pointer-events-none" />

        {/* Athletes Grid - 6-pack optimized (3x2) */}
        <div
          className="relative w-full h-full p-6 grid gap-4"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
          }}
        >
          {athletes.map((athlete) => (
            <AthleteBall
              key={athlete.id}
              athlete={athlete}
              isSelected={selectedAthlete === athlete.id}
              hasOtherSelected={selectedAthlete !== null && selectedAthlete !== athlete.id}
              onSelect={handleAthleteSelect}
              onExerciseClick={handleExerciseClick}
              selectedTool={selectedTool}
              tools={MOCK_TOOLS}
            />
          ))}
        </div>

        {/* Exercise Node Overlay Layer */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1000 }}>
          {athletes.map((athlete) =>
            selectedAthlete === athlete.id ? (
              <div key={`overlay-${athlete.id}`} className="pointer-events-auto">
                {/* Placeholder - actual nodes rendered in AthleteBall */}
              </div>
            ) : null
          )}
        </div>
      </motion.div>

      {/* Toolbar */}
      <Toolbar
        tools={MOCK_TOOLS}
        selectedTool={selectedTool}
        onToolSelect={handleToolSelect}
      />
    </div>
  );
}