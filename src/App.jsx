import { Provider } from "react-redux";
import { NavBar } from "./Componets/NavIndex";
import { store } from "./Store/Store";
function App() {
  return (
    <>
      <Provider store={store}>
        <NavBar />
      </Provider>
    </>
  );
}

export default App;
