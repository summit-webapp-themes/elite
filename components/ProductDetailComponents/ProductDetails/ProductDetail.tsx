import React, { useEffect, useState } from "react";
import IndianNumber from "../../CheckoutPageComponent/IndianNumber";
import StarRating from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import * as ga from "../../../lib/ga";
import { useRouter } from "next/router";
import AddToCartPostApi from "../../../services/api/cart-page-api/add-to-cart-api";
import AddToCartApi from "../../../services/api/cart-page-api/add-to-cart-api";
import VariantsMaster from "../ProductVariants/VariantsMaster";
import { fetchCartListing } from "../../../store/slices/cart-listing-page-slice/cart-listing-slice";
import styles from "../../../styles/Product_Detail.module.css";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../../../store/slices/general_slices/toast_notification_slice";
import Link from "next/link";
import useMultiLingual from "../../../hooks/LanguageHook/multilingual-hook";
import DealerAddToCartApi from "../../../services/api/cart-page-api/dealer-add-to-cart-api";
import { CONSTANTS } from "../../../services/config/app-config";
import { currency_selector_state } from "../../../store/slices/general_slices/multi-currency-slice";
import {
  EmailShareButton,
  FacebookShareButton,
  LineShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  WorkplaceShareButton,
} from "react-share";
import {
  get_access_token,
  updateAccessToken,
} from "../../../store/slices/auth/token-login-slice";
import { showToast } from "../../ToastNotificationNew";
import { profileData_state } from "../../../store/slices/general_slices/profile-page-slice";
const ProductDetail = ({
  productDetailData,
  productVariants,
  selectedVariant,
  thumbnailOfVariants,
  handleVariantSelect,
  handleQuantity,
  handleQuantityIncrement,
  handleQuantityDecrement,
  productQuantity,
  minQty,
  stockAvailabilityTextChanges,
  handleStockAvail,
  testBtn,
  doesSelectedVariantDoesNotExists,
  stockDoesNotExistsForSelectedVariants,
  productDetailLoading,
  selectedMultiLangData,
}: any) => {
  const dispatch = useDispatch();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  // console.log(
  //   "productQuantity in detail page",
  //   doesSelectedVariantDoesNotExists
  // );
  const router = useRouter();

  const TokenFromStore: any = useSelector(get_access_token);
  const profileData: any = useSelector(profileData_state);

  const [newobjectState, setnewObjectState] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleVariantsData = (newData: any) => {
    setnewObjectState(newData);
  };

  let isLoggedIn: any;
  let isDealer: any;
  let partyName: any;
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("isLoggedIn");
    isDealer = localStorage.getItem("isDealer");
  }

  const handleAddCart = async () => {
    console.log(
      "add currency",
      currency_state_from_redux?.selected_currency_value
    );

    if (isDealer === "true") {
      console.log("dealer cart", newobjectState);
      let newObjects =
        newobjectState &&
        newobjectState?.filter((newitems: any) => newitems.quantity !== "");
      let dealerApi = await DealerAddToCartApi(newObjects);
      console.log("dealer api res", dealerApi);
      if (dealerApi.msg === "success") {
        // dispatch(successmsg("Item Added to cart"));
        setIsLoading(false);
        showToast("Item Added to cart", "success");
        dispatch(fetchCartListing());
        // setTimeout(() => {
        //   dispatch(hideToast());
        // }, 1200);
      } else {
        showToast("Failed to Add to cart", "error");
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);

        // dispatch(failmsg("Failed to Add to cart"));
        // setTimeout(() => {
        //   dispatch(hideToast());
        // }, 1500);
      }
      // ga.event({
      //   action: "add_to_cart",
      //   params: {
      //     not_set: JSON.stringify(newobjectState),
      //   },
      // });
    } else {
      // console.log(
      //   "add currency in else",
      //   currency_state_from_redux?.selected_currency_value
      // );
      const addCartData = [];
      addCartData.push({
        item_code: productDetailData?.name,
        quantity: productQuantity,
      });

      if (profileData?.partyName !== "") {
        if (Object?.keys(profileData?.partyName)?.length > 0) {
          partyName = profileData?.partyName;
        }
      } else {
        partyName = "Guest";
      }

      let AddToCartProductRes: any = await AddToCartApi(
        addCartData,
        currency_state_from_redux?.selected_currency_value,
        TokenFromStore?.token,
        partyName
      );

      if (AddToCartProductRes.msg === "success") {
        // dispatch(successmsg("Item Added to cart"));

        showToast("Item Added to cart", "success");
        setIsLoading(true);
        setTimeout(() => {
          // Stop the loader after 2 seconds (adjust the time as needed)
          setIsLoading(false);
          // Add your actual functionality here (e.g., adding to the cart)
          // ...
        }, 2000);

        if (AddToCartProductRes?.data?.access_token !== null) {
          dispatch(updateAccessToken(AddToCartProductRes?.data?.access_token));
          localStorage.setItem(
            "guest",
            AddToCartProductRes?.data?.access_token
          );
          console.log("token api res", AddToCartProductRes);
          if (AddToCartProductRes?.data?.access_token !== null) {
            console.log("token from api");
            dispatch(fetchCartListing(AddToCartProductRes?.data?.access_token));
          }
        } else {
          dispatch(fetchCartListing(TokenFromStore?.token));
        }
        setTimeout(() => {
          dispatch(hideToast());
        }, 1200);
      } else {
        setIsLoading(false);
        showToast("Failed to Add to cart", "error");
        // dispatch(failmsg(AddToCartProductRes?.error));
        // setTimeout(() => {
        //   dispatch(hideToast());
        // }, 1500);
      }
    }
  };

  const [fullUrl, setFullUrl] = useState("");
  const shareUrl = fullUrl !== "" ? fullUrl : "http://3.13.55.94:3004/";
  const shareMessage: string = `Check out this product: ${shareUrl}`;
  useEffect(() => {
    if (router.asPath) {
      const currentUrl = window.location.origin + router.asPath;
      setFullUrl(currentUrl);
    }
  }, [router.asPath]);
  // console.log("details@@", fullUrl);
  return (
    <div>
      <div className="product-info">
        <b className="product_name products-name  bold-name">
          {productDetailData?.item_name}
        </b>
        <p className=" text-dark products-name">
          <span className="products-name">
            {" "}
            {productDetailData?.short_description ===
              productDetailData.productDetailData_name ||
            productDetailData?.short_description === ""
              ? ""
              : productDetailData?.short_description}
          </span>
        </p>
        <div className="star-rating-container">
          <StarRating rating={productDetailData?.rating} />
        </div>
        <p className="mt-3 text-dark p-tagfont product_item_name products-name line-height-product">
          {selectedMultiLangData?.item_code}: {productDetailData?.name}
        </p>

        <h3 className="p_price m-0 line-height-product">
          {productDetailData?.price !== 0 ? (
            <span className="productdetail-price products-name bold">
              {productDetailData?.currency_symbol} {productDetailData?.price}
              {/* <IndianNumber value={productDetailData?.price} /> */}
            </span>
          ) : (
            <button className="button_color p-2 rounded-3 fs-4 mb-2 products-name">
              {selectedMultiLangData?.price_on_request}
            </button>
            // <p
            //   className="border text-center"
            //   style={{
            //     width: "150px",
            //     margin: "0",
            //     background: "#f15622",
            //     color: "white",
            //     borderRadius: "5px",
            //   }}
            // >
            //   Price on Request
            // </p>
          )}

          {productDetailData?.mrp_price !== 0 ? (
            <>
              <s className="old-price currency_symbol productdetail-price product-font-family">
                {productDetailData?.currency_symbol}{" "}
                {productDetailData?.mrp_price}
                {/* <IndianNumber value={productDetailData?.mrp_price} /> */}
              </s>
            </>
          ) : (
            ""
          )}
        </h3>

        {productDetailData?.price !== 0 ? (
          <div>
            {productDetailData?.tax_value !== null && (
              <p className="products-name text-dark mt-3 text-uppercase taxx_value font-weight-normal">
                &#43; {selectedMultiLangData?.gst} &#x40;{" "}
                {productDetailData?.tax_value}% {selectedMultiLangData?.extra}
              </p>
            )}

            <p className=" text-dark mt-2 text-uppercase taxx_value products-name ">
              &#43; {selectedMultiLangData?.cost_of_transportation_extra}
            </p>
          </div>
        ) : (
          ""
        )}
        <div className="product-feature products-name">
          <ul className="list-style-none px-0 products-name">
            <li>
              {Object.keys(productDetailData?.features).length > 0 && (
                <>
                  {productDetailData?.features?.values?.length > 0 &&
                    productDetailData?.features?.values !== null &&
                    productDetailData?.features?.values.map(
                      (featureL: any, index: any) => {
                        return (
                          <li key={index} className="d-flex">
                            <span className="feature_list products-name">
                              {" "}
                            </span>
                            <span className="fs-5 py-1 products-name">
                              {featureL.description}
                            </span>
                          </li>
                        );
                      }
                    )}
                </>
              )}
            </li>
          </ul>
        </div>

        {productDetailData?.brand !== null &&
        productDetailData?.brand !== "" ? (
          <p className="mt-2 text-uppercase p-tagfont product_brand_name products-name">
            {selectedMultiLangData?.brand}: {productDetailData?.brand}
            {/* {multilingualData?.brand}: {productDetailData?.brand} */}
          </p>
        ) : (
          ""
        )}
        {productDetailData?.gst_hsn_code !== null &&
        productDetailData?.gst_hsn_code !== "" ? (
          <p className="mt-2 text-uppercase p-tagfont product_brand_name products-name">
            {selectedMultiLangData?.hsn_code}: {productDetailData?.gst_hsn_code}
          </p>
        ) : (
          ""
        )}
        {productDetailData?.oem_part_number !== null &&
        productDetailData?.oem_part_number !== "" ? (
          <p className="mt-2 text-uppercase p-tagfont product_brand_name products-name">
            {selectedMultiLangData?.oem_part_number}:{" "}
            {productDetailData?.oem_part_number}
          </p>
        ) : (
          ""
        )}
        {productDetailData?.weight_per_unit !== 0 ? (
          <p className="mt-2 text-uppercase p-tagfont product_brand_name products-name">
            {selectedMultiLangData?.approx_weight}:{" "}
            {productDetailData?.weight_per_unit} {productDetailData?.weight_uom}
          </p>
        ) : (
          ""
        )}
      </div>

      <div>
        <VariantsMaster
          productVariants={productVariants}
          selectedVariant={selectedVariant}
          thumbnailOfVariants={thumbnailOfVariants}
          handleVariantSelect={handleVariantSelect}
          doesSelectedVariantDoesNotExists={doesSelectedVariantDoesNotExists}
          variantsData={handleVariantsData}
          WhatsappShareButton={WhatsappShareButton}
          stockDoesNotExistsForSelectedVariants={
            stockDoesNotExistsForSelectedVariants
          }
          selectedMultiLangData={selectedMultiLangData}
        />
      </div>

      <table className="mx-auto mb-0 inventory_table table table-sm product_qty_sec products-name">
        <tbody>
          <tr>
            <td className="qty_sec_table_data">
              <div>
                {isDealer === "true" ? null : (
                  <>
                    <div className="d-flex align-items-center">
                      <div className="fs-4 text-muted pe-3 products-name">
                        {" "}
                        {selectedMultiLangData?.quantity}:{" "}
                      </div>
                      <div>
                        <span
                          className="fs-2 ml-lg-2 arrow_pointer products-name"
                          onClick={handleQuantityDecrement}
                        >
                          <i className="fa fa-minus fs-4"></i>
                        </span>

                        <input
                          type="text"
                          value={productQuantity}
                          className={`${
                            productQuantity < minQty ? "disabled" : "enabled"
                          } varient_input mx-2 text-center products-name`}
                          onChange={(e: any) => handleQuantity(e.target.value)}
                        />

                        <span
                          className="fs-2 arrow_pointer products-name"
                          onClick={handleQuantityIncrement}
                        >
                          <i className="fa fa-plus fs-4"></i>
                        </span>
                      </div>
                    </div>
                    <div className="fs-6 mt-1 text-uppercase text-dark bold products-name">
                      {productDetailData.min_order_qty === 0 ? (
                        ""
                      ) : (
                        <p>
                          {" "}
                          {selectedMultiLangData?.minimum_order_qty}:{" "}
                          {productDetailData.min_order_qty}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>

              <div className="row button_sec ">
                {CONSTANTS.SHOW_FUTURE_STOCK_AVAILABILITY_TO_GUEST === true ? (
                  <div className="col-lg-4 text-start products-name btn-wrapper">
                    <div className="mt-5">
                      <button
                        type="button"
                        id=""
                        className={`btn btn-primary cart_btn_gtag button_color products-name`}
                        onClick={() => handleStockAvail(productDetailData.name)}
                      >
                        {selectedMultiLangData?.check_availability_btn_label}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="col-lg-3 ">
                    <div className="mt-5 btn-wrapper">
                      <Link
                        href="/login"
                        className="btn btn-primary button_color cart_btn_gtag "
                      >
                        {selectedMultiLangData?.check_availability_btn_label}
                      </Link>
                    </div>
                  </div>
                )}
                {/* {CONSTANTS.ADD_TO_CART_FOR_GUEST === true ? ( */}
                <div className="col-md-6 btn-wrapper">
                  <div className="mt-5">
                    <div className="row">
                      {/* <button
                        type="button"
                        className={`${
                          productQuantity < minQty ? "disabled" : "enabled"
                        } w-50 btn button_color cart_btn_gtag add_cart_btn_mob products-name`}
                        onClick={handleAddCart}
                        disabled={
                          doesSelectedVariantDoesNotExists ||
                          stockDoesNotExistsForSelectedVariants
                        }
                      >
                        {selectedMultiLangData?.add_to_cart}
                      </button> */}
                      <button
                        type="button"
                        className={`${
                          productQuantity < minQty ? "disabled" : "enabled"
                        } w-50 btn button_color cart_btn_gtag add_cart_btn_mob products-name`}
                        onClick={handleAddCart}
                        // disabled={
                        //   doesSelectedVariantDoesNotExists ||
                        //   stockDoesNotExistsForSelectedVariants
                        // }
                      >
                        {isLoading ? (
                          <span className="cursor-change">
                            Adding...
                            <i className="fa fa-spinner" aria-hidden="true"></i>
                          </span>
                        ) : (
                          selectedMultiLangData?.add_to_cart
                        )}
                      </button>
                    </div>
                    <div className="col-12">
                      <div className="">
                        {productQuantity < minQty ? (
                          <p className="text-danger">
                            {selectedMultiLangData?.minimum_order_qty}:{minQty}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* ) : (
                  <div className="col-md-6 mx-auto">
                    <div className="mt-5">
                      <div className="row">
                        <button
                          className={`${
                            productQuantity < minQty ? "disabled" : "enabled"
                          } w-75 btn btn-primary button_color cart_btn_gtag `}
                          disabled={
                            doesSelectedVariantDoesNotExists ||
                            stockDoesNotExistsForSelectedVariants
                          }
                        >
                          <Link href="/login">
                            <a>{selectedMultiLangData?.add_to_cart}</a>
                          </Link>
                        </button>
                      </div>
                      <div className="col-12">
                        {productQuantity < minQty ? (
                          <p className="text-danger">
                            {selectedMultiLangData?.minimum_order_qty}:{minQty}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                )} */}
              </div>
              <div className="mt-2">
                <p className="text-danger">
                  {productDetailData.in_stock_status === true &&
                    "Product is out of stock"}
                </p>
              </div>
              {/* WhatsApp share button */}
              <div className="mt-5 d-flex align-items-center">
                <i
                  className="fa fa-share me-2"
                  aria-hidden="true"
                  style={{ fontSize: "18px" }}
                ></i>
                <div className="me-2">
                  <WhatsappShareButton url={shareUrl} title={shareMessage}>
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                </div>

                <div className="me-2">
                  <FacebookShareButton url={shareUrl}>
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                </div>

                <div>
                  <TwitterShareButton url={shareUrl}>
                    <TwitterIcon size={32} round={true} />
                  </TwitterShareButton>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetail;
