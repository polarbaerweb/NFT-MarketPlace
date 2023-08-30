import webp from 'gulp-webp';
import imagemin from 'gulp-imagemin';

export const handle_images = ()=> {
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message>"
			})
		))
		
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(webp())
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.gulp.src(app.path.src.images))

		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			interlaced: true,
			optimizationLevel: 3,
		}))

		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browsersync.stream())
};

export const handle_svg_file = () =>
{
	return app.gulp.src( app.path.src.svg )
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			})
		) )
	
		.pipe( app.plugins.newer( app.path.build.images ) )
		
		.pipe( imagemin( {
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			interlaced: true,
			optimizationLevel: 3,
		} ) )

		.pipe(app.gulp.dest(app.path.build.images))
}