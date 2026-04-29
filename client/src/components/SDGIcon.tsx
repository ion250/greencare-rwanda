// src/components/SDGIcon.tsx

interface SDGIconProps {
  sdgId: string;
  className?: string;
}

export const SDGIcon: React.FC<SDGIconProps> = ({ sdgId, className = "w-8 h-8" }) => {
  const icons: { [key: string]: JSX.Element } = {
    '1': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <circle cx="25" cy="35" r="8" />
          <circle cx="50" cy="30" r="10" />
          <circle cx="75" cy="35" r="8" />
          <circle cx="35" cy="40" r="6" />
          <circle cx="65" cy="40" r="6" />
          <path d="M20 70 Q25 60 30 70 L30 85 L20 85 Z" />
          <path d="M35 65 Q40 55 45 65 L45 85 L35 85 Z" />
          <path d="M50 60 Q55 50 60 60 L60 85 L50 85 Z" />
          <path d="M65 65 Q70 55 75 65 L75 85 L65 85 Z" />
          <path d="M80 70 Q85 60 90 70 L90 85 L80 85 Z" />
        </g>
      </svg>
    ),
    '2': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <path d="M20 65 Q20 75 50 75 Q80 75 80 65 L80 70 Q80 85 50 85 Q20 85 20 70 Z" />
          <rect x="25" y="70" width="50" height="10" rx="2" />
          <path d="M35 55 Q35 45 40 40" stroke="white" strokeWidth="3" fill="none" />
          <path d="M50 58 Q50 45 55 38" stroke="white" strokeWidth="3" fill="none" />
          <path d="M65 55 Q65 45 60 40" stroke="white" strokeWidth="3" fill="none" />
        </g>
      </svg>
    ),
    '3': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white" stroke="white" strokeWidth="3">
          <path d="M15 50 Q25 30 35 50 Q45 70 55 50 Q65 30 75 50 Q85 70 90 60" fill="none" />
          <circle cx="85" cy="40" r="8" fill="white" />
        </g>
      </svg>
    ),
    '4': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <path d="M25 30 L50 15 L75 30 L75 65 L50 80 L25 65 Z" />
          <rect x="48" y="20" width="4" height="50" />
          <rect x="20" y="25" width="10" height="45" rx="2" />
        </g>
      </svg>
    ),
    '5': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <circle cx="50" cy="35" r="12" />
          <path d="M35 50 L35 75 Q35 85 50 85 Q65 85 65 75 L65 50" strokeWidth="8" stroke="white" fill="none" />
          <rect x="30" y="58" width="40" height="6" />
          <circle cx="50" cy="45" r="18" stroke="white" strokeWidth="4" fill="none" />
        </g>
      </svg>
    ),
    '6': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <path d="M30 25 L30 70 Q30 80 50 80 Q70 80 70 70 L70 25 Z" />
          <path d="M25 30 L75 30 L70 70 Q70 85 50 85 Q30 85 30 70 Z" fill="white" opacity="0.3" />
          <circle cx="50" cy="55" r="8" fill="white" />
          <path d="M50 45 L50 35" stroke="white" strokeWidth="3" />
        </g>
      </svg>
    ),
    '7': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <circle cx="50" cy="50" r="20" />
          <path d="M50 15 L50 25 M50 75 L50 85 M15 50 L25 50 M75 50 L85 50" stroke="white" strokeWidth="4" />
          <path d="M25 25 L32 32 M68 68 L75 75 M25 75 L32 68 M68 32 L75 25" stroke="white" strokeWidth="4" />
        </g>
      </svg>
    ),
    '8': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <path d="M20 75 L35 55 L50 65 L70 35 L85 25 L85 75 Z" />
          <path d="M20 75 L85 75" stroke="white" strokeWidth="3" fill="none" />
          <polyline points="35,55 50,65 70,35" fill="none" stroke="white" strokeWidth="2" />
        </g>
      </svg>
    ),
    '9': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white" stroke="white" strokeWidth="2">
          <rect x="30" y="40" width="25" height="25" fill="none" />
          <rect x="45" y="25" width="25" height="25" fill="none" />
          <rect x="40" y="50" width="25" height="25" fill="none" />
        </g>
      </svg>
    ),
    '10': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <rect x="15" y="45" width="20" height="10" />
          <rect x="65" y="45" width="20" height="10" />
          <rect x="40" y="35" width="20" height="10" />
          <rect x="40" y="55" width="20" height="10" />
          <polygon points="10,50 20,45 20,55" />
          <polygon points="90,50 80,45 80,55" />
        </g>
      </svg>
    ),
    '11': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <rect x="15" y="50" width="20" height="35" />
          <rect x="40" y="30" width="20" height="55" />
          <rect x="65" y="45" width="20" height="40" />
          <rect x="20" y="55" width="5" height="8" fill="#19486A" />
          <rect x="20" y="68" width="5" height="8" fill="#19486A" />
          <rect x="45" y="35" width="5" height="8" fill="#19486A" />
          <rect x="45" y="48" width="5" height="8" fill="#19486A" />
          <rect x="45" y="61" width="5" height="8" fill="#19486A" />
          <rect x="70" y="50" width="5" height="8" fill="#19486A" />
          <rect x="70" y="63" width="5" height="8" fill="#19486A" />
        </g>
      </svg>
    ),
    '12': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="none" stroke="white" strokeWidth="6">
          <path d="M30 50 Q30 30 50 30 Q70 30 70 50 Q70 70 50 70 Q30 70 30 50" />
          <path d="M40 50 Q40 40 50 40 Q60 40 60 50 Q60 60 50 60 Q40 60 40 50" />
          <path d="M65 65 L75 75 M75 65 L65 75" strokeWidth="4" />
        </g>
      </svg>
    ),
    '13': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <ellipse cx="50" cy="50" rx="35" ry="20" />
          <path d="M20 45 Q50 65 80 45" fill="white" opacity="0.5" />
          <path d="M30 35 L40 30 M50 25 L50 20 M70 35 L60 30" stroke="white" strokeWidth="3" />
        </g>
      </svg>
    ),
    '14': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <path d="M20 35 Q30 30 40 35 Q50 40 60 35 Q70 30 80 35" stroke="white" strokeWidth="3" fill="none" />
          <path d="M20 45 Q30 40 40 45 Q50 50 60 45 Q70 40 80 45" stroke="white" strokeWidth="3" fill="none" />
          <path d="M20 55 Q30 50 40 55 Q50 60 60 55 Q70 50 80 55" stroke="white" strokeWidth="3" fill="none" />
          <path d="M35 70 Q50 65 65 70 L65 75 Q50 70 35 75 Z" />
        </g>
      </svg>
    ),
    '15': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <rect x="45" y="55" width="10" height="25" />
          <circle cx="50" cy="45" r="18" />
          <circle cx="40" cy="40" r="12" opacity="0.8" />
          <circle cx="60" cy="40" r="12" opacity="0.8" />
          <rect x="20" y="80" width="60" height="5" />
          <path d="M30 30 L35 25 M50 20 L50 15 M70 30 L75 25" stroke="white" strokeWidth="2" />
        </g>
      </svg>
    ),
    '16': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="white">
          <path d="M30 75 L30 55 Q30 40 50 40 Q70 40 70 55 L70 75" stroke="white" strokeWidth="4" fill="none" />
          <path d="M25 75 L75 75 L75 80 L25 80 Z" />
          <circle cx="50" cy="30" r="8" />
          <path d="M40 45 L60 45 L55 55 L45 55 Z" />
          <path d="M65 35 L75 25 M70 25 L80 35" stroke="white" strokeWidth="3" />
        </g>
      </svg>
    ),
    '17': (
      <svg viewBox="0 0 100 100" className={className}>
        <g fill="none" stroke="white" strokeWidth="3">
          <circle cx="50" cy="50" r="25" />
          <circle cx="50" cy="35" r="12" />
          <circle cx="50" cy="65" r="12" />
          <circle cx="37" cy="43" r="12" />
          <circle cx="63" cy="43" r="12" />
          <circle cx="37" cy="57" r="12" />
          <circle cx="63" cy="57" r="12" />
        </g>
      </svg>
    )
  };

  return icons[sdgId] || null;
};