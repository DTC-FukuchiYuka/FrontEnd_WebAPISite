// src/components/BadgeList.tsx
const LABEL: Record<string,string> = {
  beginner: '初級（10pt）',
  intermediate: '中級（50pt）',
  advanced: '上級（100pt）',
};
export default function BadgeList({ badges }:{badges:string[]}) {
  if (!badges.length) return null;
  return (
    <div aria-label="獲得バッジ">
      {badges.map(b => <span key={b} className={`badge ${b}`}>{LABEL[b]}</span>)}
    </div>
  );
}