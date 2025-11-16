import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [itemsRes, catRes] = await Promise.all([
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/food`),
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/category`),
      ]);

      const [itemsData, catData] = await Promise.all([
        itemsRes.json(),
        catRes.json(),
      ]);

      setFoodItem(itemsData);
      setFoodCat(catData);
      setLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredItems = foodItem.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.CategoryName === selectedCategory;
    const matchesSearch =
      searchTerm.trim() === "" ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="home-page" style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
        <Carousel searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="container py-4">
          {/* Category Buttons */}
          <div className="my-4 text-center">
            <div className="d-flex justify-content-center flex-wrap gap-2">
              <button
                className={`btn ${
                  selectedCategory === "All" ? "btn-success" : "btn-outline-success"
                }`}
                onClick={() => setSelectedCategory("All")}
              >
                All
              </button>
              {foodCat.map((cat) => (
                <button
                  key={cat._id}
                  className={`btn ${
                    selectedCategory === cat.name
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => setSelectedCategory(cat.name)}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Loading Spinner */}
          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status"></div>
              <div className="mt-2">Loading menu...</div>
            </div>
          )}

          {/* Food Items */}
          {!loading && (
            <div className="row justify-content-center">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <div key={item._id} className="col-12 col-md-6 col-lg-4 mb-4">
                    <Card
                      _id={item._id}
                      name={item.name}
                      img={item.img}
                      options={item.options}
                      description={item.description}
                    />
                  </div>
                ))
              ) : (
                <div className="text-center py-5">
                  <h5 className="text-muted">No items found</h5>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
