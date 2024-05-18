

import React from 'react';
import heroImage from '../assets/homepage1.png';
import featureIcon1 from '../assets/featureIcon1.png';
import featureIcon2 from '../assets/featureIcon2.png';
import featureIcon3 from '../assets/featureIcon3.png';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-24">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl font-bold text-white mb-4">CONTENTIFY</h1>
            <p className="text-gray-300">
              Unleash your creativity and effortlessly manage your content with our powerful headless CMS.
            </p>
            <Link
              to={'/dashboard'}
              className="bg-white text-indigo-600 py-2 px-4 rounded mt-8 inline-block hover:bg-gray-200 transition-colors duration-300 shadow-md"
            >
              Get Started
            </Link>
          </div>
          <div className="md:w-1/2">
            <img src={heroImage} alt="Hero" className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:bg-indigo-600 hover:text-white transition duration-300">
            <div className="flex items-center justify-center mb-4 ">
              <img src={featureIcon1} alt="Feature Icon" className="rounded-lg w-full h-48 " />
            </div>
            <h3 className="text-xl font-bold mb-4">Custom Entities</h3>
            <p>
              Create custom entities with specified attributes and generate corresponding database tables.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:bg-indigo-600 hover:text-white transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <img src={featureIcon2} alt="Feature Icon" className="rounded-lg w-full h-48 " />
            </div>
            <h3 className="text-xl font-bold mb-4">CRUD Operations</h3>
            <p>
              Perform Create, Read, Update, and Delete operations on your entities from the frontend.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 hover:bg-indigo-600 hover:text-white transition duration-300">
            <div className="flex items-center justify-center mb-4">
              <img src={featureIcon3} alt="Feature Icon" className="rounded-lg w-full h-48" />
            </div>
            <h3 className="text-xl font-bold mb-4">User-Friendly Interface</h3>
            <p>
              Enjoy a seamless and intuitive experience with our user-friendly frontend interface.
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-indigo-600 py-8 rounded-b-lg">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white">&copy; Contentify</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;