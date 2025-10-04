import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils/constants";
import Comment from "./Comment";

const CommentsPage = ()=>{
    const [allComments,setAllComments] = useState([]);
    const [isLoading,setIsLoading] = useState(true);

    useEffect(()=>{
        const getUser = async()=>{
            const object = await axios.get(`${BACKEND_URL}/comments`);
            setIsLoading(false);
            setAllComments(object.data);
        }
        getUser();
    },[])

    const addComment = async(text,parentId = null)=>{
        try{
            const object = await axios.post(`${BACKEND_URL}/comments`,{text,parentId},{
                headers: {
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            const comment = object.data;
            updateComments(comment);
        }catch{
            alert("Login First")
        }
        // console.log(comment);
    }
    
    const updateComments = (newComment)=>{
        if(!newComment.parentId){
            setAllComments([...allComments,{...newComment, children:[]}])
        }
        else{
            const handle = (list)=>{
                return list.map(comment=>{
                    if(comment.id === newComment.parentId){
                        return {
                            ...comment, children:[...comment.children, {...newComment, children:[]} ]
                        }
                    }
                    else{
                        return {...comment, children: handle(comment.children)}
                    }
                })
            }

            setAllComments(prev=>handle(prev))
        }
    }

    const likeComment = async (id) => {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/comments/${id}/like`, 
          {},
          { withCredentials: true } 
        );
    
        const updatedComment = res.data;
        
        setAllComments((prevComments) => {
          const updateLikes = (list) =>
            list.map((comment) => {
              if (comment.id === updatedComment.id) {
                return { ...comment, likes: updatedComment.likes };
              } else if (comment.children?.length) {
                return { ...comment, children: updateLikes(comment.children) };
              } else {
                return comment;
              }
            });
          return updateLikes(prevComments);
        });
      } catch (err) {
        console.error("Failed to like comment", err);
      }
    };


    const [text,setText] = useState("")
    const handleInput = (e) => { setText(e.target.value)}

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!text.trim()) return;
        addComment(text);
        setText("")
    }

    return (
    <>
        <h2>Add Your Comments</h2>
        <textarea rows={5} cols={50} 
            placeholder="Add a comment"
            onChange={handleInput}
            value = {text}
        />
        <br></br>
        <button type="submit" onClick={handleSubmit}> Comment</button>
        <br></br>

        {isLoading ? <p>Loading Page...</p>:<></>}
        {allComments.length === 0 ? (
      <p>No comments yet</p>
    ) : (
      allComments.map((comment) => (
        <Comment key={comment.id} comment={comment} addComment={addComment} likeComment={likeComment} />
      ))
    )}
    </>
)
}
export default CommentsPage;