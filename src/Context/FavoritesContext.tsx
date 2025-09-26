import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./Context";
import { FAVORITES_URL } from "../services/urls";
import { axiosinstance } from "../services/urls";
import type { IFavoritesContext } from "../services/interfaces";



const FavoritesContext = createContext<IFavoritesContext>({
  favorites: new Set(),
  toggleFavorite: () => {},
  loading: true,
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loginData } = useAuthContext();
  const [favorites, setFavorites] = useState<Set<string>>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? new Set(JSON.parse(saved)) : new Set<string>();
  });

  const [loading, setLoading] = useState(true);

  // Fetch favorites
  useEffect(() => {
    if (!loginData) return;

    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const res = await axiosinstance.get(FAVORITES_URL.BASE);
        if (res.data.success && res.data.data.favoriteRoom) {
          const rooms: string[] = res.data.data.favoriteRoom.rooms.map(String);
          const favSet: Set<string> = new Set(rooms);
          setFavorites(favSet);
          localStorage.setItem("favorites", JSON.stringify([...favSet]));
        }
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [loginData]);

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify([...favorites]));
  }, [favorites]);

  const toggleFavorite = async (roomId: string) => {
    if (!loginData) return;

    try {
      await axiosinstance.post(FAVORITES_URL.BASE, { roomId });

      setFavorites((prev) => {
        const newSet: Set<string> = new Set(prev);
        if (newSet.has(roomId)) newSet.delete(roomId);
        else newSet.add(roomId);
        return newSet;
      });
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
