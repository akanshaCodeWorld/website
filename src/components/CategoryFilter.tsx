import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api/api';

const CategoryFilter: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(['All', ...fetchedCategories]);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toTitleCase = (str: string) => {
    return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <ul className="list-none p-0 m-0">
        <li className="mb-2">
          <Link to="/" className="text-blue-500 hover:underline">
            Home
          </Link>
        </li>
      </ul>
      <h2 className="text-md font-semibold mb-4">Filter by category</h2>
      <ul className="list-none p-0 m-0">
        {categories.map((category) => (
          <li key={category} className="mb-2">
            <Link
              to={`/category/${category.toLowerCase()}`}
              className="text-blue-500 hover:underline"
            >
              {toTitleCase(category)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;
