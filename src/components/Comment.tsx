import React from "react";

interface CommentProps {
  comment: {
    id: number;
    body: string;
    likes: number;
    dislikes: number;
    user: {
      username: string;
      id: number;
    };
  };
}

export const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div>
      Testing
      {comment.id}
      {comment.body}
      {comment.likes}
      {comment.dislikes}
      {comment.user.username}
      {comment.user.id}
    </div>
  );
};
