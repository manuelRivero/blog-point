export interface Notification {
    type: "like-post" | "comment" | "response";
    blogName: string;
    link?: string;
    title: string;
    body: string;
    id: string;
    blogSlug: string;
  }