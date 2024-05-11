/* eslint-disable react/jsx-key */
import "./Roompage.scss"
import Heading_page from "../../common/heading/Heading_page"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';





const Roompage = () => {

    const [pokoje, setPost] = useState(null);
    const { slug } = useParams();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:1337/api/pokoje?filters[slug]=${slug}&populate=*`);
          setPost(response.data.data[0]);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
      fetchData();
    }, [slug]);
  
    if (!pokoje) {
      return <div>Loading...</div>;
    }


    return (
    <>
        <Heading_page title={pokoje.attributes.title} image={pokoje.attributes.Image.data.attributes.url} />
        <div className="page-room">
            <div className="container">
                <div className="page-room-content">
                    <div className="page-room-title">{pokoje.attributes.title}</div>
                    <div className="page-room-text">{pokoje.attributes.Text}</div>
                </div>
                <div className="page-room-gallery">
            

               
                <Swiper
                     slidesPerView={3}
                     spaceBetween={50}
                     pagination={{
                       clickable: true,
                     }}
                    modules={[Pagination]}
                    className="mySwiper"
                >

                    {pokoje.attributes.Gallery.data.map((photo) => (
                        <SwiperSlide>
                            <img key={photo.id} src={photo.attributes.url} />
                        </SwiperSlide>
                    ))}

                </Swiper>
                </div>
            </div>
        </div>
    </>
  )
}

export default Roompage