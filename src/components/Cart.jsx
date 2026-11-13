import Modal from "./Modal";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * +item.price;
  }, 0);

  function handleCloseCart() {
    userCtx.hideCart();
  }

  function handleCheckoutCart() {
    userCtx.showCheckout("checkout");
  }

  function handleCloseCart() {
    userCtx.hideCart();
  }

  return (
    <Modal
      className="cart"
      onClose={userCtx.progress === "cart" ? handleCloseCart : null}
      open={userCtx.progress === "cart"}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            quantity={item.quantity}
            price={item.price}
            name={item.name}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleCheckoutCart}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
