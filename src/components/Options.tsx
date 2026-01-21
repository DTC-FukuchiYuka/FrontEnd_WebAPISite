
// src/components/Options.tsx
export default function Options({
  options, disabled, onSelect, status,
}:{
  options:{id:number;label:string}[];
  disabled:boolean;
  onSelect:(id:number)=>void;
  status:'idle'|'loading'|'ready'|'correct'|'wrong';
}) {
  return (
    <div role="list" className="grid">
      {options.map(o => (
        <button
          key={o.id}
          role="listitem"
          disabled={disabled}
          onClick={() => onSelect(o.id)}
          className="choice"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
``
