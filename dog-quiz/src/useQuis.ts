
// src/hooks/useQuiz.ts
import { useEffect, useMemo, useRef, useState } from 'react';
import { Breed, fetchBreeds, fetchRandomImageWithBreed, DogImage } from '../api/dogApi';

type QuizOption = { id: number; label: string };
type Badge = 'beginner' | 'intermediate' | 'advanced';

const BADGE_THRESHOLDS: Record<Badge, number> = {
  beginner: 10,
  intermediate: 50,
  advanced: 100,
};

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function load<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || '') as T; } catch { return fallback; }
}
function save<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }

export function useQuiz() {
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);
  const [image, setImage] = useState<DogImage | null>(null);
  const [options, setOptions] = useState<QuizOption[]>([]);
  const [answerId, setAnswerId] = useState<number | null>(null);
  const [status, setStatus] = useState<'idle'|'loading'|'ready'|'correct'|'wrong'>('idle');
  const [points, setPoints] = useState<number>(() => load('points', 0));
  const [badges, setBadges] = useState<Badge[]>(() => load('badges', []));
  const prefetchUrl = useRef<string | null>(null);

  useEffect(() => { (async () => {
    setStatus('loading');
    const breeds = await fetchBreeds();
    setAllBreeds(breeds);
    await nextQuestion(breeds);
  })().catch(() => setStatus('idle')); }, []);

  async function nextQuestion(breeds = allBreeds) {
    setStatus('loading');
    const img = await fetchRandomImageWithBreed();
    const correct = img.breeds[0]; // 複数つくことは稀。先頭を利用。

    // 誤答候補3件
    const distractors = shuffle(breeds.filter(b => b.id !== correct.id)).slice(0, 3);
    const opts = shuffle([{ id: correct.id, label: correct.name }, ...distractors.map(d => ({ id: d.id, label: d.name }))]);

    setImage(img);
    setOptions(opts);
    setAnswerId(correct.id);
    setStatus('ready');

    // 次の画像を先読み（失敗しても無視）
    prefetchRandom();
  }

  async function prefetchRandom() {
    try {
      const next = await fetchRandomImageWithBreed();
      prefetchUrl.current = next.url;
      new Image().src = next.url; // ブラウザキャッシュ
    } catch {}
  }

  function submit(id: number) {
    if (status !== 'ready') return;
    if (id === answerId) {
      const newPoints = points + 1;
      setPoints(newPoints); save('points', newPoints);

      // バッジ判定
      const newly: Badge[] = [];
      (Object.keys(BADGE_THRESHOLDS) as Badge[]).forEach(b => {
        if (newPoints === BADGE_THRESHOLDS[b] && !badges.includes(b)) newly.push(b);
      });
      if (newly.length) {
        const merged = [...badges, ...newly];
        setBadges(merged); save('badges', merged);
      }
      setStatus('correct');
    } else {
      setStatus('wrong');
    }
  }

  async function next() { await nextQuestion(); setStatus('ready'); }

  return {
    state: { image, options, status, points, badges },
    actions: { submit, next },
  };
}
