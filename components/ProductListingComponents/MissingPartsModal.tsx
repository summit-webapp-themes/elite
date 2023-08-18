import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MissingPartsAPI } from "../../services/api/product-listing-page-api/missing-parts-api";
import { get_access_token } from "../../store/slices/auth/token-login-slice";

const MissingPartsModal = ({
  show,
  handlemodalclose,
  setShow,
  SelectedLangDataFromStore,
  selectLangData,
}: any) => {
  const TokenFromStore: any = useSelector(get_access_token);
  const [descriptionVal, setdescriptionval] = useState<any>("");
  const [message, setMessage] = useState<any>("");
  const [showToast, setshowToast] = useState<boolean>(false);
  const [messageNew, setmessageNew] = useState<string>("");
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (descriptionVal !== "") {
      const missingPartsApiRes:any = await MissingPartsAPI(TokenFromStore?.token,null, descriptionVal);
      if (
        missingPartsApiRes?.status === 200 &&
        missingPartsApiRes?.data?.message?.msg === "success"
      ) {
        setdescriptionval("");
      }
      handlemodalclose();
      //   setmessageNew("");
      //   setMessage(missingPartsApiRes.msg);
      //   if (missingPartsApiRes?.msg == "success") {
      //     //   setshowToast(true);
      //     dispatch(successmsg("Enquiry Send Sucessfully"));
      //     setTimeout(() => {
      //       dispatch(hideToast());
      //     }, 1200);
      //     setShow(false);
      //   }
    } else {
      setmessageNew("*Please fill one of the field");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handlemodalclose}>
        <Modal.Header closeButton>
          <h4 className="text-center mt-2">{selectLangData?.missing_parts}</h4>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group mt-2">
            <h6 className="text-capitalize">
              {selectLangData?.choice_product_not_f}
            </h6>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows={3}
              value={descriptionVal}
              onChange={(e) => (
                setdescriptionval(e?.target?.value), setmessageNew("")
              )}
            ></textarea>
          </div>
          <p className="text-danger">{messageNew}</p>
          <div className="text-right mt-4">
            <button
              className="btn button_color"
              onClick={(e) => handleSubmit(e)}
            >
              {selectLangData?.submit_enquiry}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default MissingPartsModal;
