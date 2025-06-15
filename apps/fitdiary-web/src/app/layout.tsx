import React from "react";
import Header from "../components/Header";
import "./globals.css";
import { UserProvider } from "@/lib/UserContext";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <UserProvider>
        <body className={`antialiased`}>
          <Header />
          <main>{children}</main>
        </body>
      </UserProvider>
    </html>
  );
};

export default Layout;
