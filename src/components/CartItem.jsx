import { currencyFormatter } from "../util/formatting";
import CartContext from "../store/CartContext";
import { useContext } from "react";

export default function CartItem({name, quantity, price, onDecrease, onIncrease}){
     const cartCtx = useContext(CartContext);

   return <li className="cart-item">
        <p>
    {name} - {name} x {currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
}