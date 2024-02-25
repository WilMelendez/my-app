'use client'
import { useEffect, useState } from 'react';
import Post from './Post';

interface InstagramPost {
  id: string;
  media_url: string;
  caption?: string; 
}

const InstagramFeed = () => {
  const token = "IGQWRNSkljT2hHTmljTTNMUUdPTzA1cVBGQ2RfM0lmaFV5NFkyQjBTaU9xanJaSXdEMjZAfMjJvc2FmeHYwYkJza2M2a3ZAKdFVWM2lwUDdteDFHa1JUaDZA5SUc2ZAW1ocVg2cjAtcWx4X05DRmdhWnNpRmlHbXp4R2sZD";  

  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${token}`);
        const data = await response.json();
        if (data.data.length > 0) {
          setPosts(data.data);
        } else {
          setError('No hay contenido disponible.');
        }
      } catch (error) {
        console.error('Error al obtener publicaciones de Instagram:', error);
        setError("Error al cargar el contenido. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  return (
    <div className="text-gray-100 rounded-lg shadow-md mb-4 p-4">
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {posts.map((post) => (
        <div key={post.id} className="mb-6">
          <div className="flex items-center mb-2">
            <img src={post.media_url} alt="User Avatar" className="w-10 h-10 rounded-full mr-2" />
            <div>
              <h3 className="font-semibold">Nombre de Usuario</h3>
              <p className="">Fecha de publicación</p>
            </div>
          </div>
          <img src={post.media_url} alt={post.caption} className="w-full h-100 object-cover mb-2 rounded-lg" />
          <div className="flex items-center mb-2">
            <img src={post.media_url} alt="User Avatar" className="w-8 h-8 rounded-full mr-2" />
            <Post title="" content="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;



