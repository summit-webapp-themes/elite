import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CONSTANTS } from "../../../services/config/app-config";
const NewArrival = ({ newarrivalTagListing }: any) => {
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <>
      <div className="brand_container" style={{ paddingBottom: "40px" }}>
        <div className="container">
        <div className="text-center pt-4 pb-4 mt-4 mb-4">
        <h3 className="mb-4 category_heading text-center" style={{color:"#E03A05"}}>New Arrivals</h3>
        </div>
          <div className="row banner-product-wrapper pb-1">
            <div className="product-wrapper col-xl-12 col-md-8">
              <div className="swiper-container swiper-theme" />
              <div className="row">
                {newarrivalTagListing?.length > 0 &&
                  newarrivalTagListing !== null && (
                    <>
                      {newarrivalTagListing.map((list: any, i: any) => (
                        <div className="col-md-3 mt-3">
                          <div className="product-wrap">
                            <div className="product text-center">
                              <figure className="product-media">
                                {list?.image_url !== null &&
                                list?.image_url?.length > 0 ? (
                                  <>
                                    <Link href={list.url}>
                                      <Image
                                        loader={myLoader}
                                        src={list?.image_url}
                                        alt="Product"
                                        width="200"
                                        height="200"
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
                                        width="200"
                                        height="200"
                                      />
                                    </Link>
                                  </>
                                )}
                              </figure>
                              <div className="product-details">
                                <h4 className="product-name truncate-overflow">
                                  <Link href={list.url}>{list.item_name}</Link>
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

export default NewArrival;
