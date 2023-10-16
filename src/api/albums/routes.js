const routes = (handler) => [
  {
    method: 'POST',
    path: '/albums',
    handler: (Request, h) => handler.postAlbumHandler(Request, h),
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: (Request, h) => handler.getAlbumByIdHandler(Request, h),
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: (Request, h) => handler.putAlbumByIdHandler(Request, h),
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: (Request, h) => handler.deleteAlbumByIdHandler(Request, h),
  },
];

module.exports = routes;
