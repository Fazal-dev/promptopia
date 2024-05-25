"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const OwnProfile = ({ params }) => {
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (userId) {
      fetchPosts();
    }
    console.log("test");
  }, [params?.id]);

  return (
    <Profile
      name={"My"}
      desc="Welcome to your personalized profile page"
      data={posts}
    />
  );
};

export default OwnProfile;
