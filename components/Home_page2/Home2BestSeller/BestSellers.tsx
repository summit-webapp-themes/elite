import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CONSTANTS } from "../../../services/config/app-config";
const BestSellers = ({ bestSellerListing }: any) => {
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <div className="">
      <div className="container">
        <div className="row banner-product-wrapper pb-1">
        <div className="text-center pt-4 pb-4 mt-4 mb-4">
          <h3 className="mb-4 category_heading text-center" style={{color:"#E03A05"}}>Best Sellers</h3>
        </div>
          <div className="row">
          {bestSellerListing?.length > 0 && bestSellerListing !== null && (
                <>
                  {bestSellerListing?.slice(0,2)?.map((list: any, i: any) => (
                    <div className="col-md-6 mt-5">
                      <div className="product-wrap product-border">
                        <div className="product text-center">
                          <div className="row">
                            <div className="col-md-6 mb-5">
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
                            <div className="col-md-6 bestseller_cards">
                              <div className="">
                                <h4 className="product-names truncate-overflow">
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
                      </div>
                    </div>
                  ))}
                </>
              )}
          </div>
          <div className="product-wrapper col-xl-12 col-md-8">
            <div className="swiper-container swiper-theme" />
            <div className="row">
              {bestSellerListing?.length > 0 && bestSellerListing !== null && (
                <>
                  {bestSellerListing?.slice(2)?.map((list: any, i: any) => (
                    <div className="col-md-4 mt-5">
                      <div className="product-wrap">
                        <div className="product text-center">
                          <div className="row">
                            <div className="col-md-6">
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
  );
};

export default BestSellers;
