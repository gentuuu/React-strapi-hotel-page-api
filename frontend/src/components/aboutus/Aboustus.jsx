import HAboutus from "../home/haboutus/HAboutus"
import "./Aboutus.scss"
import Heading_page from "../common/heading/Heading_page"
import { useEffect, useState } from 'react';
import axios from 'axios';





const Aboustus = () => {

    const [pokoje, setPosts] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:1337/api/pokoje?populate=*');
          setPosts(response.data.data);
        } catch (error) {
          console.error('Error fetching data: ', error);
        }
      };
  
      fetchData();
    }, []);

  return (
    <>
        <Heading_page title='O nas' />
        <HAboutus />
        <div className="aboutus">
            <div className="aboutus-title">Nasze pokoje</div>
            <div className="aboutus-items">
                {pokoje.map(pokoje => (
                <a key={pokoje.id} href={`/pokoje/${pokoje.attributes.slug}`} className="aboutus-item">
                    <div className="aboutus-item__img">
                        <img src={pokoje.attributes.Image.data.attributes.url} alt="" />
                    </div>
                    <div className="aboutus-item__content">
                        <div className="aboutus-item__title">{pokoje.attributes.Title}</div>
                        <div className="aboutus-item__price"><span>{pokoje.attributes.Price}</span> / NOC</div>
                    </div>
                </a>
                ))}
            </div>
        </div>
        <div className="aboutus-info">
            <div className="container">
                <div className="aboutus-info-content">
                    <div className="aboutus-info-items">
                        <div className="aboutus-info-item">
                            <div className="aboutus-info-item__number">1502</div>
                            <div className="aboutus-info-item__title">Klientów</div>
                        </div>
                        <div className="aboutus-info-item">
                            <div className="aboutus-info-item__number">1502</div>
                            <div className="aboutus-info-item__title">Klientów</div>
                        </div>
                        <div className="aboutus-info-item">
                            <div className="aboutus-info-item__number">1502</div>
                            <div className="aboutus-info-item__title">Klientów</div>
                        </div>
                        <div className="aboutus-info-item">
                            <div className="aboutus-info-item__number">1502</div>
                            <div className="aboutus-info-item__title">Klientów</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Aboustus
