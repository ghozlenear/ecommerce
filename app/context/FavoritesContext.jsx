import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (product) => {
    setFavorites(currentFavorites => {
      const isAlreadyFavorite = currentFavorites.some(item => item.id === product.id);
      if (isAlreadyFavorite) {
        return currentFavorites;
      }
      return [...currentFavorites, product];
    });
  };

  const removeFromFavorites = (productId) => {
    setFavorites(currentFavorites =>
      currentFavorites.filter(item => item.id !== productId)
    );
  };

  const isFavorite = (productId) => {
    return favorites.some(item => item.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
