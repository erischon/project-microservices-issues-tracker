import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

CommentCreate.propTypes = {
  issueId: PropTypes.string.isRequired,
};

function CommentCreate({ issueId }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post(
      `${import.meta.env.VITE_COMMENTS_API_URL}/issues/${issueId}/comments`,
      {
        content,
      }
    );

    setContent("");
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            <label className="font-semibold">New comment: </label>
            <input
              type="text"
              className="bg-gray-100 rounded-md text-md border border-gray-300 block w-full p-1 my-1"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <button className="px-6 py-2 bg-cyan-800 text-white rounded-md">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default CommentCreate;
