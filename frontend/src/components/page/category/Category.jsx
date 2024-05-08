import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Category = () => {
  const { id } = useParams(); // Identyfikator kategorii z URL
  const [category, setCategory] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Pobieramy kategorię i sprawdzamy, czy istnieje
        const categoryResponse = await axios.get(`https://backend-hotel-9bb0a913f779.herokuapp.com/api/categories/${id}`);
        const categoryData = categoryResponse.data.data;

        if (!categoryData) {
          setLoading(false);
          setError(true);
          return;
        }

        // Pobieramy wszystkie blogi i filtrujemy te, które należą do określonej kategorii
        const blogsResponse = await axios.get('https://backend-hotel-9bb0a913f779.herokuapp.com/api/blogs?populate=*');
        const filteredBlogs = blogsResponse.data.data.filter(
          (blog) => blog.attributes.category.data.id === id
        );

        setCategory(categoryData);
        setBlogs(filteredBlogs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]); // Uruchamiamy efekt, gdy id się zmieni

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data.</p>;
  }

  if (!category) {
    return <p>Category not found.</p>;
  }

  return (
    <>
      <div className="category">
        <h2>{category.attributes.Title}</h2>
        <div className="blogs-items">
          {blogs.map((blog) => (
            <a key={blog.id} href={`/blogs/${blog.attributes.slug}`} className="blogs-item">
              <div className="blogs-item__img">
                <img
                  src={blog.attributes.Image.data.attributes.url}
                  alt={blog.attributes.title}
                />
              </div>
              <div className="blogs-item-content">
                <div className="blogs-item__title">{blog.attributes.title}</div>
                <div className="blogs-item__text">{blog.attributes.Desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
