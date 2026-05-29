import { motion } from 'motion/react';
import { Exercise, Tool } from './AthleteRoster';
import { NODE_SIZE, COLORS, ANIMATIONS, STAGGER_DELAY } from './constants';

interface ExerciseNodeProps {
  exercise: Exercise;
  color: string;
  onClick: () => void;
  selectedTool: string | null;
  tools: Tool[];
  index: number;
}

export function ExerciseNode({
  exercise,
  color,
  onClick,
  selectedTool,
  tools,
  index,
}: ExerciseNodeProps) {
  const hasActiveTool = selectedTool && exercise.assignedTools.includes(selectedTool);

  return (
    <motion.div
      className="relative cursor-pointer"
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: index * STAGGER_DELAY,
        ...ANIMATIONS.smooth,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Node bubble with rounded edges */}
      <div
        className="relative flex flex-col items-center justify-center text-white shadow-[0_6px_20px_-6px_rgba(0,0,0,0.25)] border border-black/10 overflow-hidden px-3 py-2 min-w-[80px]"
        style={{
          backgroundColor: hasActiveTool ? COLORS.success : color,
          borderRadius: '16px',
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-black/10" />

        {/* Icon */}
        <div className="text-lg mb-0.5 relative z-10">{exercise.icon}</div>
        <div className="text-[10px] font-medium text-center relative z-10">
          {exercise.name}
        </div>

        {/* Tool indicators */}
        {exercise.assignedTools.length > 0 && (
          <div className="absolute -top-1 -right-1 flex gap-0.5">
            {exercise.assignedTools.map((toolId) => {
              const tool = tools.find((t) => t.id === toolId);
              if (!tool) return null;

              return (
                <motion.div
                  key={toolId}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] shadow-sm border border-white/30"
                  style={{ backgroundColor: tool.color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={ANIMATIONS.bouncy}
                >
                  {tool.icon}
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Subtle ring when tool is selected */}
        {selectedTool && (
          <motion.div
            className="absolute inset-0 ring-2"
            style={{
              ringColor: hasActiveTool ? COLORS.success : '#ffffff80',
              borderRadius: '16px',
            }}
            animate={{
              opacity: [0.6, 0.2, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
