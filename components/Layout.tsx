import { useRouter } from "next/router";
import Home3Navbar from "./Homepage3/Navbar/Home3Navbar";
import TernaryThemeFooter from "./Homepage3/TernaryThemeFooter";

const Layout = ({ children }: any) => {
  const router = useRouter();
  const toShowHeader =
    router.pathname === "/login" ||
    router.pathname === "/register" ||
    router.pathname === "/forgot_password"
      ? false
      : true;
  const toShowFooter =
    router.pathname === "/login" ||
    router.pathname === "/register" ||
    router.pathname === "/forgot_password"
      ? false
      : true;
     
  return (
    <>
      {toShowHeader && <Home3Navbar/>}
      {children}
      {toShowFooter && <TernaryThemeFooter/>}
    </>
  );
};
export default Layout;
