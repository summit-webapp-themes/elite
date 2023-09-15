import useLinguisticsAndForexHook from "../../../../hooks/GeneralHooks/NavbarHooks/LinguisticsAndForexHook";
import useMultilangHook from "../../../../hooks/LanguageHook/Multilanguages-hook";

const LinguisticsAndForex = () => {
  const { handleCurrencyValueChange } = useLinguisticsAndForexHook();
  const { handleLanguageChange, multiLanguagesData } = useMultilangHook();

  return (
    <>
      <div className="ms-5" >
        <select
          onChange={(e: any) => handleCurrencyValueChange(e.target.value)}
          className="ternary-select product-price  price"
        >
          <option value="INR">₹</option>
          <option value="USD">$</option>
          <option value="EUR">€</option>
        </select>
      </div>

      <div className="" >
        <select
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="ternary-select fs-5 bold"
        >
          {multiLanguagesData?.length > 0 &&
            multiLanguagesData !== null &&
            multiLanguagesData.map((lang: any) => {
              return <option value={lang.lang_code}>{lang.lang_name}</option>;
            })}
        </select>
      </div>
    </>
  );
};

export default LinguisticsAndForex;
