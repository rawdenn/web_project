import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:5000/api/users/${user.id}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.orders) {
          setOrders(data.orders);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch orders:", err);
        setError("Failed to load orders");
        setLoading(false);
      });
  }, [navigate]);

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
      <h1 className="mb-4 text-center">📋 My Orders</h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center mt-5">
          <p className="lead">You haven't placed any orders yet.</p>
          <a href="/products" className="btn btn-dark">Shop Now</a>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div className="col-md-8 offset-md-2 mb-4" key={order.id}>
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-8">
                      <h5 className="card-title">Order #{order.id}</h5>
                      <p className="text-muted">
                        <small>
                          {new Date(order.order_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </small>
                      </p>
                      <p className="card-text">
                        <strong>Status:</strong>{" "}
                        <span className={`badge bg-${order.status === 'pending' ? 'warning' : 'success'}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-4 text-end">
                      <h5 className="text-primary fw-bold">${parseFloat(order.total_price).toFixed(2)}</h5>
                      <small className="text-muted">Total Amount</small>
                    </div>
                  </div>

                  {/* Order Items */}
                  <hr />
                  <div className="mt-3">
                    <h6 className="fw-semibold">Items:</h6>
                    {order.items && order.items.length > 0 ? (
                      <ul className="list-unstyled">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="mb-2">
                            <small>
                              • {item.product_name || `Product #${item.product_id}`} × {item.quantity} @ ${parseFloat(item.price).toFixed(2)} each
                            </small>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <small className="text-muted">No items in this order</small>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
