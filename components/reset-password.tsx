import React from "react";
import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { RootState } from "../store/root-reducer";
import ResetPasswordApi from "../services/api/auth/reset-password";
import ResetpasswordValidation from "../validation/resetPasswordValidation";
import { showToast } from "./ToastNotificationNew";
import {
  failmsg,
  hideToast,
  successmsg,
} from "../store/slices/general_slices/toast_notification_slice";

interface FormValues {
  email: any;
  newPassword: any;
  confirmPassword: any;
}

const ResetPassword: any = () => {
  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);
  const [isConfirmPasswordRevealed, setIsConfirmPasswordRevealed] = useState<boolean>(false)
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const initialValues: FormValues = {
    email: "",
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: any, action: any) => {
    let resetPasswordApiRes: any = await ResetPasswordApi(values);
    console.log("resetPasswordApiRes", resetPasswordApiRes);
    if (resetPasswordApiRes?.data?.message?.msg === "success") {
      // dispatch(successmsg("Password Changed sucessfully"));
      showToast("Password Changed sucessfully", "success");
      router.push("/login");
      // setTimeout(() => {
      //   dispatch(hideToast());
      // }, 2000);
    } else {
      showToast("User With this email Does Not Exists", "error");
      // dispatch(failmsg("User With this email Does Not Exists"));

      // setTimeout(() => {
      //   dispatch(hideToast());
      // }, 2000);
    }
  };
  const togglePasswordVisibility = (fieldName: string) => {
    if (fieldName === 'newPassword') {
      setIsPasswordRevealed(!isPasswordRevealed);
    } else if (fieldName === 'confirmPassword') {
      setIsConfirmPasswordRevealed(!isConfirmPasswordRevealed);
    }
  };
  return (
    <>
      <div className="container margin_from_nav reset-pass-wrapper" style={{maxWidth:'700px' , width:'100%'}}>
        <div className="page_heading text-center">
          <h4 className="text-uppercase">Reset Your Password</h4>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={ResetpasswordValidation}
          onSubmit={(values, action) => handleSubmit(values, action)}
        >
          {({ handleChange }) => (
            <FormikForm>
              <div className="mt-4">
                <div className="row">
                  <div className="col-md-3 ">
                    <div>
                      <label htmlFor="" className="color-black">
                        Email ID:
                      </label>
                    </div>
                  </div>
                  <div className="col-md-9 color-black">
                    <div className="">
                      <Field
                        type="email"
                        className="form-control"
                        name="email"
                        onChange={handleChange}
                      />
                      <br />
                      <div className="error_message">
                        <ErrorMessage name="email" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-3">
                    <div>
                      <label htmlFor="" className="color-black">
                        New Password:
                      </label>
                    </div>
                  </div>
                  <div className="col-md-9 color-black">
                    <div className="">
                      <div className="input-group">
                        <Field
                          type={isPasswordRevealed ? "text" : "password"}
                          className="form-control"
                          name="newPassword"
                          onChange={handleChange}
                        />
                        <span className="input-group-text px-4">
                          {isPasswordRevealed ? (
                            <i
                              className="fa fa-eye visibility_icon"
                              onClick={() => togglePasswordVisibility('newPassword')}

                            />
                          ) : (
                            <i
                              className="fa fa-eye-slash visibility_icon"
                              onClick={() => togglePasswordVisibility('newPassword')}
                            />
                          )}
                        </span>
                      </div>
                      <br />
                      <div className="error_message">
                        <ErrorMessage name="newPassword" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-3">
                    <div>
                      <label htmlFor="" className="color-black">
                        Confirm Password:
                      </label>
                    </div>
                  </div>
                  <div className="col-md-9 color-black">
                    <div className="">
                      <div className="input-group">
                        <Field
                          type={isConfirmPasswordRevealed ? "text" : "password"}
                          className="form-control"
                          name="confirmPassword"
                          onChange={handleChange}
                        />
                        <span className="input-group-text px-4">
                          {isConfirmPasswordRevealed ? (
                            <i
                              className="fa fa-eye visibility_icon"
                              onClick={() => togglePasswordVisibility('confirmPassword')}

                            />
                          ) : (
                            <i
                              className="fa fa-eye-slash visibility_icon"
                              onClick={() => togglePasswordVisibility('confirmPassword')}
                            />
                          )}
                        </span>
                      </div>
                      <br />
                      <div className="error_message">
                        <ErrorMessage name="confirmPassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="custom_btn text-center mt-4 me-5 " >
                  <Link href="/login" >
                    <button type="button" className="btn standard_button btn_reset color-black">
                      BACK
                    </button>
                  </Link>
                  <button
                    type="submit"
                    className="btn standard_button text-uppercase bold ms-5 btn_reset color-black"
                  >
                    RESET
                  </button>
                </div>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ResetPassword;