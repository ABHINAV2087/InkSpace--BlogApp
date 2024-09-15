import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import BlogCard from './BlogCard';
import { toast } from 'react-toastify';
import "./blogcard.css"
const BlogsSlider = () => {
  const [blogs, setBlogs] = useState([]);

  const get10latestblogs = () => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/blog`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.ok) {
          console.log(response);
          setBlogs(response.data.blogs);
        } else {
          toast(response.message, {
            type: 'error',
          });
        }
      })
      .catch((error) => {
        toast(error.message, {
          type: 'error',
        });
      });
  };

  useEffect(() => {
    get10latestblogs();
  }, []);

  return (
    <div className='sliderout'>
      <h1>Latest Blogs</h1>
      <Swiper
        slidesPerView={1}
        spaceBetween={200}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          '@0.00': {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          '@0.75': {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          '@1.00': {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          '@1.50': {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {blogs.map((blog, index) => (
          <SwiperSlide key={index}>
            <BlogCard {...blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BlogsSlider;
