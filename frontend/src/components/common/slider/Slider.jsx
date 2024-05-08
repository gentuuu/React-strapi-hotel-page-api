/* eslint-disable react/jsx-key */
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './Slider.scss';

import { Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';
import axios from 'axios';



function Slider() {

  const [sliders, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-hotel-9bb0a913f779.herokuapp.com/api/sliders?populate=*');
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <Swiper
      direction={'vertical'}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {sliders.map(slider => (
      <SwiperSlide>
        <div key={slider.id} className="swiper-slide-row">
          <div className="swiper-slide-img">
            <img src={slider.attributes.Image.data.attributes.url} alt="" />
          </div>
          <div className="swiper-slide-content">
            <div className="swiper-slide-text">{slider.attributes.Title}</div>
            <div className="swiper-slide-title">{slider.attributes.Text}</div>
            <a href={slider.attributes.Link} className="swiper-slide-button">Czytaj dalej</a>
          </div>
        </div>
      </SwiperSlide>
      ))}
    </Swiper>
  </>
  )
}

export default Slider
