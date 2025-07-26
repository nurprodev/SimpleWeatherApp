import { useState } from "react";

const Searchbar = ({ onSearch }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    onSearch(text);
    setText("");
  };

  return (
    <div>
      <form className="bg-gray-50 rounded-md flex">
        <input
          className="border rounded-md outline-none border-r-0 rounded-tr-none rounded-br-none w-full p-2"
          type="text"
          placeholder="Enter your city"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-gray-800 hover:bg-gray-900 transition ease-in-out duration-200 cursor-pointer text-white p-2 rounded-md border-l-0 rounded-tl-none rounded-bl-none"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
