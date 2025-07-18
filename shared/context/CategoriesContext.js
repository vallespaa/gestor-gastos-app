  import { createContext, useContext, useState, useEffect } from 'react';
  import StaticCategoriesRepository from '../../app/data/categories/StaticCategoriesRepository';
  import { getAll } from '../../app/application/getAllCategories';

  const CategoriesContext = createContext();

  const repository = new StaticCategoriesRepository();

  export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
      loadCategories();
    }, []);

    const loadCategories = async () => {
      const all = await getAll(repository);
      setCategories(all);
    };

    function getCategories(type) {
      if (!type) {
        return categories;
      }
      return categories.filter(cat => cat.type === type);
    };

    return (
      <CategoriesContext.Provider value={{
        categories,
        getCategories
      }}>
        {children}
      </CategoriesContext.Provider>
    );
  };

  export const useCategories = () => {
    return useContext(CategoriesContext);
  };
