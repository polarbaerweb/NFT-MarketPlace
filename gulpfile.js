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


function watcher(){
	gulp.watch(path.watch.files, copy);
	gulp.watch(path.watch.html, combine_html);
};

const mainTasks = gulp.parallel(copy, combine_html);

const dev = gulp.series(deleteFiles, mainTasks, watcher);

gulp.task('default', dev);