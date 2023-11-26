import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../api/api';
import CategoryFilter from '../components/CategoryFilter';
import ecom1 from '../assets/ecom1.jpeg';
import ecom2 from '../assets/ecom2.jpeg';
import ecom3 from '../assets/ecom3.png';
import ecom4 from '../assets/ecom4.avif';
import ecom5 from '../assets/ecom5.avif';
import ecom6 from '../assets/ecom6.avif';

const Home: React.FC = () => {
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

  const images = [
    { src: ecom1, type: 'jpeg', category: 'All' },
    { src: ecom2, type: 'jpeg', category: 'Electronics' },
    { src: ecom3, type: 'avif', category: 'Jewelery' },
    { src: ecom4, type: 'avif', category: "Men's Clothing" },
    { src: ecom5, type: 'avif', category: "Women's Clothing" },
    { src: ecom6, type: 'avif', category: 'All' },
  ];

  return (
    <div>
      <div className="relative bg-cover bg-center h-96 md:h-80" style={{ backgroundImage: `url(${ecom1})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to Our Website</h1>
            <p className="text-lg md:text-xl mb-8">
              Discover a wide range of products and explore various categories.
            </p>
            <Link to="/category/all" className="bg-blue-500 text-white px-8 py-3 rounded-full">
              Explore Now
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 p-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About us</h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto">
        {images.map((image, index) => (
            <Link to={`/category/${image.category.toLowerCase()}`} key={index}>
            <div className="relative bg-white p-4 rounded-md shadow-md cursor-pointer overflow-hidden group">
                <img
                src={image.src}
                alt={`Ecom ${index + 1}`}
                className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold mb-2">{image.category}</h3>
                <p className="text-gray-600">Product description goes here.</p>
                <p className="text-gray-500 mt-2">Category: {image.category}</p>
                <div className="absolute inset-0 group-hover:after:bg-red-500 group-hover:after:block group-hover:after:content-[''] group-hover:after:absolute group-hover:after:w-full group-hover:after:h-full group-hover:after:opacity-50 group-hover:after:transition-all group-hover:after:duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:transition-opacity group-hover:duration-300">
                <p className="text-white font-bold">Explore Category</p>
                </div>
            </div>
            </Link>
        ))}
        </div>


      <div className="bg-gray-200 p-8 mt-8">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Customer Testimonials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-4 rounded-md shadow-md transition-transform transform hover:scale-105">
                <p className="text-gray-600">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua."
                </p>
                <p className="text-gray-800 font-semibold mt-4">- Customer 1</p>
            </div>
            <div className="bg-white p-4 rounded-md shadow-md transition-transform transform hover:scale-105">
                <p className="text-gray-600">
                "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat."
                </p>
                <p className="text-gray-800 font-semibold mt-4">- Customer 2</p>
            </div>
            </div>
        </div>
    </div>


    </div>
  );
};

export default Home;
