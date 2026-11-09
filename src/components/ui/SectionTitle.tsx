interface SectionTitleProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionTitle({ title, subtitle, centered, light }: SectionTitleProps) {
  return (
    <>
      <style>{styles}</style>
      <div className={`st-wrapper${centered ? ' st-centered' : ''}${light ? ' st-light' : ''}`}>
        <div className="st-accent" aria-hidden="true" />
        <h2 className="st-title">{title}</h2>
        {subtitle && <p className="st-subtitle">{subtitle}</p>}
      </div>
    </>
  );
}

const styles = `
.st-wrapper {
  margin-bottom: 48px;
}
.st-centered {
  text-align: center;
}
.st-centered .st-accent {
  margin-left: auto;
  margin-right: auto;
}
.st-accent {
  width: 48px;
  height: 4px;
  background: var(--color-primary);
  border-radius: 2px;
  margin-bottom: 16px;
}
.st-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 12px;
  text-wrap: balance;
}
.st-light .st-title {
  color: #ffffff;
}
.st-subtitle {
  font-size: 1.125rem;
  color: var(--color-text-secondary);
  line-height: 1.7;
  max-width: 600px;
}
.st-centered .st-subtitle {
  margin-left: auto;
  margin-right: auto;
}
.st-light .st-subtitle {
  color: rgba(255,255,255,0.7);
}
@media (max-width: 768px) {
  .st-title {
    font-size: 1.875rem;
  }
  .st-wrapper {
    margin-bottom: 32px;
  }
}
`;
