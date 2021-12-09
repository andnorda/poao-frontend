import { RequestHandler } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { logger } from '../utils/logger';
import { Proxy } from '../config/proxy-config';

export const proxyRoute = (proxyContextPath: string, proxy: Proxy): RequestHandler => {
	return createProxyMiddleware(proxyContextPath, {
		target: proxy.toUrl,
		logLevel: 'debug',
		logProvider: () => logger,
		changeOrigin: true,
		pathRewrite: proxy.preserveFromPath
			? undefined
			: { [`^${proxyContextPath}`]: '' },
		onError: (error, _request, _response) => {
			logger.error(`onError, error=${error.message}`);
		},
	})
};
