import "./Create.css";
import { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function Create() {
  const { mode } = useTheme();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [readingtime, setReadingTime] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const categorieInput = useRef(null);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const doc = {
      title,
      categories,
      content,
      readingtime: readingtime + " dakika",
    };

    const ref = collection(db, "blogs");

    try {
      await addDoc(ref, {
        ...doc,
      });

      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const newCat = newCategory.trim();

    if (newCat && !categories.includes(newCat)) {
      setCategories((oKat) => [...oKat, newCategory]);
    }
    setNewCategory("");
    categorieInput.current.focus();
  };

  return (
    <div className={`create ${mode}`}>
      <h2 className="page-title">Yeni Yazı</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Yazı Başlık:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Yazı Kategorileri:</span>
          <div className="categories">
            <input
              type="text"
              onChange={(e) => setNewCategory(e.target.value)}
              value={newCategory}
              ref={categorieInput}
            />
            <button onClick={handleAdd} className="btnAdd btn">
              ekle
            </button>
          </div>
        </label>
        <p>
          Kategoriler:
          <span className="list">
            {categories.map((i) => (
              <em key={i}>{i}, </em>
            ))}
          </span>
        </p>

        <label>
          <span>Yazı İçerik:</span>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            value={content}
            rows={5}
            required
          />
        </label>

        <label>
          <span>Okunma Süresi:</span>
          <input
            type="number"
            onChange={(e) => setReadingTime(e.target.value)}
            value={readingtime}
            required
          />
        </label>

        <button className="btn">Oluştur</button>
      </form>
    </div>
  );
}
