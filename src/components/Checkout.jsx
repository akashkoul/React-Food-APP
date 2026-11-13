import Modal from "./Modal";
import CartContext from "../store/CartContext";
import { useContext, useActionState } from "react";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userCtx = useContext(UserProgressContext);
  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * +item.price;
  }, 0);

  const { data, err, sendReq, clearData } = useHttp(
    "http://localhost:3000/orders",
    requestConfig,
  );

  function handleClose() {
    userCtx.hideCheckout();
  }

  function handleFinish() {
    userCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  async function checkoutAction(prevData, formData) {
    const custData = Object.fromEntries(formData.entries());

    await sendReq(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: custData,
        },
      }),
    );
  }
  const [formState, formAction, isSending] = useActionState(checkoutAction, null);
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button> Submit Order </Button>
    </>
  );
  if (isSending) actions = <span> Sending order data ...</span>;
  if (data && !err)
    return (
      <Modal open={userCtx.progress === "checkout"} onClose={handleFinish}>
        <h2>Success</h2>
        <p>Order Created</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Ok</Button>
        </p>
      </Modal>
    );

  return (
    <Modal onClose={handleClose} open={userCtx.progress === "checkout"}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" id="name" type="text" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" id="street" type="street" />
        <div className="control-row">
          <Input label="Postal Code" id="postal-code" type="text" />
          <Input label="City" id="city" type="street" />
        </div>
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
