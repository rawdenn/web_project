import { useState } from "react";
import { assets } from "../assets/assets";

function Customize() {
    const [metal, setMetal] = useState("");
    const [customCategory, setCustomCategory] = useState("");
    const [size, setSize] = useState("");

    const getMetalPreview = () => {
        switch (metal) {
            case "Gold": return null;
            case "Silver": return assets.silver;
            case "Rose Gold": return null; //change later
            default: return null;
        }
    };

    const getCategoryPreview = () => {
        switch (customCategory) {
            case "Bracelet": return assets.sanrio;
            case "Necklace": return assets.necklaces;
            case "Earring": return assets.earrings;
            case "Keychain": return assets.LilacBowKeychain;
            default: return null;
        }
    };


    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Customize Your Jewelry</h1>

            <div className="row g-4">

                <div className="col-12 col-md-6">
                    <div className="card p-4 shadow-sm border-0 rounded-4">

                        {/* Category */}
                        <label className="form-label fw-semibold">Category</label>
                        <select
                            className="form-select mb-3"
                            value={customCategory}
                            onChange={(e) => setCustomCategory(e.target.value)}
                        >
                            <option>Select Category</option>
                            <option>Bracelet</option>
                            <option>Necklace</option>
                            <option>Earring</option>
                            <option>Keychain</option>
                        </select>

                        {/* Metal */}
                        <label className="form-label fw-semibold">Metal Type</label>
                        <select
                            className="form-select mb-3"
                            value={metal}
                            onChange={(e) => setMetal(e.target.value)}
                        >
                            <option>Select metal</option>
                            <option>Gold</option>
                            <option>Silver</option>
                            <option>Rose Gold</option>
                        </select>

                        {/* To be changed later */}
                        <label className="form-label fw-semibold">Size</label>
                        <input
                            type="text"
                            placeholder="Enter bracelet size"
                            className="form-control mb-3"
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                        />

                        {/* To be changed later */}
                        <button className="btn btn-dark w-100 rounded-4">
                            Submit Custom Request
                        </button>

                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="card p-4 shadow-sm border-0 rounded-4 text-center">
                        <h4 className="fw-bold mb-3">Preview</h4>

                        <div className="p-4 border rounded-4 mb-3 
                            d-flex align-items-center justify-content-center flex-column"
                            style={{ minHeight: "200px" }}
                        >
                            {((!metal && !customCategory) || (metal === "Select metal" && customCategory === "Select Category")) ? (
                                <p className="text-muted">Your design will appear here</p>
                            ) : (
                                <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
                                    {/* Metal Preview */}
                                    {metal && metal !== "Select metal" && (
                                        getMetalPreview() ? (
                                            <img
                                                src={getMetalPreview()}
                                                alt={metal}
                                                className="img-fluid rounded-4 mb-3"
                                                style={{ maxWidth: "150px" }}
                                            />
                                        ) : (
                                            <p className="text-muted">{metal} preview not available</p>
                                        )
                                    )}

                                    {/* Category Preview */}
                                    {customCategory && customCategory !== "Select Category" && (
                                        getCategoryPreview() ? (
                                            <img
                                                src={getCategoryPreview()}
                                                alt={customCategory}
                                                className="img-fluid rounded-4 mb-3"
                                                style={{ maxWidth: "250px" }}
                                            />
                                        ) : (
                                            <p className="text-muted">{customCategory} preview not available</p>
                                        )
                                    )}

                                </div>
                            )}
                        </div>

                        <div className="text-start">
                            <p><strong>Category: </strong>
                                {customCategory && customCategory !== "Select Category" ? customCategory : "—"}
                            </p>

                            <p><strong>Metal: </strong>
                                {metal && metal !== "Select metal" ? metal : "—"}
                            </p>

                            <p><strong>Size: </strong>
                                {size ? size : "—"}
                            </p>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    );
}

export default Customize;
