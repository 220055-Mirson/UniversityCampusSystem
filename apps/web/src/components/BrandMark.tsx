export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${compact ? '' : ''}`}>
      <div
        className={`relative grid place-items-center rounded-xl bg-gradient-to-br from-campus-teal to-[#0f4f44] text-white shadow-soft ${
          compact ? 'h-9 w-9' : 'h-11 w-11'
        }`}
        aria-hidden
      >
        <svg viewBox="0 0 32 32" className={compact ? 'h-5 w-5' : 'h-6 w-6'} fill="none">
          <path d="M6 22 L16 8 L26 22 Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="M10 22 H22" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16" cy="16.5" r="2" fill="currentColor" />
        </svg>
      </div>
      <div>
        <p className={`font-display font-semibold tracking-tight text-inherit ${compact ? 'text-lg' : 'text-xl'}`}>
          Smart Campus
        </p>
        {!compact ? <p className="text-[11px] tracking-[0.14em] text-inherit/65">UJAC · Academia viva</p> : null}
      </div>
    </div>
  );
}
