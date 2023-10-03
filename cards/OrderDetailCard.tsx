import React,{useState, useEffect} from 'react';
import { SelectedFilterLangDataFromStore } from '../store/slices/general_slices/selected-multilanguage-slice';
import Link from "next/link";
import {CONSTANTS} from "../services/config/app-config";
import { useDispatch, useSelector } from "react-redux";
import UseThankyou from '../hooks/order-listing-page-hook/order-list-hook';
import Image from "next/image";
import { currency_selector_state } from '../store/slices/general_slices/multi-currency-slice';
import { useRouter } from "next/router";

const OrderDetailCard = ({oDetail, index, currency_symbol}:any) => {
    const router = useRouter();

    let { id, detail }: any = UseThankyou();
    const [productId, setProductId] = useState("");
    const [typeOf, setTypeOf] = useState("Replacement");
    const [text, setText] = useState("");
    const [newData, setData] = useState<any>();

    const currency_state_from_redux: any = useSelector(currency_selector_state);

    const [selectedMultiLangData, setSelectedMultiLangData] = useState<any>();

    let thankyou = router.asPath.split("/")[1];

    const SelectedLangDataFromStore: any = useSelector(
        SelectedFilterLangDataFromStore
      );

      const myLoader = ({ src, width, quality }: any) => {
        return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
      };
    
   
    
    useEffect(() => {
        if (
          Object.keys(SelectedLangDataFromStore?.selectedLanguageData)?.length > 0
        ) {
          setSelectedMultiLangData(SelectedLangDataFromStore?.selectedLanguageData);
        }
      }, [SelectedLangDataFromStore]);

      const handleSubmit = async (e: any) => {
        // console.log("+++++++handle submit function");
        e.preventDefault();
        setProductId("");
        setTypeOf("");
        setText("");
      };

      const handleTypeChange = (e: any) => {
        setTypeOf(e.target.value);
      };
    
      const handleTextChange = (e: any) => {
        setText(e.target.value);
      };

  return (
    <>
          
            

                        <div
                          className="cart_item card-body products-name my-0 py-0" 
                          key={index} 
                        >
                          <div className="d-flex mb-0">
                            <div className="flex-fill">
                              <h6 className="green text-capitalize bold mb-0 status"></h6>
                            </div>

                          </div>
                          <div className="d-flex align-items-center row py-3" >
                            <div className="mb-0 mb-sm-0 col-lg-2 col-md-2 col-4">
                              <div className="product-image cart-image ">
                                {oDetail?.img === null ||
                                  oDetail?.img?.length === 0 ? (
                                  <Image
                                    src={`${oDetail?.brand_img}`}
                                    className="product_item_img img-fluid orderdetail-img"
                                    alt="product images"
                                    width={100}
                                    height={100}
                                    loader={myLoader}
                                  />
                                ) : (
                                  <Image
                                    loader={myLoader}
                                    src={`${oDetail?.img}`}
                                    className="product_item_img img-fluid addcart_item"
                                    alt="product images"
                                    width={100}
                                    height={100}
                                  />
                                )}
                              </div>
                            </div>
                            <div className="product_item_details col-lg-8 col-md-7 col-8">
                              <div className="d-flex orderdetail-name">
                                <div className="flex-fill" >
                                  <Link href={oDetail.product_url} legacyBehavior>
                                    <a className="product_item_name bold color-black" >
                                      {oDetail?.item_name}
                                    </a>
                                  </Link>

                                  <table
                                    width="100%"
                                    className="mt-0 table table-borderless"
                                  >
                                    <tbody>
                                      <tr className="item_options myorder_tr">
                                        <td className="px-0 py-0 pb-0 myorder_td">
                                          <p className="text-capitalize black mb-1 myorder_p color-black">
                                            {selectedMultiLangData?.item_code}
                                          </p>
                                        </td>
                                        <td
                                          width="85%"
                                          className="px-0 py-0 pb-0 myorder_width"
                                        >
                                          <p className="text-capitalize black mb-1 myorder_p color-black">
                                            : {oDetail?.name}
                                          </p>
                                        </td>
                                      </tr>

                                      <tr className="item_options myorder_tr">
                                        <td className="px-0 py-0 pb-0 myorder_td">
                                          <p className="text-capitalize black mb-1 myorder_p color-black">
                                            {selectedMultiLangData?.price}
                                          </p>
                                        </td>
                                        <td
                                          width="85%"
                                          className="px-0 py-0 mc-1 pb-0 myorder_width"
                                        >
                                          <p className="text-capitalize black mb-0 myorder_p font-weight-normal" >
                                            {oDetail?.prod_info[1].value !== 0 ? (
                                              <p className="mb-0 color-black">
                                                {" "}
                                                : {currency_symbol}{" "}
                                                {oDetail?.prod_info[1].value}
                                              </p>
                                            ) : (
                                              <p className="border price_request color-black">
                                                {
                                                  selectedMultiLangData?.price_on_request
                                                }
                                              </p>
                                            )}
                                          </p>
                                        </td>
                                      </tr>

                                      <tr className="item_options myorder_tr">
                                        <td className="px-0 py-0 pb-0 myorder_td">
                                          <p className="text-capitalize black mb-0 myorder_p color-black">
                                            {selectedMultiLangData?.quantity}
                                          </p>
                                        </td>
                                        <td
                                          width="85%"
                                          className="px-0 py-0 pb-0 myorder_width"
                                        >
                                          <p className="text-capitalize black mb-0 myorder_p color-black">
                                            : {oDetail?.prod_info[2].value}
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                            <div className="text-right col-lg-2 col-md-3 col-12">
                              {thankyou === "thankyou" ? (
                                <button className=" order_links b2c_btn mb-2 d-block text-uppercase">
                                <Link
                                  href={`${oDetail?.product_url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                                  legacyBehavior>
                                  <a className="bold text-dark">
                                    {selectedMultiLangData?.view_product}
                                  </a>
                                </Link>
                              </button>
                              ) : (
                                <button className=" order_links b2c_btn mb-2 d-block text-uppercase">
                                  <Link
                                    href={`${oDetail?.product_url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                                    legacyBehavior>
                                    <a className="bold text-dark">
                                      {selectedMultiLangData?.view_product}
                                    </a>
                                  </Link>
                                </button>
                              )}
                            </div>
                            <div
                              role="dialog"
                              aria-modal="true"
                              className="fade modal"
                              tabIndex={-1}
                              id="myModal"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header">
                                    <div className="modal-title h4 color-black">
                                      {selectedMultiLangData?.return_replacement}
                                    </div>
                                    <a className="action_icon">
                                      <i
                                        className="btn-close btn_close_custom"
                                        data-bs-dismiss="modal"
                                      ></i>
                                    </a>
                                  </div>
                                  <div className="modal-body">
                                    <div
                                      id="email_faq"
                                      aria-labelledby="email_faq_tab"
                                    >
                                      <div>
                                        <div className="Toastify"></div>
                                      </div>
                                      <div className="card">
                                        <div className="card-body">
                                          <h6 className="black bold text-center text-uppercase mb-4 pl-3">
                                            {
                                              selectedMultiLangData?.return_replacement_request
                                            }
                                          </h6>
                                          <div className="row">
                                            <div className="col">
                                              <form
                                                id="returnReplacement"
                                                className="fields-group-md"
                                                onSubmit={handleSubmit}
                                              >
                                                <div className="form-group mb-2">
                                                  <label className="form-label">
                                                    {
                                                      selectedMultiLangData?.return_replacement
                                                    }
                                                  </label>
                                                  <select
                                                    name="refund_requests[request_for]"
                                                    className="form-control input_tags"
                                                    onChange={handleTypeChange}
                                                    value={typeOf}
                                                  >
                                                    <option value="Replacement">
                                                      {
                                                        selectedMultiLangData?.replacement
                                                      }
                                                    </option>
                                                    <option value="Return">
                                                      {
                                                        selectedMultiLangData?.return
                                                      }
                                                    </option>
                                                  </select>
                                                  <span className="red"></span>
                                                </div>
                                                <div className="form-group">
                                                  <label className="form-label">
                                                    {
                                                      selectedMultiLangData?.reason_for_return_replacement
                                                    }
                                                  </label>
                                                  <textarea
                                                    onChange={handleTextChange}
                                                    name="refund_requests[refund_reason]"
                                                    className="mb-1 form-control input_tags"
                                                    value={text}
                                                    required
                                                  ></textarea>
                                                  <span className="red"></span>
                                                </div>
                                                <div className="form-group mb-2">
                                                  <label className="form-label">
                                                    {
                                                      selectedMultiLangData?.select_image_1
                                                    }
                                                  </label>
                                                  <div className="form-file">
                                                    <input
                                                      name="refund_request_images[0][image]"
                                                      type="file"
                                                      className="form-control-file"
                                                      // onChange={(e: any) =>
                                                      //   handleFileChange1(e)
                                                      // }
                                                      required
                                                    />
                                                  </div>
                                                  <span className="red"></span>
                                                </div>
                                                <div className="form-group mb-2">
                                                  <label className="form-label">
                                                    {
                                                      selectedMultiLangData?.select_image_2
                                                    }
                                                  </label>
                                                  <div className="form-file">
                                                    <input
                                                      name="refund_request_images[1][image]"
                                                      type="file"
                                                      className="form-control-file"
                                                      // onChange={(e: any) =>
                                                      //   handleFileChange2(e)
                                                      // }
                                                      required
                                                    />
                                                  </div>
                                                  <span className="red"></span>
                                                </div>
                                                <div className="form-group mb-2">
                                                  <label className="form-label">
                                                    {
                                                      selectedMultiLangData?.select_image_3
                                                    }
                                                  </label>
                                                  <div className="form-file">
                                                    <input
                                                      name="refund_request_images[2][image]"
                                                      type="file"
                                                      className="form-control-file"
                                                      // onChange={(e: any) =>
                                                      //   handleFileChange3(e)
                                                      // }
                                                      required
                                                    />
                                                  </div>
                                                  <span className="red"></span>
                                                </div>
                                                <div className="text-center mt-3">
                                                  <button
                                                    type="submit"
                                                    className="btn btn-warning yellow_btn"
                                                    data-bs-toggle="modal"
                                                  //   onClick={() =>
                                                  //     handleSubmitReturnReplacementRequest(
                                                  //       data.id,
                                                  //       oDetail.prod_name
                                                  //     )
                                                  //   }
                                                  >
                                                    {
                                                      selectedMultiLangData?.submit_request
                                                    }
                                                  </button>
                                                </div>
                                              </form>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                    
            
           
 
    </>
  )
}

export default OrderDetailCard