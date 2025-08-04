  import { createContext, useContext, useState, useEffect } from 'react';
  import StaticCategoriesRepository from '../../app/data/categories/StaticCategoriesRepository';
  import { getAllCategories } from '../../app/application/getAllCategories';

  const CategoriesContext = createContext();

  const repository = new StaticCategoriesRepository();

  export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      loadCategories();
    }, []);

    const loadCategories = async () => {
      const all = await getAllCategories(repository);
      setCategories(all);
    };

    function getCategories(type) {
      if (!type) {
        return categories;
      }
      return categories.filter(cat => cat.type === type);
    };

    function getCategoryById(id) {
      if (!id) {
        return null;
      }
      return categories.find(c => c.id === id) || null;
    }

    return (
      <CategoriesContext.Provider value={{
        categories,
        getCategories,
        getCategoryById
      }}>
        {children}
      </CategoriesContext.Provider>
    );
  };

  export const useCategories = () => {
    return useContext(CategoriesContext);
  };
