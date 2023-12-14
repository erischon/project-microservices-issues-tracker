import { useState, useEffect } from "react";
import axios from "axios";

import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default function IssueList() {
  const [issues, setIssues] = useState({});

  const fetchIssues = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_QUERIES_API_URL}/issues`
    );

    console.log("Data: ", res.data);

    setIssues(res.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const renderedIssues = Object.values(issues).map((issue) => {
    return (
      <div
        key={issue.id}
        className="flex flex-col p-5 border gap-2 h-full w-full border-slate-600 bg-gray-50 rounded-lg"
      >
        <h3 className="font-semibold text-lg">{issue.title}</h3>

        <CommentList comments={issue.comments} />

        <CommentCreate issueId={issue.id} />
      </div>
    );
  });

  return <div className="grid grid-cols-2 gap-5">{renderedIssues}</div>;
}
