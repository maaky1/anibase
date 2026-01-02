export interface RecommendationAnime {
  entry: {
    mal_id: number;
    title: string;
    images?: {
      jpg?: {
        image_url: string;
      };
    };
  };
  url: string;
  votes: number;
}
