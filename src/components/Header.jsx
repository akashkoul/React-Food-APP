import logoImg from "../assets/logo.jpg";
import Button from "./UI/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";
import { useContext } from "react";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);
  const totalCart = cartCtx.items.reduce((totalNumber, item) => {
    return totalNumber + item.quantity;
  }, 0);

  function handleShowCart(){
    userCtx.showCart('cart')
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Logo" />
        <h1>Food App</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>Cart ({totalCart})</Button>
      </nav>
    </header>
  );
}
