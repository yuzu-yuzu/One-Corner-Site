interface InfoCardProps {
  title: string;
  text: string;
  href?: string; // ← ? = facultative : Métro et Horaires respirent
}

export function InfoCard({ title, text, href }: InfoCardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ) : (
        <p>{text}</p>
      )}
    </div>
  );
}
