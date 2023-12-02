import { useState, useEffect } from "react";
import axios from "axios";

import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

const QUERY_SERVICE_URL = "http://localhost:4002/posts";

export default function IssueList() {
  const [posts, setPosts] = useState({});

  // Retrieve all posts from the server
  const fetchPosts = async () => {
    const res = await axios.get(QUERY_SERVICE_URL);

    setPosts(res.data);
  };

  // Call fetchPosts() when the component is first rendered
  useEffect(() => {
    fetchPosts();
  }, []);

  // Render a list of posts
  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        key={post.id}
        className="flex flex-col p-2 border gap-2 h-full w-full border-slate-600 bg-gray-50"
      >
        <h3 className="font-semibold text-lg">{post.title}</h3>

        <CommentList comments={post.comments} />

        <CommentCreate postId={post.id} />
      </div>
    );
  });

  return <div className="grid grid-cols-3 gap-2">{renderedPosts}</div>;
}
