import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './blogpage.css';
import ClockLoader from 'react-spinners/ClockLoader';
import BlogsSlider from '../../components/blogCards/BlogSlider';

function Blogpage() {
  // Function to extract blogid from the URL
  const getBlogIdFromUrl = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get('blogid');
  };

  const [loading, setLoading] = useState(false);

  const [blog, setBlog] = useState({
    _id: '',
    title: '',
    description: '',
    imageUrl: '',
    paragraphs: [],
    category: '',
    owner: '',
    createdAt: '',
    updatedAt: '',
  });

  const [blogcreatedat, setBlogcreatedat] = useState('');

  const getBlogbyId = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_API}/blog/${getBlogIdFromUrl()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          setBlog(response.data.blog);
          const formattedDate = formatDate(response.data.blog.createdAt);
          setBlogcreatedat(formattedDate);
        } else {
          toast(response.message, {
            type: 'error',
          });
        }
      })
      .catch((error) => {
        setLoading(false);
        toast(error.message, {
          type: 'error',
        });
      });
  };

  useEffect(() => {
    getBlogbyId();
    window.scrollTo(0, 0);
  }, []);

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August',
      'September', 'October', 'November', 'December',
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    return `${day} ${monthNames[monthIndex]} ${year}`;
  }

  return (
    <div className="blogpage-out">
      {loading && !blog._id ? (
        <div className="loaderfullpage">
          <ClockLoader
            color="#36d7b7"
            loading={loading}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className="blogpage">
          <div className="c1">
            <p className="createdat">Created at {blogcreatedat}</p>
            <p className="title">{blog.title}</p>
            <p className="category">{blog.category}</p>

            {blog.imageUrl && (
              <img
                src={blog.imageUrl}
                alt={blog.title}
                width={100}
                height={100}
                className="blogimg"
                unoptimized
              />
            )}
            <p className="description">{blog.description}</p>
          </div>

          {blog.paragraphs.map((paragraph, index) => (
            <div
              className={index % 2 === 0 ? 'c2left' : 'c2right'}
              key={index}
            >
              {paragraph.imageUrl && (
                <img
                  src={paragraph.imageUrl}
                  alt={paragraph.title}
                  width={100}
                  height={100}
                  className="paraimg"
                  unoptimized
                />
              )}
              <div>
                <p className="title">{paragraph.title}</p>
                <p className="description">{paragraph.description}</p>
              </div>
            </div>
          ))}
          <BlogsSlider />
        </div>
      )}
    </div>
  );
}

export default Blogpage;
