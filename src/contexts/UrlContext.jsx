// ---------Inbuilt components & modules---------
import { createContext, useState } from "react";

// Create context
const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  // Url state
  const [Urls, SetUrls] = useState({
    baseUrl: "http://cricket.k2games.online/api/",
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
