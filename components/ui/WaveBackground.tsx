export function WaveBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Left wave */}
      <div className="absolute left-0 top-0 w-[400px] h-[600px] opacity-10">
        <svg
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M0,300 Q100,200 200,300 T400,300 L400,600 L0,600 Z"
            fill="url(#gradientLeft)"
            transform="rotate(-15 200 300)"
          />
          <defs>
            <linearGradient id="gradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      {/* Right wave */}
      <div className="absolute right-0 top-0 w-[400px] h-[600px] opacity-10">
        <svg
          viewBox="0 0 400 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            d="M0,300 Q100,200 200,300 T400,300 L400,600 L0,600 Z"
            fill="url(#gradientRight)"
            transform="rotate(15 200 300)"
          />
          <defs>
            <linearGradient id="gradientRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

