import React from 'react'
import Homeslider from '../../components/homeSlider/Homeslider'
import CategorySlider from '../../components/catgoriesSlider/CategorySlider'
import BlogSlider from '../../components/blogCards/BlogSlider'

function Home() {
  return (
    <>
    <Homeslider />
    <CategorySlider />
    <BlogSlider />
    </>
  )
}

export default Home