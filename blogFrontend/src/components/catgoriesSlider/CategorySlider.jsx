import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/mousewheel'; // Import mousewheel styles
import './CategoryCard.css';

// import required modules
import { Pagination, Mousewheel } from 'swiper/modules'; // Import Mousewheel module
import CategoryCard from './CategoryCard';

function CategorySlider() {

    const [categories, setCategories] = useState([])

    const getCategories = () => {
        fetch(`${import.meta.env.VITE_BACKEND_API}/blogcategories`)
          .then((res) => res.json())
          .then(async (response) => {
            const tempcat = await Promise.all(
              response.categories.map(async (category) => ({
                name: category,
                path: category,
                bgcolor: 'black', // Modify if you have a function like 'generate' to generate bg colors
              }))
            );
            setCategories(tempcat);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      useEffect(() => {
        getCategories();
      }, []);
    

    return (
        
        
        <div className='sliderout'>
        <h1>Categories</h1>
        <Swiper
            slidesPerView={1}
            spaceBetween={70}
            pagination={{
                clickable: true,
            }}
            mousewheel={true} // Enable mousewheel scrolling
            breakpoints={{
                '@0.00': {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                '@0.75': {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                '@1.00': {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                '@1.50': {
                    slidesPerView: 5,
                    spaceBetween: 50,
                },
            }}
            modules={[Pagination, Mousewheel]} // Include the Mousewheel module
            className="mySwiper "
        >
            
            {
                categories.map((category, index) => {
                    return (
                        <SwiperSlide key={index} >
                            <CategoryCard {...category} />
                        </SwiperSlide>
                    );
                })
            }

        </Swiper>
        </div>
    )
}

export default CategorySlider;
