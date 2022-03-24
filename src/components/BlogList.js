import { Link } from "react-router-dom";
import "./BlogList.css";
import { useTheme } from "../hooks/useTheme";

import deleteIcon from "../assets/deleteIcon.svg";
import { db } from "../firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

export default function BlogList({ blogs }) {
  const { mode } = useTheme();

  const handleDelete = async (id) => {
    const ref = doc(db, "blogs", id);
    await deleteDoc(ref);
  };

  if (blogs.length === 0) {
    return <div className="error">Aranan yazı bulunamadı</div>;
  }

  return (
    <div className="blog-list">
      {blogs.map((blog) => (
        <div key={blog.id} className={`card ${mode}`}>
          <h3>{blog.title}</h3>
          <p>{blog.readingtime}</p>
          <div>{blog.content.substring(0, 100)}...</div>
          <Link to={`/blog/${blog.id}`}>Daha Fazla Oku</Link>
          <img
            className="delete"
            alt="delete"
            onClick={() => handleDelete(blog.id)}
            src={deleteIcon}
            style={{ filter: mode === "dark" ? "invert(100%)" : "invert(20%)" }}
          />
        </div>
      ))}
    </div>
  );
}
