import React from "react";
import { CONSTANTS } from "../../services/config/app-config";
import Image from "next/image";
import BannerLoaderComponent from "../LoadingLayout/BannerLoaderComponent";
import Link from "next/link";
import useNavbar from "../../hooks/GeneralHooks/NavbarHooks/NavbarHook";
import { useSelector } from "react-redux";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";

const TernaryThemeHomeTopCategories = ({ homeTopCategories }: any) => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="container my-5 category_heading">
        <div className="row">
          {homeTopCategories?.length > 0 && homeTopCategories !== null ? (
            <>
              {homeTopCategories.length > 3 ? (
                <>
                  {homeTopCategories
                    ?.slice(3, 5)
                    ?.map((banner: any, index: any) => (
                      <div className="col-lg-6 col-12" key={banner.name}>
                        <>
                          {/* <Link href={`/product-category/${banner?.slug}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}> */}
                          <Image
                            loader={imageLoader}
                            src={banner?.product_img}
                            alt="banner of Topcategory"
                            width={600}
                            height={150}
                            className="topcat_banner"
                          />
                          {/* </Link> */}
                        </>
                      </div>
                    ))}
                </>
              ) : (
                <>
                  <div className="col-lg-6">
                    {/* <Link
                      href={`/product-category/juicer?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                    > */}
                    <Image
                      src="/assets/images/jucierBanner.png"
                      alt="banner of Topcategory"
                      width={600}
                      height={350}
                      className="hometopcat_banner"
                    />
                    {/* </Link> */}
                  </div>
                  <div className="col-lg-6">
                    {/* <Link
                      href={`/product-category/moisturizers?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}
                    > */}
                    <Image
                      src="/assets/images/moisturizerBanner.png"
                      alt="banner of Topcategory"
                      width={600}
                      height={350}
                      className="hometopcat_banner"
                    />
                    {/* </Link> */}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="row justify-content-center">
              {[...Array(2)].map(() => (
                <>
                  <div className="col-lg-6 col-12">
                    <BannerLoaderComponent />
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TernaryThemeHomeTopCategories;
