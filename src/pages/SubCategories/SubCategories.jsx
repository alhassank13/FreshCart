import React, { useEffect, useState } from "react";
import BrandCard from "../../Compontents/BrandCard/BrandCard";
import axios from "axios";
import errorImage from "../../assets/images/error.svg";
import Loader from "../../Compontents/Loader/Loader";
import SubCategoriesCard from "../../Compontents/SubCategoriesCard/SubCategoriesCard";

export default function SubCategories() {
  let [subcategories, setSubCategoties] = useState([]);
  let [loading, setLoading] = useState(false);
  let [error, setError] = useState(null);

  async function getSubAllCategories() {
    setLoading(true);
    try {
      let { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/subcategories"
      );
      setSubCategoties(data.data);
    } catch (err) {
      console.log(err);
      //
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSubAllCategories();
  }, []);

  return (
    <div className="min-h-screen bg-slate-300 dark:bg-slate-800 transition-colors duration-300 py-10">
      <div className="container mx-auto px-4 ">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">
          SubCategories
        </h2>

        {loading ? (
          <Loader />
        ) : error ? (
          <img src={errorImage} alt="errorImage" className="w-full " />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {subcategories.map((item) => (
              <SubCategoriesCard item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
