import { ErrorMessage, Form as FormikForm, Field, Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ForgotValidation } from "../validation/forgotValidation";
import ResetPasswordLink from "../services/api/auth/reset-password-link-api";
import { useDispatch, useSelector } from "react-redux";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";
import { SelectedFilterLangDataFromStore } from "../store/slices/general_slices/selected-multilanguage-slice";

interface FormValues {
  email: any;
}

const ForgotPassword = () => {
  const dispatch = useDispatch();

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
  const initialValues: FormValues = {
    email: "",
  };
  const [message, setMessage] = useState("");
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  useEffect(() => {
    if (message === "success" || message === "error") {
      setIsAlertVisible(true);
    }
  }, [message]);

  const HandleSubmit = async (values: any) => {
    const hostName = window?.location?.hostname;
    console.log("hostname in tsx", hostName);
    // let
    let resetApi = await ResetPasswordLink(values, hostName);
    console.log("forgot pswd api res", resetApi);
    if (resetApi?.data?.message?.msg === "success") {
      dispatch(successmsg("Reset link send"));
      setTimeout(() => {
        dispatch(hideToast());
      }, 2000);
    } else {
      dispatch(failmsg("User With this email Does Not Exists"));
      setTimeout(() => {
        dispatch(hideToast());
      }, 2000);
    }
  };

  return (
    <>
      <div className="container my-5 margin_from_nav forget_password_wrapper">
        <div className={`col-lg-6 col-sm-9 col-12  mx-auto form_wrap`}>
          <div className="page_heading text-center">
            <h4 className="forgot_passwordh4">
              {selectedMultiLangData?.forgot_your_password}
            </h4>
          </div>
          <p className={`mt-4 forgotpassword_p`}>
            {selectedMultiLangData?.reset_password_instruction}
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={ForgotValidation}
            onSubmit={(values: any, action: any) => {
              console.log("forgot pswd values", values);
              HandleSubmit(values);
            }}
          >
            {({ handleChange, handleBlur }) => (
              <FormikForm className="">
                <div className=" text-center mt-2">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-3 ">
                        <div className={`label text-end mt-1`}>
                          <label htmlFor="" className="forgotpassword_label">
                            {selectedMultiLangData?.email}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="email_block">
                          <Field
                            type="email"
                            className="email_field"
                            name="email"
                            onChange={handleChange}
                          />
                          <br />
                          <div className="error_message error-message-field">
                            <ErrorMessage name="email" />
                          </div>
                        </div>
                        {/* {isAlertVisible && (
                          <div
                            className={`alert ${
                              message === "success"
                                ? "alert-success"
                                : "alert-danger"
                            } ${styles.otp_alertbox}`}
                            role="alert"
                          >
                            {message === "success"
                              ? "Link is send sucessfully on registered email"
                              : "Please enter valid or registered email"}
                          </div>
                        )} */}
                      </div>
                    </div>

                    <div className={`custom_btn my-4 mt-5 forget_btn_wrapper`}>
                      <Link
                        href="/login"
                        legacyBehavior
                        className="forgotpassword-btn"
                      >
                        <button
                          type="button"
                          className={`btn button_color back_forgotpassword mr-2`}
                        >
                          {selectedMultiLangData?.back}
                        </button>
                      </Link>
                      <button
                        type="submit"
                        className={`btn button_color btn_forgotpassword`}
                      >
                        {selectedMultiLangData?.submit}
                      </button>
                    </div>
                  </div>
                </div>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;