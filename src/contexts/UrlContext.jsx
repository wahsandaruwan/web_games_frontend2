// ---------Inbuilt components & modules---------
import { createContext, useState } from "react";

// Create context
const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  // Url state
  const [Urls, SetUrls] = useState({
    baseUrl: "https://cricket.k2games.online/api/",
  });

  return (
    <UrlContext.Provider
      value={{
        Urls,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export { UrlContext, UrlProvider };
