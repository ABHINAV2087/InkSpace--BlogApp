import React from 'react';
import './BlogCard.css';

const BlogCard = ({ title, imageUrl, _id }) => {
  return (
    <div
      className='blogcard'
      onClick={() => {
        window.location.href = `/pages/blogpage?blogid=${_id}`;
      }}
    >
      <div
        className='blogimg'
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></div>
      <p>{title}</p>
    </div>
  );
};

export default BlogCard;
