import { useState, useEffect } from 'react';
import axios from 'axios';
import Heading_page from '../../common/heading/Heading_page';
import './Post.scss';
import { FaRegClock } from 'react-icons/fa6';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { slug } = useParams(); // Pobieramy slug z parametrów URL
  const [blog, setBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogResponse, categoryResponse, blogsResponse] = await Promise.all([
          axios.get(`http://localhost:1337/api/blogs?filters[slug][$eq]=${slug}&populate=*`), // Pobieramy po slug
          axios.get('http://localhost:1337/api/categories'),
          axios.get('http://localhost:1337/api/blogs?populate=*'),
        ]);

        const blogData = blogResponse.data.data.length > 0 ? blogResponse.data.data[0] : null;

        setBlog(blogData); // Ustawiamy blog tylko wtedy, gdy znaleziono wpis
        setCategories(categoryResponse.data.data);
        setBlogs(blogsResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // Upewniamy się, że useEffect uruchomi się, gdy slug się zmieni

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data...</p>;
  }

  if (!blog) {
    return <p>Blog not found</p>; // Jeśli nie znaleziono blogu, wyświetlamy odpowiedni komunikat
  }

  const createdAt = new Date(blog.attributes.createdAt);
  const formattedDate = `${createdAt.getDate()}-${createdAt.getMonth() + 1}-${createdAt.getFullYear()}`;

  return (
    <>
      <Heading_page
        title={blog.attributes.title}
        image={blog.attributes.Image.data.attributes.url}
      />
      <div className="post">
        <div className="container">
          <div className="post-row">
            <div className="post-content">
              <div className="post-title"><h1>{blog.attributes.title}</h1></div>
              <div className="post-details">
                <div className="post-details-category">{blog.attributes.category.data.attributes.Title}</div>
                <div className="post-details-date">
                  <span><FaRegClock /></span>{formattedDate}
                </div>
                <div className="post-details-user">BY <span>{blog.attributes.Author}</span></div>
              </div>
              <div className="post-text">
                {blog.attributes.Text}
              </div>
            </div>
            <div className="post-sidebar">
              <div className="sidebar-item">
                <div className="sidebar-title">Kategorie</div>
                <div className="sidebar-content">
                  <ul>
                    {categories.map((category) => (
                      <li key={category.id}>
                        <a href={`/categories/${category.id}`}>{category.attributes.Title}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="sidebar-item">
                <div className="sidebar-title">Blog</div>
                <div className="sidebar-content">
                  {blogs.map((blog) => (
                    <a key={blog.id} href={`/blogs/${blog.attributes.slug}`} className="sidebar-post-item">
                      <div className="sidebar-post-item__img">
                        <img
                          src={blog.attributes.Image.data.attributes.url}
                          alt={blog.attributes.title}
                        />
                      </div>
                      <div className="sidebar-post-item__title">{blog.attributes.title}</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
