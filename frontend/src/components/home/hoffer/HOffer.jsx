import './HOffer.scss'
import * as FaIcons from "react-icons/fa6";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as FIcons from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';



const HOffer = () => {

  const [oferty, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:1337/api/oferty?populate=*');
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const getIconComponent = (iconName) => {
    const IconComponent = FaIcons[iconName] || BsIcons[iconName] || MdIcons[iconName] || FIcons[iconName];
    if (IconComponent) {
      return <IconComponent />;
    } else {
      // Jeśli ikona nie jest dostępna, możesz zwrócić ikonę domyślną lub dowolny inny komunikat
      return <div>Icon not found</div>;
    }
  };

  return (
    <> 
        <div className="offer">
          <div className="container">
            <div className="offer-content">
              <div className="offer-title">Nasza oferta</div>
              <div className="offer-items">
              {oferty.map(offer => (
                <div key={offer.id} className="offer-item">
                  <div className="offer-item__icon">{getIconComponent(offer.attributes.Icon)}</div>
                  <div className="offer-item__title">{offer.attributes.Title}</div>
                  <div className="offer-item__text">{offer.attributes.Text}</div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default HOffer
