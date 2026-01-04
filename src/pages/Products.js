import { useState, useContext, useMemo, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { assets } from "../assets/assets";
import ProductCarousel from "../styles/ProductCarousel";
import "../styles/Products.css";

// Map image filenames to actual imports
const imageMap = {
  "MyMelody.jpeg": assets.Melody,
  "Kuromi1.jpeg": assets.Kuromi,
  "Cinnamoroll.jpeg": assets.Cinnamoroll,
  "Pochacco.jpeg": assets.Pochacco,
  "Pompompurin.jpeg": assets.Pompompurin,
  "Keroppi.jpeg": assets.Keroppi,
  "earrings.jpg": assets.earrings,
  "earrings1.jpg": assets.earrings1,
  "PeriwinkleBowKeychain.jpg": assets.PerwinkleBowKeychain,
  "PeriwinkleBowKeychain2.jpg": assets.PerwinkleBowKeychain2,
  "LilacBowKeychain.jpg": assets.LilacBowKeychain,
  "LilacBowKeychain2.jpg": assets.LilacBowKeychain2,
  "GegoBracelets.jpg": assets.gego,
  "sylus.jpeg": assets.sylus,
  "caleb.jpeg": assets.caleb,
  "rafayel.jpeg": assets.rafayel,
  "xavier.jpeg": assets.xavier,
  "zayne.jpeg": assets.zayne,
  "PeachBowKeychain.jpeg": assets.PeachBowKeychain,
  "PeachBowKeychain2.jpeg": assets.PeachBowKeychain2,
  "PinkBowKeychain.jpeg": assets.PinkBowKeychain,
  "PinkBowKeychain2.jpeg": assets.PinkBowKeychain2,
  "YellowBowKeychain.jpeg": assets.YellowBowKeychain,
  "YellowBowKeychain2.jpeg": assets.YellowBowKeychain2,
  "StarPhoneCharms.jpeg": assets.StarCharms,
  "StarPhoneCharms2.jpeg": assets.StarCharms2,
  "Necklace.jpeg": assets.necklaces,
  "Necklace2.jpeg": assets.necklaces2,
};

function Products({ search }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedFandom, setSelectedFandom] = useState("All");
  const [selectedColor, setSelectedColor] = useState("All");
  const [maxPrice, setMaxPrice] = useState(20);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => {
        // Map filenames to actual image imports
        const mappedData = data.map(product => ({
          ...product,
          images: product.images.map(filename => imageMap[filename] || filename)
        }));
        setProductsData(mappedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch products:", err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(productsData.map(p => p.category))],
    [productsData]
  );
  const fandoms = useMemo(
    () => ["All", ...new Set(productsData.map(p => p.fandom).filter(Boolean))],
    [productsData]
  );
  const colors = useMemo(
    () => ["All", ...new Set(productsData.map(p => p.color).filter(Boolean))],
    [productsData]
  );

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" ||
        (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());
      const priceMatch = product.price <= Number(maxPrice);
      const searchMatch = product.name.toLowerCase().includes(search.toLowerCase());
      const fandomMatch =
        selectedFandom === "All" ||
        (product.fandom && product.fandom.toLowerCase() === selectedFandom.toLowerCase());
      const colorMatch =
        selectedColor === "All" ||
        (product.color && product.color.toLowerCase() === selectedColor.toLowerCase());

      return categoryMatch && priceMatch && searchMatch && fandomMatch && colorMatch;
    });
  }, [selectedCategory, selectedFandom, selectedColor, maxPrice, search, productsData]);

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">

        {/* Products Grid */}
        <div className="col-md-9">
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div className="col-sm-6 col-lg-4 mb-4" key={product.id}>
                  <div className="card h-100 shadow-sm border-0 rounded-4 card-hover">
                    <ProductCarousel images={product.images} id={product.id} />

                    <div className="card-body text-center d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title fw-semibold">{product.name}</h5>
                        <p className="card-text fs-5 text-primary fw-bold">${product.price}</p>
                      </div>
                      <button
                        className="btn btn-dark mt-3 add-to-cart-btn"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted fs-5">No products match your filters.</p>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        <div className="col-md-3 mb-4">
          <div className="p-3 border rounded shadow-sm bg-light">
            <h4 className="mb-3 text-center">Filters</h4>

            {/* Category Filter */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Category</label>
              <select
                className="form-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Fandom Filter */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Fandom</label>
              <select
                className="form-select"
                value={selectedFandom}
                onChange={(e) => setSelectedFandom(e.target.value)}
              >
                {fandoms.map((fan) => (
                  <option key={fan}>{fan}</option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div className="mb-4">
              <label className="form-label fw-semibold">Color</label>
              <select
                className="form-select"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
              >
                {colors.map((col) => (
                  <option key={col}>{col}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Max Price: ${maxPrice}
              </label>
              <input
                type="range"
                className="form-range"
                min="1"
                max="20"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Products;
