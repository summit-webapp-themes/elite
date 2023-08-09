import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NoProducts from "../public/assets/images/No-product.png";
import MissingPartsModal from "./ProductListingComponents/MissingPartsModal";
import { CONSTANTS } from "../services/config/app-config";

export const Norecord = ({ heading, content, img, selectLangData }: any) => {
  const [showMissingPartsModal, setShowMissingPartsModal] = useState(false);

  const handleMissingPartsModalClose = () => {
    setShowMissingPartsModal(false);
  };

  console.log("no product heading", heading, content);
  return (
    <div className="container text-center norecord_container">
      <div className="row">
        <div className="col-lg-12">
          <Image src={NoProducts} alt="" width={100} height={100} />
          <h1 className="black bold fs-5">{heading}</h1>
          <p className="my-2">{content}</p>
        </div>
        <div>
          {content === "Seeking a specific item?" ? (
            <>
              {CONSTANTS.ENABLE_MISSING_PARTS && (
                <button
                  onClick={() => {
                    setShowMissingPartsModal(true);
                  }}
                  className="btn btn-warning my-4 button_color "
                >
                  {selectLangData?.request_here}
                </button>
              )}
            </>
          ) : (
            <button
              type="button"
              className="btn btn-warning my-4 button_color "
            >
              <Link href="/" legacyBehavior>
                <a>{selectLangData?.shop_now}</a>
              </Link>
            </button>
          )}
        </div>
      </div>
      <MissingPartsModal
        show={showMissingPartsModal}
        handlemodalclose={handleMissingPartsModalClose}
        setShow={setShowMissingPartsModal}
      />
    </div>
  );
};
