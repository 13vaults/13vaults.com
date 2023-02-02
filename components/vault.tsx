export function Quote({ text, source }: any): JSX.Element {
  return (
    <figure>
      <blockquote>
        <p>{text}</p>
      </blockquote>
      <figcaption>&ndash; {source}</figcaption>
    </figure>
  );
}

export function Dice({ children }: any) {
  return <span className="bg-red-500 text-white">{children}</span>;
}
