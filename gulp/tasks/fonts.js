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
	const fontsStyleFile = `${app.path.srcFolder}/scss/fonts.scss`;
	fs.readdir(app.path.build.fonts, (error, fontFiles) => {
		if (fontFiles) {
			if (!fs.existsSync(fontsStyleFile)) {
				fs.writeFile( fontsStyleFile, '', ( error ) => { console.log( error ) } );
				_handleFontProperties(fontFiles)
			}
		}
	}
);

	return app.gulp.src(`${app.path.srcFolder}`)
};


const _handleFontProperties = (fontFiles) =>
{
	let newFileOnly;
	for (let i = 0; i < fontFiles.length; i++) {
		let fontFileName = fontFiles[i].split('.')[0];

		_appendCodeToFile(
			fontsStyleFile,
			fontFileName,
			..._getFontNameAndWeight( newFileOnly, fontFileName )
		)
		
		newFileOnly = fontFileName;
	}
}


const _getFontNameAndWeight = (newFileOnly, fontFileName) =>
{
	if (newFileOnly !== fontFileName) {
		var fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName;

		var fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName;

		fontWeight = fontWeight.toLowerCase();
		fontWeightConvertedToNumber = _getConvertedFontWeight(fontWeight)
	}

	return {fontName, fontWeight}
}


const _getConvertedFontWeight = () =>
{
	for (let key in fontWeightsType) {
		if ( key === fontWeight ) 
		{
			fontWeight = fontWeightsType[key];
			break;
		}

		if ( key === 'bold' )
		{
			fontWeight = 400;
		}
	}
}

const _appendCodeToFile = (fontsStyleFile, fontFileName, fontName, fontWeight) =>
{
	fs.appendFileSync(fontsStyleFile,`@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;}\n`,
	(error) => { console.log(error) });
}
