import React, { useEffect } from "react";
import useDisplayTagHooks from "../hooks/HomePageHooks/DisplayTagHooks";
import useHomeTopCategories from "../hooks/HomePageHooks/HomeTopCategoriesHook";
import TernaryThemeHomeTopCategories from "./Homepage3/TernaryThemeHomeTopCategories";
import DisplayTagHome3 from "./Homepage3/DisplayTagHome3";
import OurFeaturedBrand from "./Homepage3/OurFeaturedBrand";
import TernaryThemeTopCategoriesBanner from "./Homepage3/TernaryThemeTopCategoriesBanner";
import TernaryThemeHomeBanner from "./Homepage3/TernaryThemeHomeBanner";
import { useDispatch } from "react-redux";
import { setDefaultCurrencyValue } from "../store/slices/general_slices/multi-currency-slice";
import { setMultiLingualData } from "../store/slices/general_slices/multilang-slice";
const HomepageMaster = ({ default_currency_value, multi_lingual_values }: any) => {
  const { allTagsData } = useDisplayTagHooks();
  const dispatch = useDispatch();

  // dispatch(setDefaultCurrencyValue(default_currency_value));
  dispatch(setMultiLingualData(multi_lingual_values));

  const { homeTopCategories, isLoading, selectedCurrencyVal } =
    useHomeTopCategories();

  const renderSectionComponent = (index: number) => {
    switch (index) {
      case 0:
        return (
          <TernaryThemeTopCategoriesBanner
            homeTopCategories={homeTopCategories}
            selectedCurrencyVal={selectedCurrencyVal}
          />
        );
      case 1:
        return <OurFeaturedBrand />;
      // Add more cases as needed for other section components
      default:
        return null;
    }
  };

  // console.log("display tag in home ", allTagsData);

  return (
    <>
      <TernaryThemeHomeBanner />
      <TernaryThemeHomeTopCategories
        homeTopCategories={homeTopCategories}
        isLoading={isLoading}
        selectedCurrencyVal={selectedCurrencyVal}
      />

      {allTagsData?.map((data: any, index: number) => (
        <React.Fragment key={index}>
          <DisplayTagHome3 data={data} />
          {renderSectionComponent(index)}
        </React.Fragment>
      ))}
    </>
  );
};

export default HomepageMaster;
