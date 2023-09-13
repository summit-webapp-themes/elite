import React, { useEffect, useState } from "react";
import UseCartPageHook from "../hooks/CartPageHooks/cart-page-hook";
import IndianNumber from "./CheckoutPageComponent/IndianNumber";
import { useRouter } from "next/router";
import Image from "next/image";
import { CONSTANTS } from "../services/config/app-config";
import CartCard from "../cards/CartCard";
import MissingPartsModal from "./ProductListingComponents/MissingPartsModal";
import { useDispatch, useSelector } from "react-redux";
import ClearCartApi from "../services/api/cart-page-api/clear-cart-api";
import {
  cart_listing_state,
  fetchCartListing,
} from "../store/slices/cart-listing-page-slice/cart-listing-slice";
import { Norecord } from "./NoRecord";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";
import { currency_selector_state } from "../store/slices/general_slices/multi-currency-slice";
import DeleteProductFromCart from "../services/api/cart-page-api/delete-cart-product";
import { fetchOrderSummary } from "../store/slices/checkoutPage-slice/order-summary";
import ListViewLoadingLayout from "./ProductListingComponents/products-data-view/ListViewLoadingLayout";
import { get_access_token } from "../store/slices/auth/token-login-slice";
import { SelectedFilterLangDataFromStore } from "../store/slices/general_slices/selected-multilanguage-slice";

const CartListing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartListingItems, orderSummaryForCart, Loadings } = UseCartPageHook();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const TokenFromStore: any = useSelector(get_access_token);

  const cart_listing_data_store:any = useSelector(cart_listing_state);
  const SelectedLangDataFromStore:any = useSelector(
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

  // console.log(cartListingItems, "cartListingItems");
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  const [show, setShow] = useState<any>(false);

  const handlemodalOpen = () => {
    setShow(true);
  };
  const handlemodalclose = () => {
    setShow(false);
  };

  const goToHomeCheckout = () => {
    router.push("/");
  };

  const goToCheckout = () => {
    router.push("/checkout");
  };

  const ClearCartHandle = async (quotation_id: any) => {
    let ClearCartRes: any = await ClearCartApi(
      quotation_id,
      TokenFromStore?.token
    );
    if (ClearCartRes?.status === 200) {
      dispatch(fetchCartListing(TokenFromStore?.token));
    }
  };

  const HandleDeleteCart = async (item_code: any, quotationId: any) => {
    let DeleteProduct:any = await DeleteProductFromCart(
      item_code,
      quotationId,
      TokenFromStore?.token
    );
    if (DeleteProduct?.data?.message?.msg === "success") {
      dispatch(fetchCartListing(TokenFromStore?.token));
      if (Object.keys(cart_listing_data_store?.data).length > 0) {
        const params = {
          quotationId: cart_listing_data_store?.data?.name,
          token: TokenFromStore?.token,
        };
        dispatch(fetchOrderSummary(params));
      }
      dispatch(successmsg("Item delete from cart"));
      setTimeout(() => {
        dispatch(hideToast());
      }, 1200);
    } else {
      dispatch(failmsg("Failed to delete from cart"));
      setTimeout(() => {
        dispatch(hideToast());
      }, 1500);
    }
  };

  const handleRenderingOfCartImages = (item: any) => {
    if (item?.image_url === null || item?.image_url?.length === 0) {
      return (
        <Image
          src={`${item?.brand_img}`}
          className="product_item_img img-fluid"
          alt="product images"
          width={100}
          height={100}
          loader={myLoader}
        />
      );
    } else {
      return (
        <Image
          loader={myLoader}
          src={`${item?.image_url}`}
          className="product_item_img img-fluid addcart_item "
          alt="product images"
          width={100}
          height={100}
        />
      );
    }
  };

  return (
    <div className="container" >
      {Loadings === "pending" ? (
        <div className="row justify-content-center">
          {[...Array(10)].map(() => (
            <>
              <div className="col-lg-9 mx-auto">
                <ListViewLoadingLayout />
              </div>
            </>
          ))}
        </div>
      ) : (
        <>
          {Object.keys(cartListingItems).length > 0 ? (
            <div className="container py-5 pt-0 mt-0"  >
              <div className="cart_heading">
                <h3 className="text-captilize my-0 products-name">
                  {selectedMultiLangData?.shopping_cart}
                </h3>
              </div>

              <div className="row mb-1" >
                <div className="col-md-6"  >
                  {/* <h5>Customer name: {cartListingItems?.party_name} </h5> */}
                </div>
                <div className="col-md-6 text-end" >
                  <h5 className="mb-0 sub-total-h5">
                    {selectedMultiLangData?.sub_total} (
                    {cartListingItems?.total_qty}{" "}
                    {selectedMultiLangData?.quantity_c}):{" "}
                    <span className="product-price">
                      {
                        cartListingItems?.categories[0]?.orders[0]
                          ?.currency_symbol
                      }{" "}
                      {cartListingItems?.grand_total_excluding_tax}
                    </span>
                  </h5>
                </div>
              </div>
              <div className="ps-3 row cart_wrapper mt-0 pt-0 "  >
                <hr />
                <div className="page-content page-content-margin" >
                  <div className="container px-0">
                    <div className="row gutter-lg mb-10 mt-0 pt-0">
                      <div className="col-lg-9 mb-6 border mx-0 px-4 padding-left-content" >
                        {cartListingItems?.categories?.length > 0 &&
                          cartListingItems?.categories !== null &&
                          cartListingItems?.categories.map(
                            (category: any, index: any) => (
                              <div className="" >
                                <h3 className="mt-3 text-decoration-underline" >
                                  {category.category}
                                </h3>
                                <table
                                  className="shop-table cart-table "
                                  key={index}
                                >
                                  <thead className="table-heading px-0 mx-0" >
                                    <tr>
                                      <th className="product-name">
                                        <span >
                                          {/* {selectedMultiLangData?.item} */}
                                        </span>
                                      </th>
                                      <th>
                                        <span>
                                          {
                                            selectedMultiLangData?.item_with_desc
                                          }
                                        </span>
                                      </th>
                                      <th className="product-price text-capital ">
                                        <span >
                                          {selectedMultiLangData?.price}
                                        </span>
                                      </th>
                                      <th className="product-quantity product-quantity-margin " >
                                        <span>
                                          {selectedMultiLangData?.quantity_c}
                                        </span>
                                      </th>
                                      <th className="product-subtotal">
                                        <span>
                                          {selectedMultiLangData?.total}
                                        </span>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody className="" >
                                    {category?.orders?.length > 0 &&
                                      category?.orders !== null &&
                                      category?.orders.map(
                                        (orders: any, i: any) => (
                                          <tr key={i} className=" " >
                                            <td className="product-thumbnail" >
                                              <div className="p-relative product_item_img_mob"  >
                                                {handleRenderingOfCartImages(
                                                  orders
                                                )}
                                                <button
                                                  type="submit"
                                                  className="btn btn-close" 
                                                  onClick={() =>
                                                    HandleDeleteCart(
                                                      orders.item_code,
                                                      cartListingItems.name 
                                                    )
                                                  }
                                                >
                                                  X
                                                </button>
                                              </div>
                                            </td>
                                            <CartCard
                                              orders={orders}
                                              index={i}
                                              cartListingItems={
                                                cartListingItems
                                              }
                                              HandleDeleteCart={
                                                HandleDeleteCart
                                              }
                                              selectedMultiLangData={
                                                selectedMultiLangData
                                              }
                                            />
                                          </tr>
                                        )
                                      )}
                                  </tbody>
                                </table>
                              </div>
                            )
                          )}
                      </div>

                      <div className=" col-lg-3 sticky-sidebar-wrapper d-flex justify-content-end justify-content-sm-start " >
                        <div className="sticky-sidebar cart-total-mobs">
                          <div className="cart-summary mb-4">
                            <h3 className="cart-title">
                              {selectedMultiLangData?.cart_total}
                            </h3>

                            <hr className="divider" />
                            <div className="order-total d-flex justify-content-between align-items-center mt-2" >
                              <label>{selectedMultiLangData?.sub_total}</label>
                              <span className="ls-50 product-price products-price">
                                {
                                  cartListingItems?.categories[0]?.orders[0]
                                    ?.currency_symbol
                                }
                                {orderSummaryForCart[0]?.value}
                              </span>
                            </div>
                            <div className="order-total d-flex justify-content-between align-items-center mt-2">
                              <label>{selectedMultiLangData?.tax}</label>
                              <span className="ls-50 product-price products-price">
                                {
                                  cartListingItems?.categories[0]?.orders[0]
                                    ?.currency_symbol
                                }
                                <IndianNumber
                                  value={orderSummaryForCart[1]?.value}
                                />
                              </span>
                            </div>
                            <div className="order-total d-flex justify-content-between align-items-center mt-2">
                              <label>
                                {
                                  selectedMultiLangData?.order_total_including_tax
                                }
                              </label>
                              <span className="ls-50 product-price products-price ms-3">
                                {
                                  cartListingItems?.categories[0]?.orders[0]
                                    ?.currency_symbol
                                }
                                <IndianNumber
                                  value={orderSummaryForCart[10]?.value}
                                />
                              </span>
                            </div>
                            <button
                              onClick={goToCheckout}
                              className="btn btn-block ternaryTheme-CheckOutbtn btn-icon-right btn-rounded W-75 btn-checkout mt-5"
                            >
                              {selectedMultiLangData?.proceed_to_checkout}
                              <i className="w-icon-long-arrow-right"></i>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="row cart-action ms-0 ps-0" >
                       
                       <div className="col-md-12 ">
                       <button
                          onClick={goToHomeCheckout}
                          className="btn btn-dark btn-rounded btn-icon-left btn-shopping  ms-0  ternaryTheme-CheckOutbtn CheckOutbtn_mob"
                        >
                          <i className="w-icon-long-arrow-left"></i>
                          {selectedMultiLangData?.continue_shopping}
                        </button>
                     
                      
                        <button
                          type="submit"
                          className="btn btn-rounded btn-default btn-clear btn-cart-mob btn-clear-cart-left ternaryTheme-Clearbtn CheckOutbtn_mob"
                          name="clear_cart"
                          value="Clear Cart"
                          onClick={() => ClearCartHandle(cartListingItems.name)}
                        >
                          {selectedMultiLangData?.clear_cart}
                        </button>
                       </div>
                     
                      
                      </div>
                    
                    </div>
                  </div>
                </div>
                <hr />
                <div className="col-12"   >
                  <div className="row justify-content-end">
                    <h5>{selectedMultiLangData?.note}:-</h5>
                    <p className="mb-0">{selectedMultiLangData?.note_1}</p>
                    <p>
                      {selectedMultiLangData?.note_2}
                      <button
                        onClick={handlemodalOpen}
                        className="missing_parts_btn ps-0"
                      >
                        {selectedMultiLangData?.let_us_now}
                      </button>
                      {selectedMultiLangData?.to_mail_us}
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          ) : (
            <Norecord
              heading={selectedMultiLangData?.cart_is_empty}
              content={selectedMultiLangData?.cart_is_empty_s}
              selectLangData={selectedMultiLangData} 
            />
          )}
        </>
      )}

      <MissingPartsModal
        show={show}
        handlemodalclose={handlemodalclose}
        setShow={setShow}
      />
    </div>
  );
};

export default CartListing;
