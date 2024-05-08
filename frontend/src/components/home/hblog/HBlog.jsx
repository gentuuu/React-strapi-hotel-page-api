import './HBlog.scss'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const formatDate = (dateString) => {
  const createdAt = new Date(dateString);
  return `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;
}

const HBlog = () => {

  const [blogs, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-hotel-9bb0a913f779.herokuapp.com/api/blogs?populate=*');
        setPosts(response.data.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  // Sprawdzamy, czy jesteśmy na stronie głównej
  const isHomePage = location.pathname === '/';

  return (
    <>
      <div className="blogs">
        <div className="container">
          <div className="blogs-content">
            <div className="blogs-title">Nasze artykuły</div>
            <div className="blogs-items">
              {isHomePage && blogs.slice(0, 2).map(blog => (
                <Link key={blog.id} href={`/blogs/${blog.attributes.slug}`} className="blogs-item">
                  <div className="blogs-item__img">
                    <img src={blog.attributes.Image.data.attributes.url} alt="" />
                  </div>
                  <div className="blogs-item-content">
                    <div className="blogs-item__title">{blog.attributes.title}</div>
                    <div className="blogs-item__text">{blog.attributes.Desc}</div>
                    <div className="blogs-item__date">{formatDate(blog.attributes.createdAt)}</div>
                  </div>
                </Link>
              ))}
              {!isHomePage && blogs.map(blog => (
                <Link key={blog.id} href={`/blogs/${blog.attributes.slug}`} className="blogs-item">
                  <div className="blogs-item__img">
                    <img src={blog.attributes.Image.data.attributes.url} alt="" />
                  </div>
                  <div className="blogs-item-content">
                    <div className="blogs-item__title">{blog.attributes.title}</div>
                    <div className="blogs-item__text">{blog.attributes.Desc}</div>
                    <div className="blogs-item__date">{formatDate(blog.attributes.createdAt)}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HBlog
