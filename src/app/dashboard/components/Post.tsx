import { useState } from 'react';
import Image from 'next/image';

const Post = ({ title, content }) => {
  const [reactions, setReactions] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleReaction = () => {
    setReactions(reactions + 1);
    setIsLiked(true);
    setTimeout(() => setIsLiked(false), 1000);
  };

  const handleSubmitComment = () => {
    if (newComment.trim() !== '') {
      setComments(prevComments => [...prevComments, newComment]);
      setNewComment('');
    }
  };

  const handleDeleteComment = (index) => {
    setComments(prevComments => prevComments.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmitComment();
  };

  const toggleComments = () => setShowComments(!showComments);

  return (
    <div className="p-4 border border-gray-800 rounded-md shadow-md mb-4 w-full bg-gray-900">
      <h2 className="text-lg font-bold mb-2 text-white">{title}</h2>
      <p className="text-gray-400 mb-4">{content}</p>
      <div className="flex items-center justify-between mb-4">
        <button className={`flex items-center space-x-1 text-gray-400 focus:outline-none ${isLiked ? 'text-red-500' : ''}`} onClick={handleReaction}>
          <Image src={isLiked ? "/like-filled.png" : "/like.png"} alt="Icono de Me Gusta" width={20} height={20} className="p-1" />
          <span className="text-white text-sm">{reactions}</span>
        </button>
      </div>
      {showComments && (
        <div>
          <ul className="mt-2">
            {comments.map((comment, index) => (
              <li key={index} className="text-gray-300 flex items-center justify-between">
                <span className="mr-2">{comment}</span>
                <button onClick={() => handleDeleteComment(index)} className="text-red-500">
                  ❌
                </button>
              </li>
            ))}
          </ul>
          <input
            className="w-full h-8 border border-gray-600 rounded-md p-2 mt-4 text-black"
            placeholder="Añadir un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
      )}
      <button className="mt-4 text-blue-400 text-sm" onClick={toggleComments}>
        {showComments ? 'Ocultar Comentarios' : 'Mostrar Comentarios'}
      </button>
    </div>
  );
};

export default Post;




