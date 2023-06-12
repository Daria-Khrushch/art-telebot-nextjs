import Navbar from "../components/Navbar";
import "./../styles/globals.css";
import { Providers } from "@components/Providers";

export const metadata = {
  title: "telebot-services",
  description: "telebot-services",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="ru">
      <link rel="icon" href="./assets/images/logo.png" sizes="any" />
      <body>
        <Providers>
          <main>
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
