import gulp from 'gulp';
import gutil from 'gulp-util';
import gbump from 'gulp-bump';
import babel from 'gulp-babel';
import tagVersion from 'gulp-tag-version';
import git from 'gulp-git';


gulp.task('watch', () => {
  gulp.watch('./src/**/*', ['build']);
});

function bump(type) {
  gulp.src(['./package.json'])
    .pipe(gbump({type}))
    .pipe(gulp.dest('./'))
    .pipe(git.commit(`bumps package to next ${type} version`))
    .pipe(tagVersion());
}

gulp.task('bump:major', () => bump('major'));
gulp.task('bump:minor', () => bump('minor'));
gulp.task('bump:patch', () => bump('patch'));

gulp.task('build', () => {
  gulp.src('./src/*.js')
    .pipe(babel().on('error', gutil.log))
    .pipe(gulp.dest('./lib'));
});
