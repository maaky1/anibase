import AnimeItem from "@/components/AnimeItem";
import GenreItem from "@/components/GenreItem";
import Header from "@/components/Header";
import { COLOR } from "@/constants/color";
import { Genre } from "@/models/Genre";
import { TopAnime } from "@/models/TopAnime";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const LIMIT = 20;

const AnimeScreen = () => {
  const listRef = useRef<FlatList<TopAnime>>(null);

  const [animes, setAnimes] = useState<TopAnime[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /* ================= GENRES ================= */
  const getGenres = async () => {
    const res = await axios.get("https://api.jikan.moe/v4/genres/anime");
    setGenres(res.data.data);
  };

  /* ================= ANIMES ================= */
  const getAnimes = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      let res;

      if (selectedGenres.length === 0) {
        res = await axios.get("https://api.jikan.moe/v4/top/anime", {
          params: { page, limit: LIMIT },
        });
      } else {
        res = await axios.get("https://api.jikan.moe/v4/anime", {
          params: {
            genres: selectedGenres.join(","),
            page,
            limit: LIMIT,
          },
        });
      }

      const data = res.data?.data ?? [];

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      const mapped: TopAnime[] = data.map((item: any) => ({
        mal_id: item.mal_id,
        title: item.title,
        images: item.images,
        status: item.status,
      }));

      setAnimes((prev) => [...prev, ...mapped]);
    } catch (e) {
      console.log(e);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  /* ================= PAGINATION ================= */
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  /* ================= GENRE TOGGLE ================= */
  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );

    // RESET LIST
    setAnimes([]);
    setPage(1);
    setHasMore(true);

    // SCROLL KE ATAS
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const resetGenres = () => {
    setSelectedGenres([]);
    setAnimes([]);
    setPage(1);
    setHasMore(true);

    listRef.current?.scrollToOffset({
      offset: 0,
      animated: true,
    });
  };

  /* ================= EFFECT ================= */
  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    getAnimes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedGenres]);

  /* ================= UI ================= */
  return (
    <LinearGradient
      colors={[COLOR.active, COLOR.backgroundLight, COLOR.primary]}
      style={{ flex: 1 }}
    >
      <Header />

      {/* GENRES */}
      <FlatList
        data={genres}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.mal_id.toString()}
        contentContainerStyle={{ gap: 8, paddingHorizontal: 10 }}
        style={{ maxHeight: 60 }}
        renderItem={({ item }) => (
          <GenreItem
            name={item.name}
            active={selectedGenres.includes(item.mal_id)}
            onPress={() => toggleGenre(item.mal_id)}
          />
        )}
      />

      {/* ANIMES */}
      <View style={{ flex: 1, margin: 10 }}>
        <FlatList
          ref={listRef}
          data={animes}
          numColumns={2}
          keyExtractor={(item) => item.mal_id.toString()}
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginBottom: 15,
          }}
          renderItem={({ item }) => (
            <AnimeItem
              mal_id={item.mal_id}
              title={item.title}
              images={item.images}
              status={item.status}
            />
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={
            loading ? (
              <Text style={{ textAlign: "center", padding: 10 }}>
                Loading...
              </Text>
            ) : null
          }
          ListEmptyComponent={
            loading ? null : (
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                Tidak ada anime 😢
              </Text>
            )
          }
        />
        {selectedGenres.length > 0 && (
          <View style={{ alignItems: "center", marginTop: 6 }}>
            <TouchableOpacity
              onPress={resetGenres}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 8,
                borderRadius: 20,
                backgroundColor: COLOR.primary,
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Reset Filter
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default AnimeScreen;
