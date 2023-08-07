import React, { useState } from "react";
import UseCartPageHook from "../hooks/CartPageHooks/cart-page-hook";
import Link from "next/link";
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
import UseCheckoutPageHook from "../hooks/CheckoutHooks/checkout-page-hook";
import getQuotationCart from "../services/api/cart-page-api/get-quotation-api";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";
import { currency_selector_state } from "../store/slices/general_slices/multi-currency-slice";
import { Button } from "bootstrap";
import DeleteProductFromCart from "../services/api/cart-page-api/delete-cart-product";
import { fetchOrderSummary } from "../store/slices/checkoutPage-slice/order-summary";
import ListViewLoadingLayout from "./ProductListingComponents/products-data-view/ListViewLoadingLayout";

const CartListing = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartListingItems, orderSummaryForCart, Loadings } = UseCartPageHook();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const cart_listing_data_store = useSelector(cart_listing_state);
  // const { orderSummary } = UseCheckoutPageHook();
  // const orderSummary:any = []
console.log(cartListingItems,"cartListingItems")
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
    let ClearCartRes: any = await ClearCartApi(quotation_id);
    if (ClearCartRes?.status === 200) {
      dispatch(fetchCartListing());
    }
  };

  const HandleDeleteCart = async (item_code: any) => {
    let DeleteProduct = await DeleteProductFromCart(item_code);
    if (DeleteProduct?.data?.message?.msg === "success") {
      dispatch(fetchCartListing());
      if (Object.keys(cart_listing_data_store?.data).length > 0) {
        dispatch(fetchOrderSummary(cart_listing_data_store?.data?.name));
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
          className="product_item_img img-fluid addcart_item"
          alt="product images"
          width={100}
          height={100}
        />
      );
    }
  };

  return (
    <>
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
        <div className="container py-5">
          <div className="cart_heading mb-3">
            <h3 className="text-uppercase">Shopping cart</h3>
          </div>

          <div className="row">
            <div className="col-md-6">
              {/* <h5>Customer name: {cartListingItems?.party_name} </h5> */}
            </div>
            <div className="col-md-6 text-end">
              <h5 className="mb-0 sub-total-h5">
                Sub total ({cartListingItems?.total_qty} Qty):{" "}
                <span>
                  {cartListingItems?.categories[0]?.orders[0]?.currency_symbol}{" "}
                  {cartListingItems?.grand_total_excluding_tax}
                </span>
              </h5>
            </div>
          </div>
          <div className="row cart_wrapper">
            <hr />
            <div className="page-content">
              <div className="container px-0">
                <div className="row gutter-lg mb-10 mt-5">
                  <div className="col-lg-9 mb-6 border">
                    {cartListingItems?.categories?.length > 0 &&
                      cartListingItems?.categories !== null &&
                      cartListingItems?.categories.map(
                        (category: any, index: any) => (
                          <>
                            <h3 className="mt-5 text-decoration-underline">
                              {category.category}
                            </h3>
                            <table
                              className="shop-table cart-table"
                              key={index}
                            >
                              <thead className="table-heading">
                                <tr>
                                  <th className="product-name">
                                    <span>Item</span>
                                  </th>
                                  <th>
                                    <span>Item With Description</span>
                                  </th>
                                  <th className="product-price">
                                    <span>Price</span>
                                  </th>
                                  <th className="product-quantity">
                                    <span>Qty</span>
                                  </th>
                                  <th className="product-subtotal">
                                    <span>Total</span>
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {category?.orders?.length > 0 &&
                                  category?.orders !== null &&
                                  category?.orders.map(
                                    (orders: any, i: any) => (
                                      <tr key={i}>
                                        <td className="product-thumbnail">
                                          <div className="p-relative">
                                            {handleRenderingOfCartImages(
                                              orders
                                            )}
                                            <button
                                              type="submit"
                                              className="btn btn-close"
                                              onClick={()=>HandleDeleteCart(orders.item_code)}
                                            >
                                          X
                                            </button>
                                          </div>
                                        </td>
                                        <CartCard
                                          orders={orders}
                                          index={i}
                                          cartListingItem={cartListingItems}
                                          HandleDeleteCart={HandleDeleteCart}
                                        />
                                      </tr>
                                    )
                                  )}
                              </tbody>
                            </table>
                          </>
                        )
                      )}
                  </div>

                  <div className="col-lg-3 sticky-sidebar-wrapper">
                    <div className="sticky-sidebar">
                      <div className="cart-summary mb-4">
                        <h3 className="cart-title">
                          Cart Total
                        </h3>

                        <hr className="divider" />
                        <div className="order-total d-flex justify-content-between align-items-center mt-2">
                          <label>SubTotal</label>
                          <span className="ls-50">
                            {" "}
                            {
                              cartListingItems?.categories[0]?.orders[0]
                                ?.currency_symbol
                            }
                            {orderSummaryForCart[0]?.value}
                          </span>
                        </div>
                        <div className="order-total d-flex justify-content-between align-items-center mt-2">
                          <label>Tax</label>
                          <span className="ls-50">
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
                          <label>Order Total Including Tax</label>
                          <span className="ls-50">
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
                          Proceed to checkout
                          <i className="w-icon-long-arrow-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="cart-action mb-6">
                    <button
                      onClick={goToHomeCheckout}
                      className="btn btn-dark btn-rounded btn-icon-left btn-shopping mr-auto w-25 ternaryTheme-CheckOutbtn"
                    >
                      <i className="w-icon-long-arrow-left"></i>Continue
                      Shopping
                    </button>
                    <button
                      type="submit"
                      className="btn btn-rounded btn-default btn-clear w-25 ml-4 ternaryTheme-Clearbtn"
                      name="clear_cart"
                      value="Clear Cart"
                      onClick={() => ClearCartHandle(cartListingItems.name)}
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="col-12">
              <div className="row justify-content-end">
                <h5>Note:-</h5>
                <p className="mb-0">
                  1. For item marked as POR (price on request),you can checkout
                  and place order.we shall provide you our price offline and
                  process your order after you provide confirmation.
                </p>
                <p>
                  2. If you could not find the item you were looking for{" "}
                  <button
                    onClick={handlemodalOpen}
                    className="missing_parts_btn ps-0"
                  >
                   Let us know
                  </button>
                  to mail us and we will quote to you offline.
                </p>
              </div>
            </div>
          </div>
          <hr />
        </div>
      ) : (
        <Norecord
          heading="Your cart is empty!!"
          content="Items added to your cart will show up here"
        />
      )}
        </>
      )}

      <MissingPartsModal
        show={show}
        handlemodalclose={handlemodalclose}
        setShow={setShow}
      />
    </>
  );
};

export default CartListing;
