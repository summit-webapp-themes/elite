import Image from 'next/image'
import React from 'react'
import { CONSTANTS } from '../../services/config/app-config';
import categoriesBanner from "../../public/assets/images/category-banner.jpg";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { currency_selector_state } from '../../store/slices/general_slices/multi-currency-slice';

const HomeTopCategoriesBanner4 = ({ homeTopCategories }: any) => {
  console.log("homeTopCategories banner in render", homeTopCategories)
  const currency_state_from_redux: any = useSelector(currency_selector_state);
  const imageLoader = ({ src, width, quality }: any) => {
    return `${CONSTANTS.API_BASE_URL}/${src}?w=${width}&q=${quality || 75}`;
  };
  return (
    <div className='container category_heading'>
      <div className='row'>
{/*        
        {
          homeTopCategories?.length > 0 && homeTopCategories.slice(2).map((categoryBanner: any, index: any) => {
            return (
              <div className='col-lg-12 my-5 text-center' key={index}>
                <Image
                  // loader={imageLoader}
                  src={categoriesBanner}
                  // src={categoryBanner.product_img}
                  width={1300}
                  height={200}
                  alt="img"
                  style={{ height: "385px" }}
                />
              </div>

            )
          })
        } */}
         {
          homeTopCategories?.length > 0 && homeTopCategories.slice(8, 10).map((categoryBanner: any, index: any) => {
            return (
              <div className='col-lg-6' key={index}>
                  <Link href={`/product-category/${categoryBanner?.slug}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}>
                <Image
                  loader={imageLoader}
                  src={categoryBanner.product_img}
                  width={800}
                  height={200}
                  alt="img"
                
                  className='rounded-2 home4-top-banner'
                />
                </Link>
              </div>

            )
          })
        }
                {
          homeTopCategories?.length > 0 && homeTopCategories.slice(5, 8).map((categoryBanner: any, index: any) => {
            return (
              <div className='col-lg-4 mt-3' key={index} >
                <Link href={`/product-category/${categoryBanner?.slug}?page=1&currency=${currency_state_from_redux?.selected_currency_value}`}>
                <Image
                  loader={imageLoader}
                  className='topcategory-homefourth rounded-2 home4-lower-banner'
                  src={categoryBanner.product_img}
                  width={800}
                  height={200}
                  alt="img"
                  
                />
                </Link>
              </div>

            )
          })
        }
      </div>
    </div>
  )
}

export default HomeTopCategoriesBanner4