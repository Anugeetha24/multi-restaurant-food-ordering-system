import { createContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.warn('Invalid favorites found in localStorage. Resetting.', error);
      localStorage.removeItem('favorites');
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (item) => {
    setFavorites((prev) => {
      if (prev.find(fav => fav._id === item._id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter(fav => fav._id !== id));
  };

  const toggleFavorite = (item) => {
    if (favorites.find(fav => fav._id === item._id)) {
      removeFromFavorites(item._id);
    } else {
      addToFavorites(item);
    }
  };

  const isFavorite = (id) => {
    return favorites.some(fav => fav._id === id);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;
