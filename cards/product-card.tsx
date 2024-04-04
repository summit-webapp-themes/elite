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
import AddtoCartModal from '../components/ProductListingComponents/products-data-view/AddtoCartModal';
import DealerAddToCartApi from '../services/api/cart-page-api/dealer-add-to-cart-api';
import useProfilePage from '../hooks/GeneralHooks/ProfileHooks/ProfileHooks';
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
  const {  profileList,ageingReport,loading,setLoading,enquiryHistoryPro} = useProfilePage();
  const profileData: any = useSelector(profileData_state);
  console.log('profile partyname', profileData);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);
  const [qty , setQty] = useState<any>(1)
  let isLoggedIn: any;
  let wishproducts: any;
  let requestNew: any;
  let requestList: any;
  let partyName: any;

  if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn');
  }
  const dispatch = useDispatch();

  // const handleAddCart = async () => {
  //   // setAddToCartButtonDisabled(true);
  //   const addCartData = [];
  //   addCartData.push({
  //     item_code: name,
  //     quantity: qty,
  //   });
  //   let AddToCartProductRes: any = await AddToCartApi(
  //     addCartData,
  //     currency_state_from_redux?.selected_currency_value,
  //     TokenFromStore?.token
  //   );
  //   // let token = AddToCartProductRes.data.access_token
  //   console.log('token in guest',AddToCartProductRes.data.access_token)
  //   if (AddToCartProductRes.msg === "success") {
  //     // dispatch(successmsg("Item Added to cart"));
  //     showToast("Item Added to cart", "success");
  //     dispatch(fetchCartListing(TokenFromStore?.token));
  //     console.log("AddToCartProductRes", AddToCartProductRes);
  //     if (AddToCartProductRes?.data?.access_token !== null) {
  //       localStorage.setItem("guest", AddToCartProductRes?.data?.email);
  //       dispatch(updateAccessToken(AddToCartProductRes?.data?.access_token));
  //     }
  //     // setTimeout(() => {
  //     //   dispatch(hideToast());
  //     // }, 1200);
  //     setTimeout(()=>{
  //       handleCloseModalCart();
  //     },2000)
  //   } else {
  //     showToast("Failed to Add to cart", "error");
  //     // dispatch(failmsg("Failed to Add to cart"));
  //     // setTimeout(() => {
  //     //   dispatch(hideToast());
  //     // }, 1500);
  //   }
  // };

  let isDealer: any;
  if (typeof window !== "undefined") {
    isLoggedIn = localStorage.getItem("isLoggedIn");
    isDealer = localStorage.getItem("isDealer");
  }
  const [newobjectState, setnewObjectState] = useState<any>([]);
  const handleAddCart = async () => {
    console.log(
      "add currency",
      currency_state_from_redux?.selected_currency_value
    );

    if (isDealer === "true") {
      let newObjects =
        newobjectState &&
        newobjectState?.filter((newitems: any) => newitems.quantity !== "");
      let dealerApi = await DealerAddToCartApi(newObjects);
      console.log("dealer api res", dealerApi);
      if (dealerApi.msg === "success") {
        // dispatch(successmsg("Item Added to cart"));
        setIsLoading(false);
        showToast("Item Added to cart", "success");
        dispatch(fetchCartListing());
        // setTimeout(() => {
        //   dispatch(hideToast());
        // }, 1200);
      } else {
        showToast("Failed to Add to cart", "error");
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);

        // dispatch(failmsg("Failed to Add to cart"));
        // setTimeout(() => {
        //   dispatch(hideToast());
        // }, 1500);
      }
      // ga.event({
      //   action: "add_to_cart",
      //   params: {
      //     not_set: JSON.stringify(newobjectState),
      //   },
      // });
    } else {
      // console.log(
      //   "add currency in else",
      //   currency_state_from_redux?.selected_currency_value
      // );
      const addCartData = [];
      addCartData.push({
        item_code: name,
        quantity: qty,
      });

      if (profileData?.partyName !== "") {
        if (Object?.keys(profileData?.partyName)?.length > 0) {
          partyName = profileData?.partyName;
        }
      } else {
        partyName = "Guest";
      }

      let AddToCartProductRes: any = await AddToCartApi(
        addCartData,
        currency_state_from_redux?.selected_currency_value,
        TokenFromStore?.token,
        partyName
      );
      console.log('cart@',AddToCartProductRes)
      if (AddToCartProductRes.msg === "success") {
        // dispatch(successmsg("Item Added to cart"));

        showToast("Item Added to cart", "success");
        setIsLoading(true);
        setTimeout(() => {
          // Stop the loader after 2 seconds (adjust the time as needed)
          setIsLoading(false);
          // Add your actual functionality here (e.g., adding to the cart)
          // ...
        }, 2000);

        if (AddToCartProductRes?.data?.access_token !== null) {
          dispatch(updateAccessToken(AddToCartProductRes?.data?.access_token));
          localStorage.setItem(
            "guest",
            AddToCartProductRes?.data?.access_token
          );
          console.log("token api res", AddToCartProductRes);
          if (AddToCartProductRes?.data?.access_token !== null) {
            console.log("token from api");
            dispatch(fetchCartListing(AddToCartProductRes?.data?.access_token));
          }
        } else {
          dispatch(fetchCartListing(TokenFromStore?.token));
        }
        setTimeout(()=>{
                handleCloseModalCart();
              },2000)
        setTimeout(() => {
          dispatch(hideToast());
        }, 1200);
      } else {
        setIsLoading(false);
        showToast("Failed to Add to cart", "error");
        // dispatch(failmsg(AddToCartProductRes?.error));
        // setTimeout(() => {
        //   dispatch(hideToast());
        // }, 1500);
      }
    }
  };
  const handleClose = () => {
    setshow(false);
  };
  const handleShowModalCart = (val: any) => {
    setshow1(true);
  };
  const handleCloseModalCart = () => {
    setshow1(false);
  };
  console.log('currency',currency_state_from_redux?.selected_currency_value)
  return (
    <>
    <div
      key={key}
      className="border p-3 h-100"
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
        <div className="product">
          <div className="product_img product-media mt-2">
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
          <div className="product-content">
            <h4 className="bold product-name truncate-overflow color-black">
              <Link
                href={`${url}?currency=${currency_state_from_redux?.selected_currency_value}`}
              >
                <span className="bold color-black"> {item_name}</span>
              </Link>
            </h4>
            <div className="product-price d-flex color-black">
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
                  onClick={handleShowModalCart}
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
                  onClick={handleShowModalCart}
                >
                 {/* <Link href="/login" className="text-white ">
                  </Link>*/} 
                    <i
                      className="fa fa-shopping-cart d-flex justify-content-center"
                      aria-hidden="true"
                    ></i>
                  {/* {selectedMultiLangData?.add_to_cart} */}
                </button>
              )}
            </div>
          </div>
        </div>
       
     
    </div>  
    <AddtoCartModal
          show={show1}
          toHide={()=>setshow1(false)}
          name={name}
          item_name={item_name}
          handleClose={handleCloseModalCart}
          handleAddCart={handleAddCart}
          // min_order_qty={min_order_qty}
          qty={qty}
          setQty={setQty}
        />  
    </>
  );
};

export default ProductCard;
