// src/components/ImageModal.tsx
import { useState } from 'react';

export default function ImageModal({ thumbUrl, alt }:{thumbUrl:string; alt:string}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <img
        src={thumbUrl}
        alt={alt}
        className="quizImage"
        onClick={() => setOpen(true)}
        loading="eager"
      />
      {open && (
        <div role="dialog" aria-modal="true" className="modal" onClick={() => setOpen(false)}>
          <img src={thumbUrl} alt={alt} className="modalImage" />
          <button className="close" aria-label="閉じる" onClick={() => setOpen(false)}>✕</button>
        </div>
      )}
    </>
  );
}
``
