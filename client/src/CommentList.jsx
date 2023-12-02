import PropTypes from "prop-types";

CommentList.propTypes = {
  comments: PropTypes.arrayOf(Object),
};

// Render a list of comments
function CommentList({ comments }) {
  const renderedComments = comments.map((comment) => {
    let content;

    switch (comment?.status) {
      case "approved":
        content = comment?.content;
        break;
      case "pending":
        content = "This comment is awaiting moderation";
        break;
      case "rejected":
        content = "This comment has been rejected";
        break;
      default:
        content = "This comment is awaiting moderation";
    }

    return <li key={comment?.id}>- {content}</li>;
  });

  return (
    <>
      <ul className="list-none grow">{renderedComments}</ul>
    </>
  );
}

export default CommentList;
