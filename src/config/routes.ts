export const DEFAULT = {
  routes: () => {
    return {
      get: [
        { path: "/board", action: "boardList" },
        { path: "/board/:board_no", action: "boardList" },
        { path: "/comment", action: "commentList" },
        { path: "/comment/:comment_no", action: "commentList" },
      ],

      post: [
        { path: '/board', action: 'createBoard' },
        { path: '/comment', action: 'createComment' }
      ],

      delete: [
        { path: '/board', action: 'deleteBoard' }
      ],

      put: [
        { path: '/board', action: 'updateBoard' }
      ]
    };
  },
};
