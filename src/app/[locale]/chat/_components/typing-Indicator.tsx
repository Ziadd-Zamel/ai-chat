export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="px-4 py-3 bg-[#161918] border border-[#232826] rounded-[4px_14px_14px_14px] flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[#2DD56A] opacity-60"
            style={{
              animation: `typingBounce 1.2s ${i * 0.2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>
      <style jsx global>{`
        @keyframes typingBounce {
          0%,
          60%,
          100% {
            transform: translateY(0);
            opacity: 0.6;
          }
          30% {
            transform: translateY(-5px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
