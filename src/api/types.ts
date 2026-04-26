export type ChatMessage = {
  _id: string;
  message: string;
  author: string;
  createdAt: string;
};

export type CreateMessagePayload = {
  message: string;
  author: string;
};
