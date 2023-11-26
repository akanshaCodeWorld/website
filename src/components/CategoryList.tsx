import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '../api/api';
import CategoryFilter from './CategoryFilter';
import bannerImage from '../assets/banner.jpeg';
import banner2 from '../assets/banner2.jpeg';
import banner3 from '../assets/banner3.jpeg';

const ITEMS_PER_PAGE = 10;

const CategoryListPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);



  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const allProducts = await getProductsByCategory('');
  
        let filteredProducts = allProducts;
  
        if (category.toLowerCase() !== 'all') {
          filteredProducts = allProducts.filter(
            (product: any) => product.category.toLowerCase() === category.toLowerCase()
          );
        }
  

        filteredProducts = filteredProducts.filter((product: any) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
  

        filteredProducts.sort((a: any, b: any) => {
          const priceA = a.price;
          const priceB = b.price;
  
          if (sortOrder === 'asc') {
            return priceA - priceB;
          } else {
            return priceB - priceA;
          }
        });
  
        if (filteredProducts.length === 0) {
          setError(`No products found matching the search term "${searchTerm}".`);
          setSearchTerm('');
        } else {
          setProducts(filteredProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [category, searchTerm, sortOrder]);
  
  

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
  };


  useEffect(() => {
    setSearchTerm('');
    setCurrentPage(1);
  }, [category]);


  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedProducts = products.slice(startIndex, endIndex);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex flex-col">
        <div
      className="relative bg-cover bg-center h-96 md:h-80"
      style={{ backgroundImage: `url(${banner2})` }}
    >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white text-center">
            <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore {category}</h1>
                <p className="text-lg md:text-xl mb-8">Find the best deals on {category.toLowerCase()}.</p>
                
            </div>
            </div>
        </div>

        <header className="flex flex-col sm:flex-row justify-between items-center bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-semibold mb-2 sm:mb-0 sm:mr-4">Product Listing</h1>
            <div className="flex items-center">
                <div className="mr-4 flex">
                <input
                    type="text"
                    placeholder="Search in categories"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-2 border border-gray-300 rounded-l w-full text-black flex-grow"
                />
                <button
                    className="bg-blue-500 text-white p-2 rounded-r"
                    onClick={() => handlePageChange(currentPage)}
                >
                    Search
                </button>
                </div>
                <button
                className="bg-gray-500 text-white p-2 rounded"
                onClick={toggleSortOrder}
                >
                {sortOrder === 'asc' ? 'Sort Price Max-Min' : 'Sort Price Min-Max'}
                </button>
            </div>
        </header>

      <div className="flex">
        <CategoryFilter />
        <div className="bg-gray-200 min-h-screen flex flex-col w-full p-5">
          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {displayedProducts.map((product: any) => (
                <div
                  key={product.id}
                  className="border p-4 rounded-md shadow-md transition-all transform hover:bg-gray-100 hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-32 object-cover mb-2 rounded-t-md  transform hover:scale-110 rounded-sm"
                  />
                  <h3 className="text-md font-semibold">{product.title}</h3>
                  <p className="text-gray-600 text-md">${product.price}</p>
                </div>
              ))}
            </div>
          )}


          {!error && <div className="flex justify-center mt-4">
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default CategoryListPage;
