export interface Notification {
    type: "like-post" | "comment" | "response" | "follow";
    blogName: string;
    link?: string;
    title: string;
    body: string;
    id: string;
    redirectSlug: string;
  }