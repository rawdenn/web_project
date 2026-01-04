import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function CartItem({ item }) {
  const { cartItems, setCartItems } = useContext(CartContext);
  const quantity = item.quantity || 1;
  

  const handleQuantityChange = (delta) => {
    setCartItems(
      cartItems.map(ci =>
        ci.id === item.id ? { ...ci, quantity: Math.max(1, (ci.quantity || 1) + delta) } : ci
      )
    );
  };

  const handleRemove = () => {
    setCartItems(cartItems.filter(ci => ci.id !== item.id));
  };


  return (
    <tr>
      <td className="d-flex align-items-center">
        <img src={item.images ? item.images[0] : item.image} alt={item.name} 
     style={{ width: "70px", height: "70px", objectFit: "cover", marginRight: "15px" }} />

        {item.name}
      </td>
      <td>${item.price}</td>
      <td>
        <div className="d-flex align-items-center">
          <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleQuantityChange(-1)}>-</button>
          <span>{quantity}</span>
          <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => handleQuantityChange(1)}>+</button>
        </div>
      </td>
      <td>${(item.price * quantity).toFixed(2)}</td>
      <td>
        <button className="btn btn-outline-danger btn-sm" onClick={handleRemove}>Remove</button>
      </td>
    </tr>
    
  );
}

export default CartItem;
