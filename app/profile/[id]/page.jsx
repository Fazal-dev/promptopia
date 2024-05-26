"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const OwnProfile = () => {
  const [posts, setPosts] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id === null || id === undefined) {
      console.log("id is null or undefined");
      return;
    }

    console.log("Fetched id:", id);
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (id) {
      fetchPosts();
    }
  }, [id]);

  return (
    <Profile
      name={"My"}
      desc="Welcome to your personalized profile page"
      data={posts}
    />
  );
};

export default OwnProfile;
