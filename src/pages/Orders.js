import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [confirmOrder, setConfirmOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      navigate("/login");
      return;
    }

    fetch(`${API_BASE_URL}/api/users/${user.id}/orders`, {
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

  const handleDeleteOrder = (orderId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    setDeleting(orderId);
    fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId: user.id }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Order deleted successfully") {
          setOrders(orders.filter(order => order.id !== orderId));
          setError("");
        } else {
          setError(data.message || "Failed to delete order");
        }
        setDeleting(null);
      })
      .catch(err => {
        console.error("Failed to delete order:", err);
        setError("Failed to delete order");
        setDeleting(null);
      });
  };

  const openConfirm = (order) => setConfirmOrder(order);
  const closeConfirm = () => setConfirmOrder(null);
  const handleConfirmDelete = () => {
    if (!confirmOrder) return;
    handleDeleteOrder(confirmOrder.id);
    closeConfirm();
  };

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

                  {/* Delete Button */}
                  <div className="mt-3 d-flex justify-content-end">
                    <button
                      onClick={() => openConfirm(order)}
                      disabled={deleting === order.id}
                      className="btn btn-outline-danger btn-sm"
                    >
                      {deleting === order.id ? "Deleting..." : "Delete Order"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {confirmOrder && (
        <>
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Delete Order #{confirmOrder.id}</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={closeConfirm} />
                </div>
                <div className="modal-body">
                  <p className="mb-0">This will permanently remove the order and its items. Proceed?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeConfirm} disabled={deleting === confirmOrder.id}>
                    Cancel
                  </button>
                  <button type="button" className="btn btn-danger" onClick={handleConfirmDelete} disabled={deleting === confirmOrder.id}>
                    {deleting === confirmOrder.id ? "Deleting..." : "Delete"}
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

export default Orders;
