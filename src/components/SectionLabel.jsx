export default function SectionLabel({ index, label }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        letterSpacing: '0.15em',
        color: 'var(--accent)',
        textTransform: 'uppercase',
      }}
    >
      / {index} / {label}
    </span>
  );
}
