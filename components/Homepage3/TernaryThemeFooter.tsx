import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import getSubscriber from "../../services/api/general_apis/newsletter-subscription-api";
import { useDispatch, useSelector } from "react-redux";
import {
  hideToast,
  successmsg,
} from "../../store/slices/general_slices/toast_notification_slice";
import { get_access_token } from "../../store/slices/auth/token-login-slice";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import logoImg from "../../public/assets/images/elite.png"
const TernaryThemeFooter = () => {
  const dispatch = useDispatch();
  const TokenFromStore: any = useSelector(get_access_token);
  const SelectedLangDataFromStore:any = useSelector(
    SelectedFilterLangDataFromStore
  );
  const [selectLangData, setLangData] = useState<any>();

  useEffect(() => {
    if (
      Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
    ) {
      setLangData(SelectedLangDataFromStore?.selectedLanguageData);
    }
  }, [SelectedLangDataFromStore?.selectedLanguageData]);
  const navbarData: any = [];
  const [subScription, setSubscriptions] = useState();
  const handleSubscription = async (event: any) => {
    event?.preventDefault();
    console.log(subScription, "subScription");
    let subScriptionRes = await getSubscriber(
      subScription,
      TokenFromStore?.token
    );
    console.log("subScriptionRes", subScriptionRes);
    if (subScriptionRes?.data?.message?.msg === "success") {
      dispatch(successmsg("subscribed successfully"));

      setTimeout(() => {
        dispatch(hideToast());
      }, 1200);
    }
  };
  return (
    <>
      <footer className="footer footer-dark footer-section ternaryfooter">
        <div className="container ">
          <div className="footer-top">
            <div className="row mt-1">
              <div className="col-lg-5 col-sm-6">
                <div className="widget widget-about mt-0">
                  <div className="widget-body">
                    <div className="footer-newsletter p-0">
                      <div className="row justify-content-center align-items-center ">
                        <div className="col-xl-12 col-lg-12">
                          <Link href="" legacyBehavior>
                            <Image
                              // src="/assets/images/summit-logo-ree.png"
                              src={logoImg}
                              alt="logo-footer"
                              width={132}
                              height={83}
                              className="footer-ternarytheme-logo"
                            />
                          </Link>
                          <div className="icon-box icon-box-side text-dark mt-5">
                            <div className="icon-box-content">
                              <h5 className="icon-box-title text-uppercase font-weight-bold text-white text-left pl-1">
                                {selectLangData?.subscribe_to_our_newsletter}
                              </h5>
                              <p className="text-light">
                                {
                                  selectLangData?.get_all_the_latest_information_on_events_sales_offers
                                }
                              </p>
                              <form
                                method="get"
                                className="input-wrapper input-wrapper-inline input-wrapper-rounded mt-2"
                              >
                                <input
                                  type="email"
                                  className="form-control mr-2 bg-white text-default"
                                  name="email"
                                  id="email"
                                  onChange={(e: any) =>
                                    setSubscriptions(e?.target?.value)
                                  }
                                  placeholder="Your E-mail Address"
                                  required
                                />
                                <button
                                  className="btn btn-primary btn-rounded btn-left footer-button  ternaryTheme-btn"
                                  type="submit"
                                  onClick={handleSubscription}
                                >
                                  {selectLangData?.subscribe}
                                  <i className="w-icon-long-arrow-right"></i>
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="widget">
                  <h3 className="widget-title ternaryTheme-footerTitle">
                    {selectLangData?.company}
                  </h3>
                  <ul className="widget-body">
                    <li>
                      <Link href="#" legacyBehavior>
                        <a> {selectLangData?.about_us}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.contact_us}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.order_history}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* <label className="label-social d-block text-light">
                  Social Media
                </label>
                <div className="social-icons social-icons-colored pb-2 pt-2">
                  <Link href="#" legacyBehavior>
                    <a className="social-icon social-facebook w-icon-facebook"></a>
                  </Link>
                  <Link href="#" legacyBehavior>
                    <a className="social-icon social-twitter w-icon-twitter"></a>
                  </Link>
                  <Link href="#" legacyBehavior>
                    <a className="social-icon social-instagram w-icon-instagram"></a>
                  </Link>
                  <Link href="#" legacyBehavior>
                    <a className="social-icon social-youtube w-icon-youtube"></a>
                  </Link>
                </div> */}
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="widget">
                  <h4 className="widget-title ternaryTheme-footerTitle">
                    {selectLangData?.my_account}
                  </h4>
                  <ul className="widget-body">
                    <li>
                      <Link href="/cart" legacyBehavior>
                        <a>{selectLangData?.view_cart}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/login" legacyBehavior>
                        <a>{selectLangData?.sign_in}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.privacy_policy}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-2 col-sm-6">
                <div className="widget">
                  <h4 className="widget-title ternaryTheme-footerTitle">
                    {selectLangData?.customer_service}
                  </h4>
                  <ul className="widget-body">
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.payment_methods}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.product_returns}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="#" legacyBehavior>
                        <a>{selectLangData?.terms_and_conditions}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="widget widget-category">
              {navbarData?.length > 0 && navbarData !== null && (
                <>
                  {navbarData.map((items: any, i: any) =>
                    items.values.map((items_name: any) => (
                      <div className="category-box" key={i}>
                        <h6 className="category-name">{items_name.name}:</h6>
                        {items_name.values.map((names: any, index: any) => (
                          <Link href={names.url} legacyBehavior>
                            <a key={index}>{names.name}</a>
                          </Link>
                        ))}
                      </div>
                    ))
                  )}
                </>
              )}
            </div>
          </div>
          <div className="footer-bottom justify-content-center">
            <div className="text-center">
              <p className="copyright">{selectLangData?.copyright_text}</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default TernaryThemeFooter;
