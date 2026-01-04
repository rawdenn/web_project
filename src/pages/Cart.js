import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import CartItem from "../components/CartItem";

function Cart() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Check if user is logged in
    if (!token || !user) {
      alert("Please login to proceed with checkout");
      navigate("/login");
      return;
    }

    // Prepare order data
    const orderData = {
      userId: user.id,
      items: cartItems,
      totalPrice: totalPrice,
      orderDate: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const result = await response.json();
        alert("Order placed successfully!");
        clearCart();
        navigate("/");
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="mb-4 text-center">Your Cart</h1>

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
            <button className="btn btn-dark btn-lg" onClick={handleCheckout}>
              Checkout
            </button>
          </div>

        </>
      )}
    </div>
  );
}

export default Cart;
