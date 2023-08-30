import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

export const Icon_ttfToWoff = ()=> {
	return app.gulp.src(`${app.path.srcFolder}/fonts/icon/*.ttf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'FONTS',
				message: "Error: <%= error.message%>"
			})
		))

		.pipe(fonter({
				formats: ['woff']
			}
		))

		.pipe(app.gulp.dest(`${app.path.build.fonts}`))

		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/icon/icomoon.ttf`))
		.pipe(ttf2woff2())

		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
};


export const Icon_fontsStyle = () => {
	const fontsStyleFile = `${app.path.srcFolder}/scss/icon_font.scss`;

	if (!fs.existsSync(fontsStyleFile)) {
		fs.writeFile(fontsStyleFile, '', (error) => {console.log(error)});

		fs.appendFileSync(fontsStyleFile,`@font-face {\n\tfont-family: icons;\n\tfont-display: swap;\n\tsrc: url("../fonts/icomoon.woff2") format("woff2"), url("../fonts/icomoon.woff");\n\tfont-weight: 400;\n\tfont-style: normal;}\n`,
		(error) => {console.log(error)} 
		);
	}
	
	return app.gulp.src(`${app.path.srcFolder}`)
};

