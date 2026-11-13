import Header from "./components/Header";
import Meals from "./components/Meals";
import { ContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart"
import Checkout from "./components/Checkout";

function App() {
  return (
    <ContextProvider>
      <UserProgressContextProvider>
        <Header />
        <Meals />
        <Cart />
        <Checkout />
      </UserProgressContextProvider>
    </ContextProvider>
  );
}

export default App;
