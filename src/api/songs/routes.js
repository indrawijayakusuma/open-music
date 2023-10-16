const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: (Request, h) => handler.postSongHandler(Request, h),
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: (Request, h) => handler.getSongByIdHandler(Request, h),
  },
  {
    method: 'GET',
    path: '/songs',
    handler: (Request, h) => handler.getSongHandler(Request, h),
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: (Request, h) => handler.putSongByIdHandler(Request, h),
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: (Request, h) => handler.deleteSongByIdHandler(Request, h),
  },
];

module.exports = routes;
