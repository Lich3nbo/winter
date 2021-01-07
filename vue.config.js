module.exports = {
	devServer: {
		open: false, // 是否自动打开浏览器页面
		port: 8080, // 端口地址
		https: false, // 使用https提供服务
		progress: true,
		// string | Object 代理设置
		proxy: {
			"/vote": {
				"target": "https://app.v2gogo.com",
				"changeOrigin": true,
				"secure": false
			},
			"/tv": {
				"target": "https://app.v2gogo.com",
				"changeOrigin": true,
				"secure": false
			},
		},
	}
}