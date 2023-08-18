import React, { useState } from "react";
import Link from "next/link";
import IndianNumber from "../components/CheckoutPageComponent/IndianNumber";
import AddToCartApi from "../services/api/cart-page-api/add-to-cart-api";
import { useDispatch, useSelector } from "react-redux";
import {
  cart_listing_state,
  fetchCartListing,
} from "../store/slices/cart-listing-page-slice/cart-listing-slice";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";
import { fetchOrderSummary } from "../store/slices/checkoutPage-slice/order-summary";
import { product_listing_selector_state } from "../store/slices/product-listing-page-slices/product-listing-slice";
import { currency_selector_state } from "../store/slices/general_slices/multi-currency-slice";
import { get_access_token } from "../store/slices/auth/token-login-slice";

const CartCard = ({
  orders,
  index,
  cartListingItems,
  HandleDeleteCart,
  selectedMultiLangData,
}: any) => {
  const dispatch = useDispatch();
  const cart_listing_data_store:any = useSelector(cart_listing_state);
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const product_listing_state_from_redux: any = useSelector(
    product_listing_selector_state
  );
  const TokenFromStore: any = useSelector(get_access_token);

  const [cartQty, setCartQty] = useState<any>(orders.qty);

  const handleInputChange = (e: any) => {
    console.log("cart input", e.target.value, index, cartQty);
    // const numericValue = e.target.value.replace(/\D/g, "");
    setCartQty(e.target.value);
  };

  const handleQuantityDecrement = async (item_code: any) => {
    setCartQty(cartQty - 1);
    const addCartData:any = [];
    addCartData.push({
      item_code: item_code,
      quantity: cartQty - 1,
    });
    let AddToCartRes: any = await AddToCartApi(
      addCartData,
      currency_state_from_redux?.selected_currency_value,
      TokenFromStore?.token
    );
    HandleUpdatedCartResponse(AddToCartRes);
  };

  const handleQuantityIncrement = async (item_code: any) => {
    setCartQty(cartQty + 1);
    const addCartData:any = [];
    addCartData.push({
      item_code: item_code,
      quantity: cartQty + 1,
    });
    let AddToCartRes: any = await AddToCartApi(
      addCartData,
      currency_state_from_redux?.selected_currency_value,
      TokenFromStore?.token
    );
    HandleUpdatedCartResponse(AddToCartRes);
  };

  const HandleUpdatedCartResponse = (cartRes: any) => {
    if (cartRes.msg === "success") {
      dispatch(fetchCartListing(TokenFromStore?.token));
      if (Object.keys(cart_listing_data_store?.data).length > 0) {
        const order_summary_params = {
          quotationId: cart_listing_data_store?.data?.name,
          token: TokenFromStore?.token,
        };
        dispatch(fetchOrderSummary(order_summary_params));
      }else{
        dispatch(failmsg(cartRes?.error));
        setTimeout(() => {
          dispatch(hideToast());
        }, 1200);
      }
    }
  };

  return (
    <>
      {/* table start */}

      <td className="product-name">
        <Link
          href={`${orders.product_url}?currency=${currency_state_from_redux?.selected_currency_value}`}
          legacyBehavior
        >
          <a className="prod_name">{orders.item_name}</a>
        </Link>
        <br />
        <b>{orders.item_code}</b>
      </td>
      <td className="product-price">
        {orders?.details.length > 0 && orders?.details !== null && (
          <p className="text-start my-0">
            {orders.currency_symbol}
            <span className="amount">
            {orders.amount}
            </span>
          </p>
        )}
      </td>
      <td className="product-quantity" >
        <div className="input-group">
          <span
            className="fs-2 ml-lg-2 arrow_pointer mr-1"
            onClick={() => handleQuantityDecrement(orders.item_code)}
          >
            <i className="fa fa-minus fs-4"></i>
          </span>
          <input
            type="text"
            className="text-center qty-field"
            value={orders.qty}
            // onChange={(e: any) => {
            //   handleInputChange(e);
            // }}
          />
          <span
            className="fs-2 arrow_pointer ml-1"
            onClick={() => handleQuantityIncrement(orders.item_code)}
          >
            <i className="fa fa-plus fs-4"></i>
          </span>
          {/* <Link href="" legacyBehavior>
            <a
              className="text-primary ml-3"
              onClick={() => UpdateCart(orders.item_code)}
            >
              {selectedMultiLangData?.update}
            </a>
          </Link> */}
        </div>
      </td>
      <td className="product-subtotal" >
        <span className="amount">{orders.currency_symbol} {orders.amount}</span>
      </td>
      {/* For mobile responsive */}
      <div className="d-lg-none d-block">
        <div className="row">
          <div className="col-6 fs-4">
            {selectedMultiLangData?.item_with_desc}
          </div>
          :
          <div className="col-5">
            <Link href={`${orders.product_url}`} legacyBehavior>
              <a className="prod_name">{orders.item_name}</a>
            </Link>
            <b>{orders.item_code}</b>
            <p className="my-0">
              <button
                className="astext"
                onClick={() =>
                  HandleDeleteCart(orders.item_code, cartListingItems.name)
                }
              >
                <Link href="" className="text-primary" legacyBehavior>
                  <a>{selectedMultiLangData?.delete}</a>
                </Link>
              </button>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 fs-4"> {selectedMultiLangData?.price}</div>:
          <div className="col-5 text-start">
            {orders?.details.length > 0 && orders?.details !== null && (
              <p className="text-start my-0">
                {" "}
                <i className="fa fa-inr" aria-hidden="true"></i>{" "}
                <span className="text-center">
                {orders.amount}
                </span>
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">
            {selectedMultiLangData?.unit_weight}{" "}
          </div>
          :<div className="col-5 text-start">{orders.weight_per_unit}</div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">
            {selectedMultiLangData?.total_weight}{" "}
          </div>
          :<div className="col-5 text-start">{orders.total_weight}</div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">{selectedMultiLangData?.tax} </div>:
          <div className="col-5 text-start">₹ {orders.tax}</div>
        </div>
        <div className="row my-5">
          <div className="col-6 fs-4">{selectedMultiLangData?.quantity_c} </div>
          :
          <div className="col-5 ">
            <span
              className="fs-2 arrow_pointer"
              onClick={() => handleQuantityDecrement(orders.item_code)}
            >
              <i className="fa fa-plus fs-4"></i>
            </span>
            <input
              type="text"
              className="w-50 text-start"
              value={orders.qty}
              // onChange={(e: any) => {
              //   handleInputChange(e, index);
              // }}
            />
            <span
              className="fs-2 arrow_pointer"
              onClick={() => handleQuantityIncrement(orders.item_code)}
            >
              <i className="fa fa-plus fs-4"></i>
            </span>
            <br />
            {/* <Link href="" legacyBehavior>
              <a
                className="text-primary"
                onClick={() => UpdateCart(orders.item_code)}
              >
                {selectedMultiLangData?.update}{" "}
              </a>
            </Link> */}
          </div>
        </div>
        <div className="row" >
          <div className="col-6 fs-4" >{selectedMultiLangData?.total}</div>:
          <div className="col-5 ">{orders.currency_symbol} {orders.amount}</div>
        </div>
        <h5 className="mb-0 sub-total-h5">
          {selectedMultiLangData?.sub_total}({cartListingItems?.total_qty}{" "}
          {selectedMultiLangData?.quantity_c}):{" "}
          <span>
            {orders?.currency_symbol}{" "}
            {cartListingItems?.grand_total_excluding_tax}
          </span>
        </h5>
      </div>
    </>
  );
};

export default CartCard;
