import Image from "next/image";
import { CONSTANTS } from "../../../../services/config/app-config";
import useMultiLingual from "../../../../hooks/LanguageHook/multilingual-hook";

const CustomerVariants = ({
  productDetailData,
  productVariants,
  selectedVariant,
  thumbnailOfVariants,
  handleVariantSelect,
  doesSelectedVariantDoesNotExists,
  stockDoesNotExistsForSelectedVariants,
  selectedMultiLangData
}: any) => {

  const myLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}${src}?w=${width}&q=${quality || 75}`;
  };
  console.log('variant@', selectedVariant);
  const showThumbnailOnBtn = (attr: any) => {
    return (
      <>
        {attr?.values?.map((attribute_value: string, index: number) => {
          // Find the corresponding thumbnail for the attribute_value
          const matchingThumbnail = productDetailData?.thumbnail_images.find(
            (img: any) =>
              img?.field_name === attr?.field_name &&
              img?.Colour === attribute_value
          );
          console.log('variant attr', attribute_value, attr?.field_name, matchingThumbnail)
          return (
            <button
              type="button"
              className={`btn mb-3 btn_thumb_size mx-3 rounded p-1 ${attribute_value === selectedVariant[attr?.field_name]
                ? "active_color"
                : ""
                }`}
              onClick={() =>
                handleVariantSelect(attr.field_name, attribute_value)
              }
              key={index} // Using unique index as the key for React
              value={attribute_value}
            >
              {
                attr?.display_thumbnail ? (
                  <>
                    {matchingThumbnail ? (
                      <Image
                        loader={myLoader} // Assuming 'myLoader' is defined elsewhere
                        src={matchingThumbnail.image}
                        alt={`variant image for ${attribute_value}`}
                        className="img-fluid"
                        width={50}
                        height={50}
                      />
                    ) : (
                      <span>No Image</span> // Fallback if no matching thumbnail is found
                    )}
                  </>
                ) : (
                  <>
                    {attribute_value}
                  </>
                )
              }

              {/* Display the attribute value as text */}

            </button>
          );
        })}
      </>
    );
  };

  return (
    <div className="size_btn_block">
      <div>
        {productDetailData?.attributes?.length > 0 &&
          productDetailData?.attributes?.map((attribute: any, index: number) => {
            return (
              <>
                <div>
                  <h6 className="product_feature_heading">
                    {attribute?.label}:
                    <span className="product_feature_heading_span">
                      {" "}
                      {selectedVariant[attribute.field_name]}
                    </span>{" "}
                  </h6>
                </div>

                <div className="d-flex flex-wrap">
                  {attribute?.display_thumbnail ? (
                    showThumbnailOnBtn(attribute)
                  ) : (
                    <>
                      {attribute?.values?.map(
                        (attribute_value: string, index: number) => {
                          return (
                            <>
                              <button
                                type="button"
                                className={`btn mb-3 btn_size mx-2 py-3 rounded
                                 ${attribute_value === selectedVariant[attribute?.field_name]
                                    ? "active_color"
                                    : ""
                                  }
                                `}
                                onClick={() =>
                                  handleVariantSelect(
                                    attribute.field_name,
                                    attribute_value
                                  )
                                }
                                value={attribute_value}
                                key={index}
                              >
                                {attribute_value}
                              </button>
                            </>
                          );
                        }
                      )}
                    </>
                  )}
                </div>
              </>
            );
          })}
      </div>
      {doesSelectedVariantDoesNotExists && (
        <p style={{ color: "red" }}>{selectedMultiLangData?.currently_unavailable}</p>
      )}
      {/* {productDetailData.in_stock_status === false && (
        <p style={{ color: "red" }}>{selectedMultiLangData?.item_out_of_stock}</p>
      )} */}
    </div>
  );
};

export default CustomerVariants;
