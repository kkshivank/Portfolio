// src/pages/BlogPage.jsx
import React from "react";
import { useEffect, useState } from "react";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";
import remarkGfm from "remark-gfm";



export default function BlogPage({onNavigateToServices, onNavigateHome}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const importPosts = async () => {
      const files = import.meta.glob("../blogs/*.md", { query: "?raw" });
      const loadedPosts = [];

      for (const path in files) {
        const content = await files[path]();
        const parsed = matter(content.default);
        loadedPosts.push({
          slug: path.split("/").pop().replace(".md", ""),
          ...parsed.data,
          content: parsed.content,
        });
      }

      setPosts(loadedPosts);
    };

    importPosts();
  }, []);

  return (
    <>
      <Navbar onNavigateHome={onNavigateHome} onNavigateToServices={onNavigateToServices}/>
      <div className="bg-background min-h-screen pt-[80px] px-4">
        <div className="max-w-3xl mx-auto space-y-8">
          {posts.map((post) => (
            <div
              key={post.slug}
              className="bg-[#1B263B] rounded-lg shadow-md p-6 text-primary border border-[#415A77]"
            >
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-sm text-cyan-300 mb-4">
                {new Date(post.date).toLocaleDateString()}
              </p>
              <div  className="prose dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
