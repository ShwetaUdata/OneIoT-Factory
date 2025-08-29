interface TimelineSegment {
  type: 'connected' | 'degraded' | 'down';
  start: number;    // percentage start along the bar (0-100)
  duration: number; // percentage width along the bar
}

interface TimelineBarProps {
  timelineData: TimelineSegment[];
}

const segmentColors: Record<string, string> = {
  connected: 'bg-green-500',
  degraded: 'bg-yellow-400',
  down: 'bg-red-500',
};

export function TimelineBar({ timelineData }: TimelineBarProps) {
  return (
    <div className="relative w-full h-6 bg-gray-300 rounded overflow-hidden">
      {timelineData.map((segment, idx) => (
        <div
          key={idx}
          className={`${segmentColors[segment.type]} absolute top-0 h-full`}
          style={{
            left: `${segment.start}%`,
            width: `${segment.duration}%`,
            borderRadius:
              idx === 0 || idx === timelineData.length - 1 ? '0.125rem' : undefined,
          }}
        />
      ))}
    </div>
  );
}
