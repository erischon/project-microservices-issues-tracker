import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

CommentList.propTypes = {
  issueId: PropTypes.string.isRequired,
};

export default function CommentList({ issueId }) {
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_COMMENTS_API_URL}/issues/${issueId}/comments`
    );

    setComments(res.data);
  };

  useEffect(() => {
    fetchComments();
  });

  const renderedComments = comments.map((comment) => {
    return (
      <li key={comment?.id} className="list-disc">
        {comment?.content}
      </li>
    );
  });

  return (
    <>
      <div>
        <ul>{renderedComments}</ul>
      </div>
    </>
  );
}
