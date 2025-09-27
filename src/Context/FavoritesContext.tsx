import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "./Context";

interface IFavoritesContext {
  favorites: Set<string>;
  toggleFavorite: (roomId: string) => void;
}

const FavoritesContext = createContext<IFavoritesContext>({
  favorites: new Set(),
  toggleFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loginData } = useAuthContext();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // جلب المفضلات عند تسجيل الدخول
  useEffect(() => {
    if (!loginData) return;

    const fetchFavorites = async () => {
      try {
        const res = await axios.get(
          "https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms",
          { headers: { Authorization: `Bearer ${loginData.token}` } }
        );

        if (res.data.success && res.data.data.favoriteRoom) {
          setFavorites(new Set(res.data.data.favoriteRoom.rooms));
        }
      } catch (err) {
        console.error("Failed to fetch favorites", err);
      }
    };

    fetchFavorites();
  }, [loginData]);

  // إضافة/إزالة من المفضلة
  const toggleFavorite = async (roomId: string) => {
    if (!loginData) return;

    try {
      const isFav = favorites.has(roomId);
      await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms",
        { roomId },
        { headers: { Authorization: `Bearer ${loginData.token}` } }
      );

      setFavorites((prev) => {
        const newSet = new Set(prev);
        if (isFav) newSet.delete(roomId);
        else newSet.add(roomId);
        return newSet;
      });
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);