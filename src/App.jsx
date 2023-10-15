// ----------Third-party components and modules----------
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// ----------Custom components and modules----------
import { Login, Dashboard, Data } from "./pages";
import { UrlProvider, AuthProvider } from "./contexts";

function App() {
  return (
    <UrlProvider>
      <AuthProvider>
        <>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Router>
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/data589796" element={<Data />} />
              </Routes>
            </Router>
          </div>
        </>
      </AuthProvider>
    </UrlProvider>
  );
}

export default App;
