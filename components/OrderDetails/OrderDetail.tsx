import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Image from "next/image";
import UseThankyou from "../../hooks/order-listing-page-hook/order-list-hook";
import { CONSTANTS } from "../../services/config/app-config";
import IndianNumber from "../CheckoutPageComponent/IndianNumber";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";
import { currency_selector_state } from "../../store/slices/general_slices/multi-currency-slice";
import ListViewLoadingLayout from "../ProductListingComponents/products-data-view/ListViewLoadingLayout";
import UseCartOrderHistory from "../../hooks/order-listing-page-hook/cart-order-history-hook";
import OrderDetailCard from "../../cards/OrderDetailCard";


type PropsType = {
  id?: any;
};

const Index = ({ sales_order_id }: any) => {
  let { id, detail }: any = UseThankyou();
  console.log("detail id", id);
  const dispatch = useDispatch();
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const [typeOf, setTypeOf] = useState("Replacement");
  const [text, setText] = useState("");
  const [productId, setProductId] = useState("");
  const [newData, setData] = useState<any>();
  let years: any;

  const router = useRouter();

  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };

  let thankyou = router.asPath.split("/")[1];
  // console.log("thank", thankyou);
  // console.log("my orders get order detail data in order detail file", detail);

  const handleTypeChange = (e: any) => {
    setTypeOf(e.target.value);
  };

  // const {  Loadings } = UseCartOrderHistory();
  const { loadingStatus } = UseCartOrderHistory();

  const handleTextChange = (e: any) => {
    setText(e.target.value);
  };

  useEffect(() => {
    // console.log("Detail data in use", detail);
    if (detail?.length > 0 && detail !== null) {
      detail?.map((data: any) => setData(data.transaction_date));
    }
  }, [detail]);

  useEffect(() => {
    // console.log("Detail data in use", detail);
    if (detail?.length > 0 && detail !== null) {
      detail?.map((data: any) => setData(data.transaction_date));
    }
  }, [detail]);

  // console.log("newData", newData);

  const handleSubmit = async (e: any) => {
    // console.log("+++++++handle submit function");
    e.preventDefault();
    setProductId("");
    setTypeOf("");
    setText("");
  };

  const SelectedLangDataFromStore: any = useSelector(
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

  console.log("selectedMultiLangData",selectedMultiLangData)
  return (
    <div className="container margin_from_nav" >
      {detail?.length === 0 ? (
        <div className="row justify-content-center">
          {[...Array(10)].map(() => (
            <>
              <div className="col-lg-12 mx-3">
                <ListViewLoadingLayout />
              </div>
            </>
          ))}
        </div>
      ) : (<>
        {detail?.length > 0 &&
          detail !== null &&
          detail?.map((data: any) => (
            <div className="container color-black" key={data?.name} >
              <>
                <div className="row color-black">
                  <div className="col-md-6" >
                    <div className="page_heading" >
                      <h4 className="p-0 m-0" >
                        {selectedMultiLangData?.order_details}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="order_detail_head row color-black pb-2"  >
                  <div className="col-12">
                    <div className="item_action d-flex ">
                      <div className="item_action_link me-3 " >{data.creation}</div>
                      <div className="item_action_link order-pipe color-black" >
                        <span 
>
                          | {selectedMultiLangData?.orders} # {data?.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="printableArea" className="row color-black" >
                  <div className="col-lg-12">
                    <div className="order_card mb-3 card">
                      <div className="card-body">
                        <div className="row">
                          {data?.addresses?.map((addr: any, index: any) => (
                            <div className="mb-0 mb-sm-0 col-md-3" key={index}>
                              <div>
                                <h5 className="data_heading mb-1">{addr?.name}</h5>
                                {addr?.values &&
                                  addr?.values.map((addrValue: any, i: any) => (
                                    <div className="myorders" key={i}>
                                      <p className="mb-0 my-0 py-0  address_tiitles">
                                        {addrValue?.address_title}
                                      </p>
                                      <p className="mb-0 my-0 py-0 ">{addrValue?.address_1}</p>
                                      <p className="mb-0" >
                                        {addrValue?.postal_code}
                                      </p>
                                      <p className="mb-0  ">
                                        {addrValue?.city}, {addrValue?.state}
                                      </p>
                                      <p className="mb-0  ">{addrValue?.country}</p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}

                          <div className="col-md-2">
                            {/* <h5 className="data_heading mb-1">
                              {selectedMultiLangData?.shipping_method}
                            </h5> */}
                            <div>
                              {/* <p className="mb-0" }>
                                {selectedMultiLangData?.transporter} :{" "}
                                {data.shipping_method.transporter}
                              </p> */}

                              {data?.shipping_method?.door_delivery === 0 &&
                                data?.shipping_method?.godown_delivery === 0 ? (
                                <p className="mb-0">
                                  {selectedMultiLangData?.door_delivery_yes}
                                </p>
                              ) : (
                                ""
                              )}
                              {data?.shipping_method?.door_delivery === 0 &&
                                data?.shipping_method?.godown_delivery !== 0 ? (
                                <>
                                  <p className="mb-0">
                                    {" "}
                                    {selectedMultiLangData?.godown_delivery}
                                  </p>
                                  {data?.shipping_method.location === null ? (
                                    ""
                                  ) : (
                                    <p className="mb-0">
                                      {selectedMultiLangData?.location}:{" "}
                                      {data?.shipping_method?.location}
                                    </p>
                                  )}
                                </>
                              ) : (
                                ""
                              )}

                              {data?.shipping_method?.remarks === null ? (
                                ""
                              ) : (
                                <p className="mb-0">
                                  {selectedMultiLangData?.remark}:{" "}
                                  {data?.shipping_method?.remarks}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="col-md-4 myorders">
                            <h5 className="data_heading mb-1">
                              {" "}
                              {selectedMultiLangData?.order_summary}
                            </h5>
                            <div className="mb-1 row" >
                              <div className="col-6">
                                <p className="mb-0 ">
                                  {selectedMultiLangData?.sub_total_excl_tax}
                                </p>
                              </div>
                              <div className="text-right col-6">
                                <p className="mb-0  product-price">
                                  {data?.currency_symbol}{" "}
                                  {data?.subtotal_exclude_tax}
                                </p>
                              </div>
                            </div>
                            <div className="mb-1 row" >
                              <div className="col-6">
                                <p className="mb-0  ">
                                  {selectedMultiLangData?.tax}
                                </p>
                              </div>
                              <div className="text-right col-6">
                                <p className="mb-0 order_summary_p product-price">
                                  {data?.currency_symbol} {data?.tax}
                                </p>
                              </div>
                            </div>
                            {/* <div className="mb-0 row" style={{border:"2px solid red"}}>
                              {data?.coupon_code !== null ? (
                                <>
                                  <div className="col-6">
                                    <p className="mb-0 order_summary_p">
                                      {selectedMultiLangData?.coupon_code}
                                    </p>
                                  </div>
                                  <div className="text-right col-6">
                                    <p className="mb-0 order_summary_p ">
                                      <span>{data?.coupon_code}</span>
                                    </p>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="mb-0 row" style={{border:"2px solid red"}}>
                              {data?.coupon_amount !== 0 ? (
                                <>
                                  <div className="col-6">
                                    <p className="mb-0 order_summary_p ">
                                      {selectedMultiLangData?.coupon_amount}
                                    </p>
                                  </div>
                                  <div className="text-right col-6">
                                    <p className="mb-0 order_summary_p">
                                      <i
                                        className="fa fa-inr pe-1"
                                        aria-hidden="true"
                                      ></i>
                                      <span>{data?.coupon_amount}</span>
                                    </p>
                                  </div>
                                </>
                              ) : (
                                ""
                              )}
                            </div> */}

                            <div className="mb-1 row" >
                              <div className="col-6">
                                <p className="mb-0  ">
                                  {selectedMultiLangData?.sub_total_incl_tax}
                                </p>
                              </div>
                              <div className="text-right col-6">
                                <p className="mb-0  product-price">
                                  {data?.currency_symbol}{" "}
                                  {data?.subtotal_include_tax}
                                </p>
                              </div>
                            </div>
                            <hr className="mt-0 mb-0" />
                            <div className="row" >
                              <div className="col-6">
                                <p className="mb-0 bold order_summary_p" >
                                  {selectedMultiLangData?.order_total}
                                </p>
                              </div>
                              <div className="text-right col-6">
                                <p className="mb-0 bold order_summary_p product-price" >
                                  {data?.currency_symbol} {data?.total}
                                </p>
                              </div>
                            </div>
                            <hr className="mt-0 mb-1" />
                            <div className="row" >
                              <div className="col-6">
                                <p className="mb-0 bold order_summary_p">
                                  {selectedMultiLangData?.total}
                                </p>
                              </div>
                              <div className="text-right col-6" >
                                <p className="mb-0 bold order_summary_p product-price">
                                  {data?.currency_symbol} {data?.total}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>


                <div className="font-weight" key={data?.name} >
                  <div className="order_card cart_table mb-3 card color-black" >
                    {data?.order_details.map((oDetail: any, index: any) => (
                      <>
                        <OrderDetailCard oDetail={oDetail} index={index} currency_symbol={data?.currency_symbol} />
                      </>
                    ))}
                  </div>


                </div>
              </>




            </div>
          ))}
      </>

      )}

    </div>
  );
};

export default Index;
