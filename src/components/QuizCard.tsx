
// src/components/QuizCard.tsx
import Options from './Options';
import ImageModal from './ImageModal';
import ShareButton from './ShareButton';

export default function QuizCard({
  state, actions,
}: {
  state: {
    image: { url: string } | null;
    options: { id: number; label: string }[];
    status: 'idle'|'loading'|'ready'|'correct'|'wrong';
    points: number;
  };
  actions: { submit: (id:number)=>void; next: ()=>Promise<void> };
}) {
  const { image, options, status } = state;
  const disabled = status !== 'ready';

  return (
    <section aria-busy={status==='loading'}>
      <div className="imageWrap">
        {image ? (
          <ImageModal
            thumbUrl={image.url}
            alt="クイズ用の犬の写真"
          />
        ) : <div className="skeleton" />}
      </div>

      <Options
        options={options}
        disabled={disabled}
        onSelect={actions.submit}
        status={status}
      />

      <div className="toolbar">
        {status === 'correct' && <span className="ok">正解！+1pt</span>}
        {status === 'wrong' && <span className="ng">残念！</span>}
        <button onClick={actions.next} aria-label="次の問題へ">次へ ▶</button>
        <ShareButton points={state.points} />
      </div>
    </section>
  );
}
