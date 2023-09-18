import { useCallback, useEffect, useState } from "react";
import useNavbar from "../../../hooks/GeneralHooks/NavbarHooks/NavbarHook";
import Home3WebNavbar from "./components/Home3WebNavbar";
import MobNavbar from "./components/MobNavbar";
import useSearchHook from "../../../hooks/GeneralHooks/SearchHooks/search-hook";
import useMultilangHook from "../../../hooks/LanguageHook/Multilanguages-hook";
import { useSelector } from "react-redux";
import { SelectedFilterLangDataFromStore } from "../../../store/slices/general_slices/selected-multilanguage-slice";

const Home3Navbar = () => {
  const {
    navbarData,
    isLoading,
    handleCurrencyValueChange,
    selectedCurrencyValue,
    
  } = useNavbar();
  const { searchValue, setSearchValue, handleSearch, handleKeyDown , handleSearchIputValue,} =
    useSearchHook();
  const { handleLanguageChange, multiLanguagesData } = useMultilangHook();
  const [clicks, setClicks] = useState(false);

  const navMenuclick = (e: any) => {
    console.log("clickk");
    e.preventDefault();
    setClicks(!clicks);
  };
  const SelectedLangDataFromStore: any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();
  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore]);
  console.log("multiLanguagesData", SelectedLangDataFromStore);
  return (
    <div className={clicks ? "mmenu-active" : ""}>
      <Home3WebNavbar
        navbarData={navbarData}
        isLoading={isLoading}
        navMenuclick={navMenuclick}
        multiLanguagesData={multiLanguagesData}
        handleLanguageChange={handleLanguageChange}
        handleCurrencyValueChange={handleCurrencyValueChange}
        selectedCurrencyValue={selectedCurrencyValue}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
        selectedMultiLangData={selectedMultiLangData}
        handleSearchIputValue={handleSearchIputValue}
      />
      <MobNavbar
        navbarData={navbarData}
        isLoading={isLoading}
        navMenuclick={navMenuclick}
        setClicks={setClicks}
        clicks={clicks}
        multiLanguagesData={multiLanguagesData}
        handleLanguageChange={handleLanguageChange}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        selectedMultiLangData={selectedMultiLangData}
      />
    </div>
  );
};

export default Home3Navbar;
