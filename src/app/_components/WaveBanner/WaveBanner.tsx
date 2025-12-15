export const WaveBanner = () => {
  return (
    /** NB! THIS SVG WAS CREATED BY AI! Prompt: "Create a cool bottom decoration with gradient colors" */
    <svg
      width="100%"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="brandGradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="var(--brand-primary)" />
          <stop offset="50%" stopColor="var(--brand-secondary)" />
          <stop offset="100%" stopColor="var(--brand-tertiary)" />
        </linearGradient>
      </defs>
      <path
        d="M0,42 C240,12 480,72 720,42 C960,12 1200,72 1440,42 L1440,80 L0,80 Z"
        fill="url(#brandGradient)"
        opacity="0.9"
      />
      <path
        d="M0,56 C240,26 480,86 720,56 C960,26 1200,86 1440,56 L1440,80 L0,80 Z"
        fill="rgba(255,255,255,0.18)"
      />
    </svg>
  );
};
