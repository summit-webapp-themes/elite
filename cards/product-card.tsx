import Image from 'next/image';
import Link from 'next/link';
import { CONSTANTS } from '../services/config/app-config';
import { ProductCardProps } from '../interfaces/product-card-interface';
import { fetchWishlistUser } from '../store/slices/wishlist-slice/wishlist-slice';
import { useDispatch, useSelector } from 'react-redux';
import {
  failmsg,
  hideToast,
  successmsg,
} from '../store/slices/general_slices/toast_notification_slice';
import { fetchCartListing } from '../store/slices/cart-listing-page-slice/cart-listing-slice';
import AddToCartApi from '../services/api/cart-page-api/add-to-cart-api';
import {
  get_access_token,
  updateAccessToken,
} from '../store/slices/auth/token-login-slice';
import { showToast } from '../components/ToastNotificationNew';
import { profileData_state } from '../store/slices/general_slices/profile-page-slice';
import { useState } from 'react';

const ProductCard = (props: ProductCardProps) => {
  const {
    key,
    name,
    url,
    img_url,
    display_tag,
    item_name,
    currency_symbol,
    price,
    mrp_price,
    item_slug,
    wishlistData,
    currency_state_from_redux,
    selectedMultiLangData,
    selectLangData,
  } = props;

  const TokenFromStore: any = useSelector(get_access_token);
  const profileData: any = useSelector(profileData_state);
  console.log('profile partyname', profileData);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  let isLoggedIn: any;
  let wishproducts: any;
  let requestNew: any;
  let requestList: any;
  let partyName: any;

  if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn');
  }
  const dispatch = useDispatch();

  const handleAddCart = async () => {
    // setAddToCartButtonDisabled(true);
    const addCartData = [];
    addCartData.push({
      item_code: name,
      quantity: 1,
    });
    let AddToCartRes: any = await AddToCartApi(
      addCartData,
      currency_state_from_redux?.selected_currency_value,
      TokenFromStore?.token
    );
    if (AddToCartRes.msg === 'success') {
      showToast('Item Added to cart', 'success');
      dispatch(fetchCartListing());
      // setAddToCartButtonDisabled(false);
    } else {
      showToast(AddToCartRes?.error, 'error');
      // setAddToCartButtonDisabled(false);
    }
  };
  return (
    <div
      key={key}
      className="border ps-0 ms-0  product-border-pd rounded-3 h-100 "
    >
      <div className="d-flex justify-content-between icon-container-ps">
        <div
          className={`badge text-bg-primary fs-5 display_tag_badge product-font-family ${
            display_tag?.length > 0 && display_tag[0] ? 'visible' : 'invisible'
          }`}
        >
          {display_tag?.length > 0 && display_tag[0]}
        </div>

        <div className="mb-0 mt-0 pb-0 pt-0">
          {wishlistData?.map((values: any) => {
            if (values.name === name) {
              wishproducts = values?.name;
            }
          })}
          {!wishproducts ? (
            <a
              style={{ cursor: 'pointer' }}
              onClick={() => {
                requestNew = {
                  prod_id: name,
                  getWishlist: false,
                  deleteWishlist: false,
                  addTowishlist: true,
                  token: TokenFromStore?.token,
                };
                requestList = {
                  getWishlist: true,
                  deleteWishlist: false,
                  addTowishlist: false,
                  token: TokenFromStore?.token,
                };
                dispatch(fetchWishlistUser(requestNew));

                setTimeout(() => {
                  dispatch(fetchWishlistUser(requestList));
                }, 900);
              }}
            >
              <i
                className="fa fa-heart-o text-danger fs-1 "
                aria-hidden="true"
                data-bs-toggle="tooltip"
                title="Add to Wishlist"
              ></i>
            </a>
          ) : (
            <a
              className="icon_pointer"
              onClick={() => {
                requestNew = {
                  prod_id: name,
                  getWishlist: false,
                  deleteWishlist: true,
                  addTowishlist: false,
                  token: TokenFromStore?.token,
                };
                requestList = {
                  getWishlist: true,
                  deleteWishlist: false,
                  addTowishlist: false,
                  token: TokenFromStore?.token,
                };
                dispatch(fetchWishlistUser(requestNew));

                setTimeout(() => {
                  dispatch(fetchWishlistUser(requestList));
                }, 900);
              }}
            >
              <i
                className="fa fa-heart text-danger fs-1 "
                aria-hidden="true"
                data-bs-toggle="tooltip"
                title="Added to Wishlist"
              ></i>
            </a>
          )}
        </div>
      </div>
      <div className="product-wrap">
        <div className="product text-center ">
          <div className="product-media product_card_h product-main-container text-center d-flex justify-content-center">
            {img_url !== '' ? (
              <>
                <Link
                  href={`${url}?currency=${currency_state_from_redux?.selected_currency_value}`}
                >
                  <Image
                    loader={() => `${CONSTANTS.API_BASE_URL}${img_url}`}
                    src={`${CONSTANTS.API_BASE_URL}${img_url}`}
                    alt="product-detail"
                    width={200}
                    height={200}
                    className="product_img_mob product_img_web"
                  />
                </Link>
              </>
            ) : (
              <>
                <Link href={url}>
                  <Image
                    src={'/assets/images/maximaCard.jpg'}
                    alt="Product"
                    width="200"
                    height="200"
                    className="product_img_mob product_img_web"
                  />
                </Link>
              </>
            )}
          </div>
          <div className="product-details color-black product-margin-up">
            <h4 className="bold product-name truncate-overflow color-black">
              <Link
                href={`${url}?currency=${currency_state_from_redux?.selected_currency_value}`}
              >
                <span className="bold color-black"> {item_name}</span>
              </Link>
            </h4>
            <div className="product-price d-flex color-black margin-up">
              <div className="w-75">
                <ins className="new-price color-black">
                  {currency_symbol}
                  {price}
                </ins>
                <del className="old-price product-font-family">
                  {currency_symbol}
                  {mrp_price}
                </del>
              </div>

              {isLoggedIn === 'true' ? (
                <button
                  type="button"
                  className={` btn btn-primary ml-2 cart_btn_gtag listing-cartbtn product-font-family`}
                  onClick={handleAddCart}
                >
                  {isLoading ? (
                    <span
                      className="spinner-border spinner-border-md "
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    <i
                      className="fa fa-shopping-cart pe-5 pb-1 pt-1"
                      aria-hidden="true"
                    ></i>
                  )}
                </button>
              ) : (
                <button
                  className="btn btn-primary ml-2 cart_btn_gtag listing-cartbtn product-font-family"
                  // onClick={handleAddCart}
                >
                  <Link href="/login" className="text-white ">
                    <i
                      className="fa fa-shopping-cart d-flex justify-content-center"
                      aria-hidden="true"
                    ></i>
                  </Link>
                  {/* {selectedMultiLangData?.add_to_cart} */}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="product_card">
    //   <div className="">
    //     <div className={!in_stock_status ? "out_of_stock" : "in_stock"}>
    //       {<p className="out_of_stock_text mb-0">Out of stock</p>}
    //     </div>
    //   </div>

    //   <div className="card_inner">
    //     <div className="card_img">
    //       <Link href={url} className="">
    // <Image
    //   loader={() => `${CONSTANTS.API_BASE_URL}${img_url}`}
    //   src={`${CONSTANTS.API_BASE_URL}${img_url}`}
    //   alt="product-detail"
    //   width={142}
    //   height={142}
    //   className="img-fluid"
    // />
    //       </Link>
    //     </div>

    //     <div className="row mt-3">
    //       <div className="col-12 d-flex justify-content-between">
    //         <div>
    //           <p className="product_name mb-0">
    //             <div className="display_tag">
    //               {display_tag?.length > 0 ? (
    //                 <>
    //                   {display_tag
    //                     ?.slice(0, 1)
    //                     ?.map((item: any, index: number) => {
    //                       console.log("display in map", item);
    //                       return (
    //                         <>
    //                           <span
    //                             className="d-inline-block px-1 py-0 text-uppercase"
    //                             style={{
    //                               border: "1px solid #96c7ef",
    //                               backgroundColor: "#cae0f1",
    //                               fontSize: "12px",
    //                             }}
    //                           >
    //                             {item}
    //                           </span>
    //                         </>
    //                       );
    //                     })}
    //                 </>
    //               ) : (
    //                 ""
    //               )}
    //             </div>
    //             <Link href={url} className="text-dark">{item_name}</Link>
    //           </p>
    //         </div>
    //         {in_stock_status ? (
    //           <div className="cart ps-2">
    //             <a className="prodCart" style={{ cursor: "pointer" }}>
    //               <span
    //                 className="material-symbols-outlined"
    //                 id="shopping_cart"
    //               >
    //                 shopping_cart
    //               </span>
    //             </a>
    //             {/* </Link> */}
    //           </div>
    //         ) : (
    //           ""
    //         )}
    //       </div>
    //     </div>

    //     <div className="product-price">
    //       <p className="mb-0 price_p">
    //         <i className="fa fa-inr" aria-hidden="true"></i>
    //         <span className="price pe-2 ">{price}</span>
    //         <span className="price">
    //           <s>{mrp_price}</s>
    //         </span>
    //       </p>
    //     </div>
    //   </div>
    // </div>
  );
};

export default ProductCard;
