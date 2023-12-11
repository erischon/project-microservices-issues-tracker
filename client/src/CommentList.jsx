import PropTypes from "prop-types";

CommentList.propTypes = {
  comments: PropTypes.arrayOf(Object),
};

export default function CommentList({ comments }) {
  // Render a list of comments
  const renderedComments = comments.map((comment) => {
    return <li key={comment?.id}>- {comment?.content}</li>;
  });

  return (
    <>
      <ul className="list-none grow">{renderedComments}</ul>
    </>
  );
}
