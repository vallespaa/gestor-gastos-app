import { createContext, useContext, useState, useEffect } from 'react';
import StaticCategoriesRepository from '../../app/data/categories/StaticCategoriesRepository';
import { getAllCategories } from '../../app/application/getAllCategories';
import { createCategory } from '../../app/application/createCategory';
import { deleteCategory } from '../../app/application/deleteCategory';
import { updateCategory } from '../../app/application/updateCategory';

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
  
  // Agregar una nueva categoría
  const addCategory = async (category) => {
      await createCategory(repository, category);
      await loadCategories();
  };

  // Eliminar una categoría  
  const removeCategory = async (id) => {
    await deleteCategory(repository, id);
    await loadCategories();
  };

  // Editar una categoría
  const editCategory = async (updatedCategory) => {
    await updateCategory(repository, updatedCategory);
    await loadCategories();
    };

  return (
    <CategoriesContext.Provider value={{
      categories,
      getCategories,
      getCategoryById,
      addCategory,
      removeCategory,
      editCategory
    }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  return useContext(CategoriesContext);
};
