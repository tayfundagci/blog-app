import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

import { useParams } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

import "./Blog.css";

export default function Blog() {
  const { mode } = useTheme();

  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const ref = doc(db, "blogs", id);

    getDoc(ref).then((doc) => {
      // console.log(doc.data());
      if (doc.exists) {
        setLoading(false);
        setBlog(doc.data());
      } else {
        setLoading(false);
        setError("veriye erişilemedi");
      }
    });
  }, [id]);

  return (
    <div className={`blog ${mode}`}>
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">{loading}</p>}
      {blog && (
        <>
          <h2 className="page-title">{blog.title}</h2>
          <p className="time">{blog.readingtime} okuma süresi</p>
          <ul>
            {blog.categories.map((kat) => (
              <li key={kat}>{kat}</li>
            ))}
          </ul>
          <p className="info">{blog.content}</p>
        </>
      )}
    </div>
  );
}
