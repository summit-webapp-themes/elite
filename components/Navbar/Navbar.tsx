import { useCallback, useEffect, useState } from "react";
import useNavbar from "../../hooks/GeneralHooks/NavbarHooks/NavbarHook";
import WebNavbar from "./components/WebNavbar";
import UseMultilangHook from "../../hooks/LanguageHook/Multilanguages-hook";
import MobNavbar from "./components/WebNavbar";
import useSearchHook from "../../hooks/GeneralHooks/SearchHooks/search-hook";

const Navbar = () => {
  const {
    navbarData,
    isLoading,
    handleCurrencyValueChange,
    selectedCurrencyValue,
  } = useNavbar();

  const { handleLanguageChange, multiLanguagesData } = UseMultilangHook();
  const { searchValue, setSearchValue, handleSearch, handleKeyDown } =
    useSearchHook();
  const [clicks, setClicks] = useState(false);

  const navMenuclick = (e: any) => {
    // console.log("clickk");
    e.preventDefault();
    setClicks(!clicks);
  };

  // console.log("click", multiLanguagesData);
  return (
    <div className={clicks ? "mmenu-active" : ""}>
      <WebNavbar
        navbarData={navbarData}
        isLoading={isLoading}
        navMenuclick={navMenuclick}
        handleLanguageChange={handleLanguageChange}
        handleCurrencyValueChange={handleCurrencyValueChange}
        selectedCurrencyValue={selectedCurrencyValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
        multiLanguagesData={multiLanguagesData}
      />
      <MobNavbar
        navbarData={navbarData}
        isLoading={isLoading}
        navMenuclick={navMenuclick}
        setClicks={setClicks}
        clicks={clicks}
        handleLanguageChange={handleLanguageChange}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        multiLanguagesData={multiLanguagesData}
      />
    </div>
  );
};

export default Navbar;
