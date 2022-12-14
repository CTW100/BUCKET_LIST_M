const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'https://bucket-list-api.run.goorm.io',
			changeOrigin: true,
		})
	);
};
