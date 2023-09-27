import CardsLoadingLayout from "../../../cards/CardsLoadingLayout";
import ProductCard from "../../../cards/product-card";
import { ProductsViewProps } from "../../../interfaces/products-view-interface";
import styles from "../../../styles/Product_Listing.module.css";
import { Norecord } from "../../NoRecord";
import Topbar from "../Topbar";
import ReactPaginate from "react-paginate";
import { CONSTANTS } from "../../../services/config/app-config";
import { useState } from "react";

const ProductsGridView = (props: ProductsViewProps) => {
  const {
    loading,
    listItems,
    filtersData,
    productListTotalCount,
    handleLoadMore,
    wishlistData,
    currency_state_from_redux,
    handlePaginationBtn,
    selectLangData,
  } = props;

  // console.log("cube in card", listItems);

  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageOffset, setpageOffset] = useState<number>(0);
  const usersPerPage: number = 12;
  const pagesVisited = pageNumber * usersPerPage;

  const pageCount: any = Math.ceil(productListTotalCount / 12);
  // pageCount={Math.ceil( productListTotalCount/ 12)}
  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  const handlePageClick = (event: any) => {
    // console.log("page number", event?.selected);
    handlePaginationBtn(event?.selected);
    setpageOffset(event?.selected);
  };
  const NextBtnDisabled: any = productListTotalCount > listItems?.length;
  return (
    <div
      className={`${filtersData && filtersData?.length > 0 ? "col-lg-9" : "col-lg-12"
        }`}
    >
      <div className="row product-mg-r"  >
        {loading ? (
          <div className="row justify-content-center">
            {[...Array(10)].map(() => (
              <>
                <div className="col-lg-2 mx-3">
                  <CardsLoadingLayout />
                </div>
              </>
            ))}
          </div>
        ) : listItems.length > 0 ? (
          listItems?.map((items: any, index: number) => (
            <div className="col-md-3 col-lg-3 mt-2 my-0 mb-3" key={index}>
              <ProductCard
                key={index}
                name={items?.name}
                item_name={items?.item_name}
                item_slug={items?.product_slug}
                currency_symbol={items?.currency_symbol}
                price={items?.price}
                mrp_price={items?.mrp_price}
                img_url={items?.image_url}
                in_stock_status={items?.in_stock_status}
                url={items?.url}
                brand={items?.brand}
                brand_img={items?.brand_img}
                display_tag={items?.display_tag}
                star_rating={items?.rating}
                wishlistData={wishlistData}
                currency_state_from_redux={currency_state_from_redux}
                selectLangData={selectLangData}
              />
            </div>
          ))
        ) : (
          <Norecord
            heading={selectLangData?.product_not_found}
            content={selectLangData?.product_not_found_s}
            selectLangData={selectLangData}
          />
        )}
      </div>
      {CONSTANTS.ENABLE_PAGINATION
        ? productListTotalCount > listItems?.length && (
          <div>
            <ReactPaginate
              previousLabel={selectLangData?.prev}
              nextLabel={selectLangData?.next}
              pageCount={pageCount}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={NextBtnDisabled ? "paginationDisabled" : ""}
              activeClassName={"paginationActive"}
              forcePage={pageOffset}
            />
          </div>
        )
        : ""}

      {CONSTANTS.ENABLE_LOAD_MORE
        ? productListTotalCount > listItems?.length && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <button
              className="btn btn-primary button_color my-5 "
              onClick={handleLoadMore}
            >
              {selectLangData?.load_more}
            </button>
          </div>
        )
        : ""}
    </div>
  );
};

export default ProductsGridView;
