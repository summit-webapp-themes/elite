import React, { useEffect, useState } from "react";
import VisitorAddress from "./AddressForms/VisitorAddressForm";
import OrderSummary from "../OrderSummary/OrderSummary";
import Link from "next/link";
import FinalReviewSection from "./FinalReviewSection";
import ShippingMethod from "./ShippingMethod";
import { CONSTANTS } from "../../services/config/app-config";
import AddNewAddressForm from "./AddressForms/AddNewAddressForm";
import EditAddressForm from "./AddressForms/EditAddressForm";

const MobCheckout = ({
  shippingAddresses,
  billingAddresses,
  initialShippingAddress,
  setinitialShippingAddress,
  initialBillingAddress,
  setinitialBillingAddress,
  orderSummary,
  quotationId,
  handleChangeSameAsShipping,
  billingCheckbox,
  transporterlist,
  selectedVal,
  queryHandle,
  locationHandle,
  selectedState,
  textState,
  locationState,
  transporterState,
  transportHandle,
  handleDeleteCouponCode,
  handleApplyCouponCode,
  handleStoreCredit,
  handlePlaceOrder,
  deleteCoupon,
  setdeleteCoupon,
  couponCode,
  setCouponCode,
  storeCredit,
  setStoreCredit,
  couponCodeApiRes,
  selectedMultiLangData,
}: any) => {
  const [showEditModal, setshowEditModal] = useState<any>(false);
  const [detailData, setdetailData] = useState<any>();
  const [show, setshow] = useState<any>(false);
  const [type, setType] = useState<any>("");
  const [visitorState, setVisitorState] = useState<any>(null);
  const handleShow = (val: any) => {
    setshow(!show);
    setType(val);
  };

  const handleEditModal = (cardData: any) => {
    setshowEditModal(!showEditModal);
    setdetailData(cardData);
  };

  let isDealer: any = localStorage.getItem("isDealer");

  let visitor_login = false;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const visitor_login: any = localStorage.getItem("isLoggedIn");
      setVisitorState(visitor_login);
    }
  }, []);

  return (
    <>
      <div className="" >
       
        <div className="container " >
        <div className="mt-0 mb-4">
          <button
            type="button"
            onClick={handlePlaceOrder}
            className=" d-block w-75 mx-auto yellow_btn p-3  text-white  bold rounded  place_order_button"
          >
            {deleteCoupon}
            Place Order
          </button>
        </div>
          <div className="row">
                {!visitor_login ? (
                  <div>
                    <div className="col-lg-12 mb-5 w-100 products-name" >
                      <ul className="nav nav-tabs justify-content-center " >
                        {CONSTANTS.ENABLE_APPLY_COUPON_CODE ? (
                          <li className="nav-item ">
                            <a
                              className="nav-link active bold px-0"
                              href="#coupon"
                              data-bs-toggle="tab"
                              aria-selected="false"
                              role="tab"
                              tabIndex={-1}
                            >
                              <span className="bold couponlink-text coupon-text" >
                                {selectedMultiLangData?.apply_coupon_code}
                              </span>
                            </a>
                          </li>
                        ) : null}

                        {CONSTANTS.ENABLE_STORE_CREDIT ? (
                          <li className="nav-item">
                            <a
                              className="nav-link bold px-0"
                              href="#store"
                              data-bs-toggle="tab"
                              aria-selected="false"
                              role="tab"
                              tabIndex={-1}
                            >
                              <span className="bold couponlink-text coupon-text">
                                {selectedMultiLangData?.use_store_credit}
                              </span>
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    </div>

                    <div className="tab-content products-name" >
                      <div
                        className="specifications_details mb-3 tab-pane fade active show "
                        id="coupon"
                        role="tabpanel"
                      >
                        <div className="col-12 ">
                          <div className="row">
                            <div
                              id="collapseOne"
                              className="accordion-collapse collapse show"
                              aria-labelledby="headingOne"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body py-0" >
                                <form className="pt-3 fields-group-md">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control w-75 mx-auto coupon_input"
                                      id="couponCode"
                                      name="couponCode"
                                      value={couponCode}
                                      onChange={(e: any) =>
                                        setCouponCode(e?.target?.value)
                                      }
                                    />
                                    <span className="red">
                                      {couponCodeApiRes
                                        .replace("LinkValidationError('", "")
                                        .replace("')", "")}
                                    </span>
                                  </div>
                                  {deleteCoupon ? (
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-sm custom-btn transparent d-block w-100 btn btn-danger mt-2"
                                        onClick={() => handleDeleteCouponCode()}
                                      >
                                        {selectedMultiLangData?.delete_coupon}
                                      </button>
                                    </div>
                                  ) : (
                                    <div>
                                      <button
                                        type="button"
                                        className="btn btn-sm custom-btn transparent d-block w-100 btn btn-primary mt-2"
                                        onClick={(e: any) =>
                                          handleApplyCouponCode(e)
                                        }
                                      >
                                        {
                                          selectedMultiLangData?.apply_coupon_code
                                        }
                                      </button>
                                    </div>
                                  )}
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className="tech_details mb-3 tab-pane fade"
                        id="store"
                        role="tabpanel"
                      >
                        <div className="row container">
                          <form className="fields-group-md store_balance">
                            {/* <span>Store credit balance: 0</span> */}
                            <div className="form-group pt-3">
                              <input
                                placeholder="Enter credit amount"
                                type="text"
                                className="form-control "
                                value={storeCredit}
                                onChange={(e: any) =>
                                  setStoreCredit(e.target.value)
                                }
                              />
                              <span className="red"></span>
                            </div>
                          </form>
                          <button
                            type="button"
                            className="btn btn-sm transparent custom-btn d-block w-75 mx-auto btn btn-primary mt-2 "
                            onClick={(e: any) => handleStoreCredit(e)}
                          >
                            {selectedMultiLangData?.use_store_credit}
                          </button>
                        </div>
                      </div>
                    </div>

                    <hr className="mt-0" />

                    <div className="container order_summary_section products-name"  >
                      <h5 className="bold">
                        {selectedMultiLangData?.order_summary}
                      </h5>
                    </div>
                    <hr />

                    <OrderSummary 
                      orderSummary={orderSummary}
                      selectedMultiLangData={selectedMultiLangData}
                    />

                    <div className="container px-0 my-0"  >
                      <div className="row products-name">
                        {/* <h5>{initialShippingAddress}</h5> */}
                        <div className="col-lg-12 mb-2 w-100" >
                          <ul className="nav nav-tabs justify-content-center address_header">
                            <li className="nav-item " >
                              <a
                                className="nav-link active bold px-0"
                                href="#shipping"
                                data-bs-toggle="tab"
                                aria-selected="false"
                                role="tab"
                                tabIndex={-1}
                              >
                                <span className="bold coupon-text">
                                  {selectedMultiLangData?.shipping_addresses}
                                </span>
                              </a>
                            </li>
                            <li className="nav-item">
                              <a
                                className="nav-link bold px-0"
                                href="#billing"
                                data-bs-toggle="tab"
                                aria-selected="false"
                                role="tab"
                                tabIndex={-1}
                              >
                                <span className="bold coupon-text">
                                  {selectedMultiLangData?.billing_addresses}
                                </span>
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="tab-content products-name" >
                          <div
                            className="address_details mb-3 tab-pane fade active show"
                            id="shipping"
                            role="tabpanel"
                          >
                            <div className="col-12 mt-2" >
                              {/* {initialShippingAddress} */}
                              {shippingAddresses &&
                                shippingAddresses.map(
                                  (detail: any, index: any) => (
                                    <div className="container " key={index} >
                                      <div className="row ">
                                        <div className="col-1 pb-4">
                                          {shippingAddresses &&
                                            initialShippingAddress ===
                                            detail.address_id ? (
                                            <input
                                              type="radio"
                                              className="fs-4"
                                              onClick={() =>
                                                setinitialShippingAddress(
                                                  detail.address_id
                                                )
                                              }
                                              checked={true}
                                              id="shipping"
                                              name="shipping"
                                              value="shipping"
                                            />
                                          ) : (
                                            <input
                                              type="radio"
                                              className="fs-4"
                                              onClick={() =>
                                                setinitialShippingAddress(
                                                  detail.address_id
                                                )
                                              }
                                              id="shipping"
                                              name="shipping"
                                              value="shipping"
                                            />
                                          )}
                                        </div>
                                        <label className="col-6 products-name">
                                          {
                                            selectedMultiLangData?.shipping_addresses
                                          }
                                        </label>
                                        <div className="col text-end edit_button" >
                                          <button
                                            type="button"
                                            onClick={() => {
                                              handleEditModal(detail);
                                            }}
                                            className="text-decoration-underline  showmodal_button"
                                          >
                                            {selectedMultiLangData?.edit}
                                          </button>
                                        </div>
                                      </div>

                                      <div className="row products-name" >
                                        <div className="col-7">
                                          <div className="d-flex ">
                                            <p className="">{detail.name}</p>
                                          </div>
                                        </div>
                                        <div className="col-5">
                                          <div className="d-flex">
                                            <p className="  "></p>
                                          </div>
                                        </div>
                                        <div className="col-7">
                                          <div className="d-flex ">
                                            <p className="">
                                              {detail.address_1}
                                            </p>
                                          </div>
                                        </div>
                                        <div className="col-5 d-flex ">
                                          <p className="">{detail.address_2}</p>
                                        </div>
                                        <div className="col-7 d-flex ">
                                          <p className="">{detail.country}</p>
                                        </div>
                                        <div className="col-5 d-flex ">
                                          <p className="">{detail.state}</p>
                                        </div>
                                        <div className="col-7 d-flex ">
                                          <p className="">{detail.city}</p>
                                        </div>
                                        <div className="col-5 d-flex">
                                          <p className="">
                                            {detail.postal_code}
                                          </p>
                                        </div>
                                        <div className="col-7 " >
                                          <a
                                            className="text-dark products-name"
                                            href={`mailto:${detail.email}`}
                                            target="_blank"
                                            rel="noreferrer" style={{}}
                                          >
                                            {detail.email}
                                          </a>
                                        </div>
                                        <div className="col-5 d-flex products-name">
                                          <a
                                            className="text-dark"
                                            href={`tel:${detail.contact}`}
                                            target="_blank"
                                            rel="noreferrer"
                                          >
                                            {detail.contact}
                                          </a>
                                        </div>
                                      </div>
                                      <hr />
                                    </div>
                                  )
                                )}
                            </div>
                            <span className="d-flex align-items-center mt-2 px-4 products-name">
                              <button
                                onClick={() => handleShow("Shipping")}
                                className="fs-2 address_icon"
                              >
                                <i className="fa fa-edit text-primary "></i>
                              </button>

                              <div className="fs-3 mx-2 mb-5 ">
                                {selectedMultiLangData?.create_new_address}
                              </div>
                            </span>
                          </div>

                          <div
                            className="tech_details mb-3 tab-pane fade"
                            id="billing"
                            role="tabpanel" 
                          >
                            <div className="col-12 mt-2 products-name">
                              {/* {initialBillingAddress} */}

                              <div className="container " >
                                <div className="row px-2 products-name" >
                                  <div className="form-check">
                                    <input
                                      className="form-check-input fs-5 mt-2 bill_checkbox"
                                      type="checkbox"
                                      defaultChecked={true}
                                      id="flexCheckDefault"
                                      onChange={(e: any) =>
                                        handleChangeSameAsShipping(
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <label
                                      className="form-check-label fs-3 mt-1"
                                      htmlFor="flexCheckDefault" 
                                    >
                                      {
                                        selectedMultiLangData?.same_as_shipping_address
                                      }
                                    </label>
                                  </div>
                                </div>
                                {/* <h5>{initialBillingAddress}</h5> */}

                                {!billingCheckbox ? (
                                  <>
                                    <div className="d-flex justify-content-between "></div>
                                    <div className="col-12 mt-2" >
                                      {billingAddresses &&
                                        billingAddresses.map(
                                          (detail: any, index: any) => (
                                            <div className="row " key={index}>
                                              <div className="col-1 pb-4">
                                                {billingAddresses &&
                                                  initialBillingAddress ===
                                                  detail.address_id ? (
                                                  <input
                                                    type="radio"
                                                    className="fs-4"
                                                    onClick={() =>
                                                      setinitialBillingAddress(
                                                        detail.address_id
                                                      )
                                                    }
                                                    id="billing"
                                                    name="billing"
                                                    value="billing"
                                                    checked={true}
                                                  />
                                                ) : (
                                                  <input
                                                    type="radio"
                                                    className="fs-4"
                                                    onClick={() =>
                                                      setinitialBillingAddress(
                                                        detail.address_id
                                                      )
                                                    }
                                                    id="billing"
                                                    name="billing"
                                                    value="billing"
                                                  />
                                                )}
                                              </div>
                                              <label className="col-6">
                                                {
                                                  selectedMultiLangData?.billing_addresses
                                                }
                                              </label>
                                              <div className="col text-end edit_button">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    handleEditModal(detail);
                                                  }}
                                                  className="text-decoration-underline showmodal_button"
                                                >
                                                  {selectedMultiLangData?.edit}
                                                </button>
                                              </div>

                                              <div className="row" >
                                                <div className="col-6">
                                                  <div className="d-flex ">
                                                    <p className="">
                                                      {detail.name}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="col-6">
                                                  <div className="d-flex">
                                                    <p className="  "></p>
                                                  </div>
                                                </div>
                                                <div className="col-6">
                                                  <div className="d-flex ">
                                                    <p className="">
                                                      {detail.address_1}
                                                    </p>
                                                  </div>
                                                </div>
                                                <div className="col-6 d-flex ">
                                                  <p className="">
                                                    {detail.address_2}
                                                  </p>
                                                </div>
                                                <div className="col-6 d-flex ">
                                                  <p className="">
                                                    {detail.country}
                                                  </p>
                                                </div>
                                                <div className="col-6 d-flex ">
                                                  <p className="">
                                                    {detail.state}
                                                  </p>
                                                </div>
                                                <div className="col-6 d-flex ">
                                                  <p className="">
                                                    {detail.city}
                                                  </p>
                                                </div>
                                                <div className="col-6 d-flex">
                                                  <p className="">
                                                    {detail.postal_code}
                                                  </p>
                                                </div>
                                                <div className="col-6 d-flex ">
                                                  <a
                                                    className="text-dark"
                                                    href={`mailto:${detail.email}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    {detail.email}
                                                  </a>
                                                </div>
                                                <div className="col-6 d-flex ">
                                                  <a
                                                    className="text-dark"
                                                    href={`tel:${detail.contact}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    {detail.contact}
                                                  </a>
                                                </div>
                                              </div>
                                              <hr />
                                            </div>
                                          )
                                        )}
                                    </div>

                                    <span className="d-flex align-items-center mt-2 " >
                                      <button
                                        onClick={() => handleShow("Billing")}
                                        className="fs-2 address_icon"
                                      >
                                        <i className="fa fa-edit text-primary "></i>
                                      </button>
                                      <div className="fs-3 mx-2 mb-1">
                                        {
                                          selectedMultiLangData?.create_new_billing_address
                                        }
                                      </div>
                                    </span>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <ShippingMethod
                        transporterlist={transporterlist}
                        selectedVal={selectedVal}
                        queryHandle={queryHandle}
                        locationHandle={locationHandle}
                        selectedState={selectedState}
                        textState={textState}
                        locationState={locationState}
                        transporterState={transporterState}
                        transportHandle={transportHandle}
                        selectedMultiLangData={selectedMultiLangData}
                      />
                      <FinalReviewSection
                        orderSummary={orderSummary}
                        handlePlaceOrder={handlePlaceOrder}
                        deleteCoupon={deleteCoupon}
                        selectedMultiLangData={selectedMultiLangData}
                      /> */}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className=" container row products-name" >
                      <div className="col-lg-8 ">
                        <h3 className="text-uppercase bold">
                          {selectedMultiLangData?.checkout_details}
                        </h3>
                        <div className="d-flex align-items-center">
                          <button className="btn btn-warning btn-sm rounded-0 bold">
                            <Link href={"/login"}>
                              {" "}
                              {selectedMultiLangData?.login}
                            </Link>
                          </button>
                          <span className="text-muted px-2 fs-6">or</span>
                          <div className="d-flex align-items-center ">
                            <input
                              className="form-check-input fs-6"
                              type="checkbox"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label px-2 fs-6 text-muted"
                              htmlFor="flexCheckDefault"
                            >
                              {selectedMultiLangData?.login_as_guest}
                            </label>
                          </div>
                        </div>
                        <div className="col-lg-4 border rounded-1 mt-3">
                          <h5 className="my-3 bold text-uppercase px-1">
                            {selectedMultiLangData?.order_summary}
                          </h5>
                          <OrderSummary orderSummary={orderSummary} />
                        </div>

                        <div className="border rounded-1 mt-2">
                          <h5 className="px-3">
                            {selectedMultiLangData?.create_new_address}
                          </h5>
                          <h6 className="bold px-3 mb-0">
                            {" "}
                            {selectedMultiLangData?.shipping}
                          </h6>
                          <VisitorAddress
                            address_type="Shipping"
                            isSameAsShipping={billingCheckbox}
                            selectedMultiLangData={selectedMultiLangData}
                          />
                          <h6 className="bold px-3">
                            {" "}
                            {selectedMultiLangData?.billing}
                          </h6>
                          <div className="d-flex align-items-center px-3">
                            <input
                              className={`form-check-input fs-6 `}
                              type="checkbox"
                              defaultChecked={false}
                              id="flexCheckDefault"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleChangeSameAsShipping(e.target.checked)}
                            />
                            <label
                              className="form-check-label px-2 fs-6"
                              htmlFor="flexCheckDefault"
                            >
                              {selectedMultiLangData?.same_as_shipping_address}
                            </label>
                          </div>
                          {billingCheckbox ? (
                            <VisitorAddress
                              address_type="Billing"
                              isSameAsShipping={billingCheckbox}
                              selectedMultiLangData={selectedMultiLangData}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </>
                )}
          </div>
        </div>
      </div>

      <hr />

      {show ? (
        <AddNewAddressForm
          show={show}
          toHide={handleShow}
          address_type={type}
          selectedMultiLangData={selectedMultiLangData}
        />
      ) : null}

      {showEditModal ? (
        <EditAddressForm
          show={showEditModal}
          toHide={handleEditModal}
          detailData={detailData}
          address_type={type}
          selectedMultiLangData={selectedMultiLangData}
        />
      ) : null}
    </>
  );
};

export default MobCheckout;