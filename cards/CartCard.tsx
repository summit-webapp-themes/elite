import React, { useState } from "react";
import Link from "next/link";
import IndianNumber from "../components/CheckoutPageComponent/IndianNumber";
import AddToCartApi from "../services/api/cart-page-api/add-to-cart-api";
import { useDispatch, useSelector } from "react-redux";
import {
  cart_listing_state,
  fetchCartListing,
} from "../store/slices/cart-listing-page-slice/cart-listing-slice";
import DeleteProductFromCart from "../services/api/cart-page-api/delete-cart-product";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";
import { fetchOrderSummary } from "../store/slices/checkoutPage-slice/order-summary";
import { product_listing_selector_state } from "../store/slices/product-listing-page-slices/product-listing-slice";
import { currency_selector_state } from "../store/slices/general_slices/multi-currency-slice";

const CartCard = ({ orders, index, cartListingItems,HandleDeleteCart}: any) => {
  console.log("cart orders card data", orders);
  const dispatch = useDispatch();
  const cart_listing_data_store = useSelector(cart_listing_state);
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const product_listing_state_from_redux: any = useSelector(
    product_listing_selector_state
  );
  const [cartQty, setCartQty] = useState(orders.qty);

  const handleInputChange = (e: any, index: any) => {
    console.log("cart input", e.target.value, index);
    const numericValue = e.target.value.replace(/\D/g, "");
    setCartQty(numericValue);
  };

  const UpdateCart = async (item_code: any) => {
    let AddToCartRes: any = await AddToCartApi(item_code, cartQty);
    console.log(" cart updated", AddToCartRes);
    if (AddToCartRes.msg === "success") {
      dispatch(fetchCartListing());
      if (Object.keys(cart_listing_data_store?.data).length > 0) {
        dispatch(fetchOrderSummary(cart_listing_data_store?.data?.name));
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
        {orders?.details.length > 0 &&
          orders?.details !== null &&
          <p className="text-start my-0">
              <i className="fa fa-inr" aria-hidden="true"></i>
              <span className="amount">
                <IndianNumber value={orders.details[1]?.value} />
              </span>
        </p>
          }
      </td>
      <td className="product-quantity">
        <div className="input-group">
          <input
            type="text"
            className="text-center qty-field"
            value={cartQty}
            onChange={(e: any) => {
              handleInputChange(e, index);
            }}
          />
            <Link href="" legacyBehavior>
              <a className="text-primary ml-3" onClick={() => UpdateCart(orders.item_code)}>Update</a>
            </Link>
        </div>
      </td>
      <td className="product-subtotal">
        <span className="amount">₹ {orders.amount}</span>
      </td>
      {/* For mobile responsive */}
      <div className="d-lg-none d-block">
        <div className="row">
          <div className="col-6 fs-4">ITEM WITH DESCRIPTION </div>:
          <div className="col-5">
            <Link href={`${orders.product_url}`} legacyBehavior>
              <a className="prod_name">{orders.item_name}</a>
            </Link>
            <b>{orders.item_code}</b>
            <p className="my-0">
              <button
                className="astext"
                onClick={() => HandleDeleteCart(orders.item_code)}
              >
                <Link href="" className="text-primary">
                  Delete
                </Link>
              </button>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">Price </div>:
          <div className="col-5 text-start">
            {orders?.details.length > 0 &&
              orders?.details !== null &&
                <p className="text-start my-0">
                  {" "}
                  <i className="fa fa-inr" aria-hidden="true"></i>{" "}
                  <span className="text-center">
                    <IndianNumber value={orders.details[1]?.value} />
                  </span>
                </p>
              }
          </div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">UNIT WEIGHT(KG) </div>:
          <div className="col-5 text-start">{orders.weight_per_unit}</div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">TOTAL WEIGHT(KG) </div>:
          <div className="col-5 text-start">{orders.total_weight}</div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">TAX </div>:
          <div className="col-5 text-start">₹ {orders.tax}</div>
        </div>
        <div className="row my-5">
          <div className="col-6 fs-4">QTY </div>:
          <div className="col-5 ">
            <input
              type="text"
              className="w-50 text-start"
              value={cartQty}
              onChange={(e: any) => {
                handleInputChange(e, index);
              }}
            />
            <br />
              <Link href="" legacyBehavior>
                <a className="text-primary" onClick={() => UpdateCart(orders.item_code)}>Update</a>
              </Link>
           
          </div>
        </div>
        <div className="row">
          <div className="col-6 fs-4">TOTAL </div>:
          <div className="col-5 ">₹ {orders.amount}</div>
        </div>
        <h5 className="mb-0 sub-total-h5">
                Sub total ({cartListingItems?.total_qty} Qty):{" "}
                <span>
                  {cartListingItems?.categories[0]?.orders[0]?.currency_symbol}{" "}
                  {cartListingItems?.grand_total_excluding_tax}
                </span>
                {/* <p></p>
                <IndianNumber
                  value={cartListingItems?.grand_total_excluding_tax}
                /> */}
              </h5>
      </div>
    </>
  );
};

export default CartCard;
