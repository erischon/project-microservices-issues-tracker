import { useState } from "react";
import axios from "axios";

export default function IssueCreate() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`${import.meta.env.VITE_ISSUES_API_URL}/issues`, {
      title,
    });

    setTitle("");
  };

  return (
    <>
      <form
        className="flex flex-col w-full my-4 mx-auto"
        onSubmit={handleSubmit}
      >
        <label className="text-sm font-semibold">Issue Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-gray-100 rounded-md text-md border border-gray-300 block w-full p-1 my-1"
        />

        <button className="px-6 py-2 bg-cyan-800 text-white rounded-md w-full my-4 font-semibold">
          Submit
        </button>
      </form>
    </>
  );
}
