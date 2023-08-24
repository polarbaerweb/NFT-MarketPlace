import gulp from 'gulp';
import { path } from './gulp/config/path.js';
import { plugins } from './gulp/config/plugins.js';


global.app = {
	path: path,
	gulp: gulp,
	plugins: plugins,
}

// Import tasks
import { copy } from './gulp/tasks/copy_files.js';
import { deleteFiles } from './gulp/tasks/delete_files.js';
import { combine_html } from './gulp/tasks/combine_html.js';
import { handle_server } from './gulp/tasks/local_server_handler.js';
import { handler_scss } from './gulp/tasks/scss.js';
import { handler_js } from './gulp/tasks/js.js';
import { handle_images } from './gulp/tasks/images.js';
import { otfToTtf, ttfToWoff, fontsStyle } from './gulp/tasks/fonts.js';

function watcher(){
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, combine_html);
	gulp.watch(path.watch.scss, handler_scss);
	gulp.watch(path.watch.js, handler_js);
	gulp.watch(path.watch.images, handle_images);
};

const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

const mainTasks = gulp.parallel(fonts, gulp.parallel(copy, combine_html, handler_scss, handler_js, handle_images));

const dev = gulp.series(deleteFiles, mainTasks, gulp.parallel(watcher, handle_server));

gulp.task('default', dev);