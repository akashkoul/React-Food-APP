import Header from "./components/Header";
import Meals from "./components/Meals";
import { ContextProvider } from "./store/CartContext";

function App() {
  return (
    <ContextProvider>
      <Header />
      <Meals />
    </ContextProvider>
  );
}

export default App;
