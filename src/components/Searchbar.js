import { useState } from "react";
import { useHistory } from "react-router-dom";

import "./Searchbar.css";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    history.push(`/search?q=${search}`);
    setSearch(" ");
  };

  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Aranacak Kelime"
          id="search"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          required
        />
      </form>
    </div>
  );
}
