import { useState, useEffect } from "react";
import "./Home.css";
import BlogList from "../../components/BlogList";

import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const ref = collection(db, "blogs");
    getDocs(ref)
      .then((snap) => {
        //console.log(snap);
        if (snap.empty) {
          setError("Bir hata oluştu");
          setLoading(false);
        } else {
          let results = [];

          snap.forEach((doc) => {
            results.push({ id: doc.id, ...doc.data() });
          });

          setData(results);
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading...</p>}

      {data && <BlogList blogs={data} />}
    </div>
  );
}
