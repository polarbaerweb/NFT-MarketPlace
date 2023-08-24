export const handle_server = (done) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}`
		},
		notify: false,
		port: 3290,
	});
};