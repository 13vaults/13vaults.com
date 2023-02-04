export function Dice({ children }: any) {
  return <span className="bg-red-500 text-white">{children}</span>;
}

export function TwoCol({ children }: any) {
  return <div className="lg:columns-2">{children}</div>;
}

export function ThreeCol({ children }: any) {
  return <div className="lg:columns-3">{children}</div>;
}
