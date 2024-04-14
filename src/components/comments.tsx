"use client";

import { Comments as CommentsProvider } from "@hyvor/hyvor-talk-react";

type CommentsProps = {
  slug: string;
};

export default function Comments({ slug }: CommentsProps) {
  return (
    <div className="pt-12">
      <CommentsProvider website-id={10942} page-id={slug} colors={"os"} />
    </div>
  );
}
