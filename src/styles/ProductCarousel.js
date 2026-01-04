import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ProductCarousel({ images, id }) {
    if (!images || images.length === 0) return null;
    return (
        <div id={`carousel-${id}`} className="carousel slide">
            <div className="carousel-inner">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                        <img
                            src={img}
                            className="d-block w-100 rounded-top-4"
                            alt={`product-${id}-${index}`}
                            style={{ height: "260px", objectFit: "cover" }}
                        />
                    </div>
                ))}
            </div>

            {/* Prev / Next Buttons */}
            {images.length > 1 && (
                <>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#carousel-${id}`}
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon"></span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#carousel-${id}`}
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </>
            )}
        </div>
    );
}

export default ProductCarousel;
