import type { Metadata } from "next";
import PostForm from "@/components/admin/PostForm";

export const metadata: Metadata = {
  title: "New Post — Admin",
  robots: { index: false, follow: false },
};

export default function NewPostPage() {
  return (
    <div>
      <h1>New Post</h1>
      <PostForm />
    </div>
  );
}
