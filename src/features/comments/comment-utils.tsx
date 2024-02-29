export const COMMENT_SELECT = {
  id: true,
  message: true,
  createdAt: true,
  postId: true,
  userId: true,
  post: {
    select: {
      id: true,
      title: true,
    },
  },
  user: {
    select: {
      image: true,
      name: true,
    },
  },
};
