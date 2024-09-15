import React from 'react'
import './CategoryCard.css'

const CategoryCard = ({ name, bgcolor, path }) => {
    return (
        <div className='cardContainer'>
            <div className='categorycard'>
                <p style={{
                    fontSize: "18px"
                }}>
                    {name}
                </p>
            </div>
        </div>
    );
}

export default CategoryCard