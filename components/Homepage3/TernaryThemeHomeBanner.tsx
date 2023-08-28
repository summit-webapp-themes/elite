import Image from "next/image";
import React from "react";
import { CONSTANTS } from "../../services/config/app-config";
import useHomeBanner from "../../hooks/HomePageHooks/HomeBannerHook";
import BannerLoaderComponent from "../LoadingLayout/BannerLoaderComponent";
import { useState, useEffect, useRef } from "react";

const TernaryThemeHomeBanner = () => {
  const { homeBannerData, isLoading } = useHomeBanner();
  const [bannerUrl1, setBannerUrl1] = useState(" ");
  const [bannerUrl2, setBannerUrl2] = useState(" ");
  const [bannerUrl3, setBannerUrl3] = useState(" ");

  useEffect(() => {
    if (
      homeBannerData &&
      homeBannerData.length > 0 &&
      homeBannerData[0]?.btn_info
    ) {

      setBannerUrl1(homeBannerData[0]?.btn_info[0]?.btn_url);
      setBannerUrl2(homeBannerData[1]?.btn_info[0]?.btn_url);
      setBannerUrl3(homeBannerData[2]?.btn_info[0]?.btn_url);

    } else {
      console.log("Either homeBannerData or btn_info is null or empty.");
    }
  }, [homeBannerData])

  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };

  console.log("homebannerData", homeBannerData)


  // {console.log("bannerUrl", homeBannerData[0]?.btn_info[0]?.btn_url)}

  return (
    <>
      <div className="intro-section mb-2" >
        {isLoading === "pending" ? (
          <div className="row justify-content-center">
            {[...Array(1)].map(() => (
              <>
                <div className="col-lg-12 col-12">
                  <BannerLoaderComponent />
                </div>
              </>
            ))}
          </div>
        ) : (
          <div className="row banner_wrapper_mob banner_wrapper_web">
            <div className="intro-slide-wrapper col-lg-8 banner_first_mob banner_first" >
              <div className="swiper-container swiper-theme animation-slider pg-inner pg-xxl-hide pg-show pg-white nav-xxl-show nav-hide">
                <div className="swiper-wrapper gutter-no row cols-1 " >
                  <div className="banner banner-fixed intro-banner col-lg-12 col-sm-6 br-sm mb-4 d-flex justify-content-around banner_1">
                    <figure>
                      {homeBannerData?.length > 0 && (
                        <Image
                          loader={myLoader}
                          className="d-block w-100 banner_1"
                          src={homeBannerData[0]?.img}
                          alt="Banner Images"
                          priority
                          width={1200}
                          height={600}
                        />
                      )}
                    </figure>
                    <div className="banner-content  ternaryTheme-bannerContent">
                      <a
                        href={bannerUrl1}
                        className="btn btn-dark btn-link  btn-icon-right ternaryTheme-btn"

                      >
                        Shop Now<i className="w-icon-long-arrow-right"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="intro-banner-wrapper col-lg-4 ">
              <div className="banner banner-fixed intro-banner col-lg-12 col-sm-6 br-sm mb-1 d-flex justify-content-around" >
                <figure>
                  {homeBannerData?.length > 0 && (
                    <Image
                      loader={myLoader}
                      className="d-block w-100"
                      src={homeBannerData[1]?.img}
                      alt="Banner Images"
                      priority
                      width={800}
                      height={600}
                    />
                  )}
                </figure>
                <div className="banner-content ternaryTheme-bannerContent">
                  <a
                    href={bannerUrl2}
                    className="btn btn-dark btn-link ternaryTheme-btn btn-icon-right"
                  >
                    Shop Now<i className="w-icon-long-arrow-right"></i>
                  </a>
                </div>
              </div>

              <div className="banner banner-fixed intro-banner col-lg-12 col-sm-6 intro-banner2 mb-2 br-sm d-flex justify-content-around" >
                <figure>
                  {homeBannerData?.length > 0 && (
                    <Image
                      loader={myLoader}
                      className="d-block w-100"
                      src={homeBannerData[2]?.img}
                      alt="Banner Images"
                      priority
                      width={800}
                      height={600}
                    />
                  )}
                </figure>
                <div className="banner-content ternaryTheme-bannerContent">
                  <a
                    href={bannerUrl3}
                    className="btn btn-white btn-link ternaryTheme-btn btn-icon-right"
                  >
                    Shop Now<i className="w-icon-long-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TernaryThemeHomeBanner;
