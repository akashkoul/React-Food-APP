import Header from "./components/Header";
import Meals from "./components/Meals";
import { ContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";
import Cart from "./components/Cart"
function App() {
  return (
    <ContextProvider>
      <UserProgressContextProvider>
        <Header />
        <Meals />
        <Cart />
      </UserProgressContextProvider>
    </ContextProvider>
  );
}

export default App;
