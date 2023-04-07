import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import RegisterPage from "./Pages/RegisterPage";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  const RegisterRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/user" element={<h1>You are logged in</h1>} />
      </Routes>
    );
  };

  return (
    <Provider store={store}>
      <Router>
        <RegisterRoutes />
      </Router>
    </Provider>
  );
}

export default App;
