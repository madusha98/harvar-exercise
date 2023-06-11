const BASE_URL = process.env.BASE_URL || "https://cataas.com/cat/says/";

export interface FetchCatParams {
  width: number;
  height: number;
  c: string;
  s: number;
  encoding: string;
}

export class CatService {
  static async fetchCatWithCustomText(
    text: string,
    params: FetchCatParams
  ): Promise<Buffer> {
    const query = new URLSearchParams();
    Object.keys(params).forEach((key) => {
      query.set(key, params[key]);
    });

    const res = await fetch(`${BASE_URL}/${text}?${query.toString()}`);
    if (res.ok) {
      const arrayBuffer = await res.arrayBuffer();
      return Buffer.from(arrayBuffer);
    }

    throw new Error(`unexpected response: ${res.statusText}`);
  }
}
