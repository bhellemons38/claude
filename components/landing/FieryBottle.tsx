/** Brand-accurate illustration of the Nacholito squeeze bottle. */
export function FieryBottle({ className, label = 'Fiery Pomodoro' }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 220 460" className={className} role="img" aria-label={`Nacholito ${label} fles`}>
      <defs>
        <linearGradient id="sauce" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c23a1f" />
          <stop offset="0.5" stopColor="#9c2410" />
          <stop offset="1" stopColor="#6f1608" />
        </linearGradient>
      </defs>

      {/* cap */}
      <rect x="84" y="10" width="52" height="20" rx="6" fill="#f3f1ea" stroke="#d9d4c6" />
      <rect x="88" y="28" width="44" height="26" rx="6" fill="#fbfaf5" stroke="#d9d4c6" />

      {/* body */}
      <path
        d="M74 100 C74 76 90 56 110 56 C130 56 146 76 146 100 L146 396 C146 416 132 428 110 428 C88 428 74 416 74 396 Z"
        fill="url(#sauce)"
        stroke="rgba(0,0,0,0.15)"
      />
      {/* sauce splatter near shoulders */}
      <g fill="#7c1c0c" opacity="0.7">
        <circle cx="92" cy="84" r="3" />
        <circle cx="128" cy="92" r="4" />
        <circle cx="118" cy="74" r="2.5" />
        <circle cx="100" cy="98" r="2" />
      </g>
      {/* glass highlight */}
      <rect x="82" y="110" width="10" height="280" rx="5" fill="#fff" opacity="0.18" />

      {/* label */}
      <rect x="72" y="150" width="76" height="170" rx="12" fill="#F2E9D6" stroke="#e2d6ba" />
      {/* simplified sugar skull */}
      <g transform="translate(110 178)" fill="#2a1d0e">
        <ellipse cx="0" cy="0" rx="11" ry="12" />
        <circle cx="-4" cy="-1" r="2.4" fill="#F2E9D6" />
        <circle cx="4" cy="-1" r="2.4" fill="#F2E9D6" />
        <rect x="-1.2" y="3" width="2.4" height="4" rx="1" fill="#F2E9D6" />
      </g>
      <text x="110" y="214" textAnchor="middle" className="font-display" fontSize="22" fill="#2a1d0e">Fiery</text>
      <text x="110" y="234" textAnchor="middle" className="font-display" fontSize="22" fill="#2a1d0e">Pomodoro</text>
      <text x="110" y="252" textAnchor="middle" className="font-mono" fontSize="7" letterSpacing="1" fill="#6b5a3f">READY TO USE</text>
      <text x="110" y="288" textAnchor="middle" className="font-display" fontSize="17" fill="#BD0A0A">Nacholito</text>
      <rect x="90" y="298" width="40" height="16" rx="3" fill="#2a1d0e" />
      <text x="110" y="310" textAnchor="middle" className="font-mono" fontSize="8" fill="#F2E9D6">750 ml</text>
    </svg>
  )
}
