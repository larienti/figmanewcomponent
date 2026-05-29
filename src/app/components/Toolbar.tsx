import { motion } from 'motion/react';
import { Tool } from './AthleteRoster';
import { COLORS, ANIMATIONS, STAGGER_DELAY } from './constants';

interface ToolbarProps {
  tools: Tool[];
  selectedTool: string | null;
  onToolSelect: (toolId: string) => void;
}

export function Toolbar({ tools, selectedTool, onToolSelect }: ToolbarProps) {
  return (
    <motion.div
      className="absolute right-6 top-1/2 -translate-y-1/2"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.3, ...ANIMATIONS.smooth }}
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-[20px] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-black/5 p-3 flex flex-col items-center gap-2">
        {/* Toolbar label */}
        <div className="text-[11px] font-medium px-2 py-1.5 border-b border-black/5 mb-1" style={{ color: COLORS.text }}>
          Tools
        </div>

        {/* Tool buttons */}
        <div className="flex flex-col gap-2">
            {tools.map((tool, index) => (
              <motion.button
                key={tool.id}
                onClick={() => onToolSelect(tool.id)}
                className="relative group"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: 0.4 + index * STAGGER_DELAY,
                  ...ANIMATIONS.smooth,
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Glow effect for selected tool */}
                {selectedTool === tool.id && (
                  <motion.div
                    className="absolute inset-0 rounded-xl blur-md"
                    style={{ backgroundColor: tool.color }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                )}

                {/* Tool button */}
                <div
                  className={`relative w-14 h-14 rounded-[14px] flex flex-col items-center justify-center transition-all ${
                    selectedTool === tool.id
                      ? 'shadow-[0_2px_12px_-2px_rgba(0,0,0,0.2)]'
                      : 'shadow-[0_1px_4px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_2px_8px_-2px_rgba(0,0,0,0.15)]'
                  }`}
                  style={{
                    backgroundColor:
                      selectedTool === tool.id
                        ? tool.color
                        : COLORS.background,
                  }}
                >
                  <div className="text-xl">{tool.icon}</div>
                  <div
                    className="text-[9px] font-medium mt-0.5"
                    style={{ color: selectedTool === tool.id ? 'white' : COLORS.text }}
                  >
                    {tool.name}
                  </div>

                  {/* Active indicator */}
                  {selectedTool === tool.id && (
                    <motion.div
                      className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: COLORS.success }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={ANIMATIONS.bouncy}
                    />
                  )}
                </div>

                {/* Tooltip on hover */}
                <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div
                    className="text-white text-[11px] px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-lg"
                    style={{ backgroundColor: `${COLORS.text}f2` }}
                  >
                    {selectedTool === tool.id
                      ? `${tool.name} (Selected)`
                      : `Select ${tool.name}`}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Clear selection button */}
        {selectedTool && (
          <motion.button
            onClick={() => onToolSelect(selectedTool)}
            className="mt-2 px-3 py-1.5 text-[10px] font-medium rounded-lg shadow-sm transition-colors"
            style={{
              backgroundColor: COLORS.background,
              color: COLORS.text,
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = COLORS.backgroundHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = COLORS.background}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Deselect
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
