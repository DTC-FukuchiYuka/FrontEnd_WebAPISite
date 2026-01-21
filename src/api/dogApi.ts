
// src/api/dogApi.ts
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.thedogapi.com/v1',
  headers: { 'x-api-key': import.meta.env.VITE_DOG_API_KEY },
});

export type Breed = {
  id: number;
  name: string;      // 例: "Shiba Inu"
  bred_for?: string;
  temperament?: string;
  origin?: string;
};

export type DogImage = {
  id: string;
  url: string;
  breeds: Breed[];
};

export async function fetchBreeds(): Promise<Breed[]> {
  const { data } = await client.get<Breed[]>('/breeds');
  // 一部 API 名の表記ゆれに注意。ここでは name をそのまま使う。
  return data.filter(b => !!b.name);
}

export async function fetchRandomImageWithBreed(): Promise<DogImage> {
  const { data } = await client.get<DogImage[]>(
    '/images/search',
    { params: { has_breeds: true, limit: 1, size: 'med' } }
  );
  if (!data?.[0] || !data[0].breeds?.length) throw new Error('犬種情報つき画像が取得できませんでした');
  return data[0];
}
``
