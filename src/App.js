import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { CookiesProvider } from "react-cookie";
import makeStore from "./redux/store";
import router from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const store = makeStore();
const persistor = persistStore(store);

function App() {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-center"
            autoClose={700}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </PersistGate>
      </Provider>
    </CookiesProvider>
  );
}

export default App;
