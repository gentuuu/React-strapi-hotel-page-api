import { useEffect, useState } from 'react';
import axios from 'axios';



const RoomsItem = () => {

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
            {pokoje.map(pokoje => (
            <div key={pokoje.id} className="rooms-item">
                <div className="rooms-item__img">
                    <img src={pokoje.attributes.Image.data.attributes.url} alt="" />
                </div>
                <div className="rooms-item-content">
                    <div className="rooms-item__title">{pokoje.attributes.title}</div>
                    <div className="rooms-item__text">{pokoje.attributes.Dsc}</div>
                    <a href={`/pokoje/${pokoje.attributes.slug}`} className="rooms-item__btn">Czytaj więcej</a>
                </div>
                <div className="rooms-item__price">
                    <span>{pokoje.attributes.Price}</span>
                    <p>/ Noc</p>
                </div>
            </div>
            ))}

        </>
    )

}

export default RoomsItem