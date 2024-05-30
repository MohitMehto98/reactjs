import React, { useState, useEffect } from "react";
import services from "../appwrite/dbConfig";
import { Container, PostCard } from "../components";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    services.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCard key={post.$id} post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
