import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Athlete, Tool } from './AthleteRoster';
import { ExerciseNode } from './ExerciseNode';
import { ATHLETE_SIZES, EXERCISE_RADIUS, ANIMATIONS, COLORS } from './constants';

interface AthleteBallProps {
  athlete: Athlete;
  isSelected: boolean;
  hasOtherSelected: boolean;
  onSelect: (athleteId: string) => void;
  onExerciseClick: (athleteId: string, exerciseId: string) => void;
  selectedTool: string | null;
  tools: Tool[];
}

export function AthleteBall({
  athlete,
  isSelected,
  hasOtherSelected,
  onSelect,
  onExerciseClick,
  selectedTool,
  tools,
}: AthleteBallProps) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  const [expandUpward, setExpandUpward] = useState(false);

  // Check if nodes should expand upward or downward based on available space
  useEffect(() => {
    if (!isSelected || !bubbleRef.current) return;

    const bubbleRect = bubbleRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - bubbleRect.bottom;
    const spaceAbove = bubbleRect.top;

    // Estimate overlay height (roughly 140px for exercise nodes)
    const estimatedOverlayHeight = 140;

    // If not enough space below but more space above, expand upward
    if (spaceBelow < estimatedOverlayHeight && spaceAbove > spaceBelow) {
      setExpandUpward(true);
    } else {
      setExpandUpward(false);
    }
  }, [isSelected]);

  return (
    <motion.div
      ref={bubbleRef}
      className="relative flex items-center justify-center"
      style={{ zIndex: isSelected ? 50 : 1 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={ANIMATIONS.smooth}
    >

      {/* Exercise nodes overlay - high z-index to go over everything */}
      {isSelected && (
        <motion.div
          className={`absolute left-1/2 -translate-x-1/2 flex flex-wrap gap-2 justify-center bg-white/95 backdrop-blur-xl rounded-[16px] p-3 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.25)] border border-black/5 ${
            expandUpward ? 'bottom-full mb-3' : 'top-full mt-3'
          }`}
          initial={{ opacity: 0, y: expandUpward ? 10 : -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1 }}
          style={{ zIndex: 1001, minWidth: '200px', maxWidth: '320px' }}
        >
          {athlete.exercises.map((exercise, index) => (
            <ExerciseNode
              key={exercise.id}
              exercise={exercise}
              color={athlete.color}
              onClick={() => onExerciseClick(athlete.id, exercise.id)}
              selectedTool={selectedTool}
              tools={tools}
              index={index}
            />
          ))}
        </motion.div>
      )}

      {/* Main athlete bubble */}
      <motion.div
        className="cursor-pointer w-full h-full"
        onClick={() => onSelect(athlete.id)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Bubble with rounded edges - fills grid cell */}
        <motion.div
          className="relative flex flex-col items-center justify-center shadow-[0_8px_30px_-8px_rgba(0,0,0,0.2)] border border-black/10 overflow-hidden w-full h-full"
          style={{
            backgroundColor: athlete.color,
            borderRadius: '20px',
          }}
          animate={{
            borderRadius: isSelected ? '24px' : '20px',
            boxShadow: isSelected
              ? '0 12px 40px -10px rgba(0,0,0,0.3)'
              : '0 8px 30px -8px rgba(0,0,0,0.2)',
          }}
          transition={ANIMATIONS.smooth}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10" />

          {/* Shine effect */}
          <div className="absolute top-[15%] left-[20%] w-[30%] h-[30%] bg-white rounded-full opacity-40 blur-xl" />

          {/* Content */}
          <div className="relative z-10 text-center px-3 max-w-full">
            <div className="font-semibold text-white text-[15px] break-words leading-tight">
              {athlete.name.split(' ')[0]}
            </div>
            <div className="text-[10px] text-white/80 mt-1">
              {athlete.position}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </motion.div>
  );
}
