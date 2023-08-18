import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CONSTANTS } from "../../../services/config/app-config";

const SpecialofferHome2 = ({ specialTagListing }: any) => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      <div className="" style={{ paddingBottom: "40px" }}>
        <div className="container">
          <div className="banner-product-wrapper pb-1">
            <div className="product-wrapper col-xl-12 col-md-12 ">
              <div className="text-center pt-4 pb-4 mt-4 mb-4">
                <h3
                  className="mb-4 category_heading text-center"
                  style={{ color: "#E03A05" }}
                >
                  Special Offer
                </h3>
              </div>
              <div className="swiper-container swiper-theme" />
              <div className="row">
                {specialTagListing?.length > 0 &&
                  specialTagListing !== null && (
                    <>
                      {specialTagListing.map((list: any, i: any) => (
                        <div className="col-md-3 mt-5 mb-2 ">
                          <div className="product-wrap">
                            <div className="product text-center shadow  p-3">
                              <div className="row">
                                <div className="col-md-6 mt-5">
                                  <figure className="product-media">
                                    {list?.image_url !== null &&
                                    list?.image_url?.length > 0 ? (
                                      <>
                                        <Link href={list.url}>
                                          <Image
                                            loader={imageLoader}
                                            src={list?.image_url}
                                            alt="Product"
                                            width="300"
                                            height="300"
                                          />
                                        </Link>
                                      </>
                                    ) : (
                                      <>
                                        <Link href={list.url}>
                                          <Image
                                            // loader={imageLoader}
                                            src={
                                              list?.image_url !== null
                                                ? list?.image_url
                                                : "/assets/images/maximaCard.jpg"
                                            }
                                            alt="Product"
                                            width="300"
                                            height="300"
                                          />
                                        </Link>
                                      </>
                                    )}
                                  </figure>
                                </div>
                                <div className="col-md-6 mt-5">
                                  <div className="product-details">
                                    <h4 className="product-name truncate-overflow">
                                      <Link href={list.url}>
                                        {list.item_name}
                                      </Link>
                                    </h4>
                                    <div className="product-price">
                                      <ins className="new-price">
                                        ₹{list?.price}
                                      </ins>
                                      <del className="old-price">
                                        ₹{list?.mrp_price}
                                      </del>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialofferHome2;
