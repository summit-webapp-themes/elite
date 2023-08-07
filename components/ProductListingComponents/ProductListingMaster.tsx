import Image from "next/image";
import useProductListing from "../../hooks/product-listing-hooks/product-listing-hook";
import { CONSTANTS } from "../../services/config/app-config";
import Topbar from "./Topbar";
import WebFilters from "./filters-view/web-filters-view";
import ProductsGridView from "./products-data-view/products-grid-view";
import ProductsListView from "./products-data-view/products-list-view";
import useWishlist from "../../hooks/WishListHooks/WishListHooks";
import BreadCrumbs from "../ProductDetailComponents/ProductDetails/BreadCrumbs";
import MobileFilter from "./filters-view/MobileFilter";
import ReactPaginate from "react-paginate";
import { useState } from "react";
const ProductListingMaster = () => {
  const {
    productsLoading,
    productListingData,
    productListTotalCount,
    filtersLoading,
    filtersData,
    selectedFilters,
    handleApplyFilters,
    toggleProductListView,
    handleToggleProductsListingView,
    handleLoadMore,
    currency_state_from_redux,
    handlePaginationBtn 
  } = useProductListing();
  console.log("cube ", productListTotalCount);
  const { wishlistData } = useWishlist();
  const [pageOffset, setpageOffset] = useState(0);
  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };

  const handleDisplayOfProductsList = () => {
   return (
          <ProductsGridView
            currency_state_from_redux={currency_state_from_redux}
            loading={productsLoading}
            listItems={productListingData}
            filtersData={filtersData}
            productListTotalCount={productListTotalCount}
            handleLoadMore={handleLoadMore}
            wishlistData={wishlistData}
            handlePaginationBtn ={ handlePaginationBtn }
          />
   )
  };

  console.log("filters product listing in master", filtersData);
  return (
    <>
      <div>
        <section className="listing-page mt-3">
          <div className="container">
            <div className="mt-3">
            </div>
            <BreadCrumbs />
            <div className="row mt-2 ">
              <span className="col-lg-3 handle_display_web_filter">
                <WebFilters
                  filtersData={filtersData}
                  loading={filtersLoading}
                  selectedFilters={selectedFilters}
                  handleApplyFilters={handleApplyFilters}
                  productListingData={productListingData}
                />
              </span>
              {handleDisplayOfProductsList()}
            </div>
          </div>
        </section>
      </div>

      <div className="handle_display_mob_filter">
        <MobileFilter
          filtersData={filtersData}
          loading={filtersLoading}
          selectedFilters={selectedFilters}
          handleApplyFilters={handleApplyFilters}
        />
      </div>
    </>
  );
};

export default ProductListingMaster;
