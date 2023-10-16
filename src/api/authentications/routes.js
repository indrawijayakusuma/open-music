const routes = (handler) => [
    {
        method: 'POST',
        path: '/authentications',
        handler: (request, h) => handler.postAuthenticationHandler(request, h),
    },
    {
        method: 'PUT',
        path: '/authentications',
        handler: (request, h) => handler.putAuthenticationsHandler(request, h),
    },
    {
        method: 'DELETE',
        path: '/authentications',
        handler: (request, h) => handler.deleteAuthenticationsHandler(request, h),
    },
];

module.exports = routes;
