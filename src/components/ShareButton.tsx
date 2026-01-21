// src/components/ShareButton.tsx
export default function ShareButton({ points }:{points:number}) {
  const text = `犬種クイズで ${points} pt！`;
  const url  = window.location.href;

  const share = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: '犬種クイズ', text, url }); } catch {}
    } else {
      const twitter = new URL('https://twitter.com/intent/tweet');
      twitter.searchParams.set('text', text);
      twitter.searchParams.set('url', url);
      window.open(twitter.toString(), '_blank');
    }
  };

  return <button onClick={share} aria-label="結果をシェア">シェア</button>;
}
