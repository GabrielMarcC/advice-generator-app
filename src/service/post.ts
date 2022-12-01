import type { Data } from "../App";

export const postService = {
  get: async () => {
    const result = await fetch("https://api.adviceslip.com/advice");
    if (!result.ok) {
      throw new Error("Falha ao obter dados");
    }

    const data: Data = await result.json();

    return data;
  },
};
