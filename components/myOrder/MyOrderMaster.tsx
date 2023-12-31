import React, { useEffect, useState } from "react";
import PlaceOrder from "./components/PlaceOrder";
import CancelOrder from "./components/CancelOrder";
import UseCartOrderHistory from "../../hooks/order-listing-page-hook/cart-order-history-hook";
import { useSelector } from "react-redux";
import { SelectedFilterLangDataFromStore } from "../../store/slices/general_slices/selected-multilanguage-slice";


const MyOrderMaster = () => {
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

  const { orderHistoryItems, handleHistoryDate, history, loadingStatus } =
    UseCartOrderHistory();
  console.log("orderHistoryItems", orderHistoryItems);


  return (
    <>

      <div className="container mt-0 my-order-container-pd margin_from_nav" >
        <div className="mt-0 row">
          <div className="col-md-6" >
            <div className="page_heading" >
              <h4 className="" >
                {selectedMultiLangData?.your_orders}
              </h4>
            </div>
          </div>
        </div>
        <ul className="nav nav-tabs" role="tablist">
          <li className="nav-item">
            <a
              className="nav-link active"
              data-bs-toggle="tab"
              href="#placed_order"
            >
              {selectedMultiLangData?.orders}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-bs-toggle="tab" href="#can_order">
              {selectedMultiLangData?.cancelled}
            </a>
          </li>
        </ul>

        <div className="tab-content py-0 my-0" >
          <div id="placed_order" className="container tab-pane active show py-0 my-0">
            <br />
            <PlaceOrder
              orderHistoryItems={orderHistoryItems}
              handleHistoryDate={handleHistoryDate}
              selectedMultiLangData={selectedMultiLangData}
              history={history}
              loadingStatus={loadingStatus}
            />
          </div>
          <div id="can_order" className="container tab-pane fade">
            <br />
            <CancelOrder
              orderHistoryItems={orderHistoryItems}
              handleHistoryDate={handleHistoryDate}
              selectedMultiLangData={selectedMultiLangData}
              history={history}
            />
          </div>
        </div>
      </div>


    </>
  );
};

export default MyOrderMaster;
