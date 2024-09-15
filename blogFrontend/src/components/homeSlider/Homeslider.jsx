import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import "./homeslider.css"
import { toast } from 'react-toastify';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// Import required modules
import { Pagination, Navigation } from 'swiper/modules';
const width = window.innerWidth / 2;
const height = window.innerHeight / 2;
function Homeslider() {

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
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
                clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            

            {
                blogs.length > 0 &&

                blogs.map((blog) => {
                    return (
                        <SwiperSlide>
                            <div className="image-container">
                                <img
                                    src={blog.imageUrl}
                                    alt=""
                                    width={width}
                                    height={height}
                                    style={{
                                        objectFit: "cover",
                                        borderRadius:"40px"
                                    }}
                                />
                            </div>
                        </SwiperSlide>

                    )
                })
            }
        </Swiper>
    );
}

export default Homeslider;
