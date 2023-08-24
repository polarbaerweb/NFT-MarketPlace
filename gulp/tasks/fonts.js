import fs from 'fs';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';
import replace from 'gulp-replace';

export const otfToTtf = ()=> {
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: 'FONTS',
				message: "Error: <%= error.message %>"
			})
		))

		.pipe(fonter({
			formats: ['ttf']
		}))

		.pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

export const ttfToWoff = ()=> {
	return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
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

		.pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
		.pipe(ttf2woff2())

		.pipe(app.gulp.dest(`${app.path.build.fonts}`))
};

export const fontsStyle = () => {
	const fontWeightsType = {
		thin: 100,
		extralight: 200,
		light: 300,
		medium: 500,
		semibold: 600,
		bold: 700,
		extrabold: 800,
		black: 900,
	};

	const fontsStyleFile = `${app.path.srcFolder}/scss/fonts.scss`;

	fs.readdir(app.path.build.fonts, (err, fontFiles) => {
		if (fontFiles) {
			if (!fs.existsSync(fontsStyleFile)) {
				fs.writeFile(fontsStyleFile, '', (cb) => {
					if (cb) {
						console.error('Error writing the file:', cb);
					} else {
						console.log('File written successfully.');
					}
				});
				
				let newFileOnly;

				for (let i = 0; i < fontFiles.length; i++) {
					let fontFileName = fontFiles[i].split('.')[0];

					if (newFileOnly !== fontFileName) {
						let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;

						let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

						fontWeight = fontWeight.toLowerCase();

					for (let key in fontWeightsType) {
						if (key === fontWeight) {
							fontWeight = fontWeightsType[key];
							break;
						}

						if (key === 'bold') {
							fontWeight = 400;
						}
					}

					fs.appendFileSync(fontsStyleFile,`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;}\n`,
					(cb) => {
							if (cb) {
								console.error('Error appending to the file:', cb);
							} else {
								console.log('File appended successfully.');
							}
						}
					);
					newFileOnly = fontFileName;
				}
			}
		}
		}
	});

	return app.gulp.src(`${app.path.srcFolder}`)
};
