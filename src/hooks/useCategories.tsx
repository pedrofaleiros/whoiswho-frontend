import { useState, useEffect } from "react";
import { getCategoriesService } from "../services/api";
import { CategoryModel } from "../models/CategoryModel";

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const fetchCategories = async () => {
    try {
      const data = await getCategoriesService();
      setCategories(data);
    } catch (err) {}
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
  };
};
