import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";

function Cart() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submitCheckout = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      setError("Please log in to proceed with checkout.");
      navigate("/login");
      return;
    }

    const orderData = {
      userId: user.id,
      items: cartItems,
      totalPrice: totalPrice,
      orderDate: new Date().toISOString(),
    };

    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        setMessage("Order placed successfully!");
        clearCart();
        setShowConfirm(false);
        navigate("/");
      } else {
        const err = await response.json();
        setError(err.message || "Failed to place order.");
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const openConfirm = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token || !user) {
      setError("Please log in to proceed with checkout.");
      navigate("/login");
      return;
    }
    setShowConfirm(true);
  };

  const closeConfirm = () => {
    if (!submitting) {
      setShowConfirm(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Your Cart</h1>

      {error && (
        <div className="alert alert-danger" role="alert">{error}</div>
      )}
      {message && (
        <div className="alert alert-success" role="alert">{message}</div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center mt-5">
          <p className="lead">Your cart is empty.</p>
          <a href="/products" className="btn btn-dark">Shop Products</a>
        </div>
      ) : (
        <>
          <div className="table-responsive mb-4">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map(item => <CartItem key={item.id} item={item} />)}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-column flex-md-row justify-content-end align-items-center gap-3 mt-4">
            <h4 className="mb-2 mb-md-0">Total: ${totalPrice.toFixed(2)}</h4>
            <button className="btn btn-outline-dark btn-lg" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="btn btn-dark btn-lg" onClick={openConfirm}>
              Checkout
            </button>
          </div>

        </>
      )}

      {showConfirm && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Checkout</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeConfirm} />
                </div>
                <div className="modal-body">
                  <p className="mb-2">You are about to place this order.</p>
                  <p className="mb-1"><strong>Items:</strong> {cartItems.length}</p>
                  <p className="mb-0"><strong>Total:</strong> ${totalPrice.toFixed(2)}</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeConfirm} disabled={submitting}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-dark" onClick={submitCheckout} disabled={submitting}>
                    {submitting ? "Placing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show" />
        </>
      )}
    </div>
  );
}

export default Cart;
