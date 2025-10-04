import { useState, memo } from "react";
import moment from "moment";
import pic from "../assets/UserProfilePic.png";
import { BACKEND_URL } from "../utils/constants";

const Comment = memo(({ comment, addComment , likeComment}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;
    addComment(replyText, comment.id);
    setReplyText("");
    setShowReplyForm(false);
  };
  

  return (
    <div style={{ marginLeft: comment.parentId ? 20 : 0, border: "1px solid #ccc", padding: "5px", marginTop: "5px" , width:"95%"}}>
     <div style={{display: "flex", alignItems: "center", gap: "10px"}}>
     
     <img style={{ width: "40px", height: "40px", borderRadius: "50%" }} src={pic}></img> 
     <p style={{ margin: 0, fontWeight: "bold" }}>{comment.author}</p>
     <div>{moment(comment.timestamp).fromNow()}</div>

     </div>
      <button onClick={() => setShowReplyForm(!showReplyForm)}>
        {showReplyForm ? "Cancel" : "Reply"}
      </button>

      {showReplyForm && (
        <div>
          <textarea
            rows={3}
            cols={40}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <br />
          <button onClick={handleReplySubmit}>Submit Reply</button>
        </div>
      )}

      <p>{comment.text}</p>
<p>Likes: {comment.likes || 0}</p>
<button onClick={() => likeComment(comment.id)}>Like</button>


      {comment.children?.map((child) => (
        <Comment key={child.id} comment={child} addComment={addComment} likeComment={likeComment} />
      ))}
    </div>
  );
});

export default Comment;
