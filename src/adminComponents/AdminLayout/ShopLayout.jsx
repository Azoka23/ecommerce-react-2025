import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { HomeButton } from "../../components/HomeButton/HomeButton";
import { Outlet } from "react-router-dom"; 

export const ShopLayout = () => {
  return (
    <>
      <Header />
        <Outlet />
      <Footer />
      <HomeButton />
    </>
  );
};
