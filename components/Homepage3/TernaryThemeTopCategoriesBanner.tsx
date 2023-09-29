import Image from "next/image";
import React from "react";
import useHomeTopCategories from "../../hooks/HomePageHooks/HomeTopCategoriesHook";
import { CONSTANTS } from "../../services/config/app-config";
import BannerLoaderComponent from "../LoadingLayout/BannerLoaderComponent";
import Link from "next/link";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";
import { useSelector } from "react-redux";

const TernaryThemeTopCategoriesBanner = ({ homeTopCategories }: any) => {
  // const { homeTopCategories, isLoading } = useHomeTopCategories();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="container  " >
        <div className="row category_heading_mob pt-4"   
>
          {homeTopCategories?.length > 0 && homeTopCategories !== null ? (
            <>
              {homeTopCategories?.length > 0 ? (
                <>
                  <>
                    <div className="col-lg-4 banner-margin-b mt-0 pt-0" >
                      <Link
                        href={`/product-category/${homeTopCategories[1]?.slug}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                      >
                        <Image
                          loader={imageLoader}
                          src={homeTopCategories[1]?.product_img}
                          width={500}
                          height={331}
                          className=""
                          alt="categories banner img"
                        />
                      </Link>
                    </div>
                    <div className="col-lg-4 banner-margin-b mt-0 pt-0" >
                      <Link
                        href={`/product-category/${homeTopCategories[0]?.slug}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                      >
                        <Image
                          loader={imageLoader}
                          src={homeTopCategories[0]?.product_img}
                          width={500}
                          height={260}
                          className="ternarytheme-topcategory"
                          alt="categories banner img"
                        />
                      </Link>
                    </div>
                    <div className="col-lg-4 mt-0 pt-0" >
                      <Link
                        href={`/product-category/${homeTopCategories[2]?.slug}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                      >
                        <Image
                          loader={imageLoader}
                          src={homeTopCategories[2]?.product_img}
                          width={500}
                          height={331}
                          alt="categories banner img"
                        />
                      </Link>
                    </div>
                  </>
                </>
              ) : (
                <>
                  <div className="col-lg-3 text-end">
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px", width: "auto" }}
                    />
                  </div>
                  <div className="col-lg-6"
                  >
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px", width: "auto" }}
                    />
                  </div>
                  <div className="col-lg-3">
                    <Image
                      src="/assets/images/maximaCard.jpg"
                      width="300"
                      height="250"
                      alt="categories banner img"
                      style={{ height: "250px", width: "auto" }}
                    />
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="container">
              <div className="row justify-content-center">
                {[...Array(3)].map(() => (
                  <>
                    <div className="col-lg-3 mx-5">
                      <BannerLoaderComponent />
                    </div>
                  </>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TernaryThemeTopCategoriesBanner;
