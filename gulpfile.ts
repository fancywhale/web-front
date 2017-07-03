import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as del from "del";
import * as sass from "gulp-sass";
import * as tsc from 'gulp-tsc';

import {Gulpclass, Task, SequenceTask, MergedTask} from "gulpclass";

@Gulpclass()
export class Gulpfile {
  /**
   * Cleans build folder.
   */
  @Task()
  public clean(cb: Function) {
      return del(["./public/**"], cb);
  }

  @Task()
  public sass(cb: Function) {
    return gulp.src('./resources/styles/index.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./public/styles/.'));
  }

  @Task()
  public sassWatch() {
    return gulp.watch('./resources/**/*.scss', ['sass']);
  }

  @Task()
  public fontsWatch() {
    return gulp.watch('./resources/fonts/**/*', ['fonts']);
  }

  @Task()
  public fonts() {
    return gulp.src('./resources/fonts/**/*')
      .pipe(gulp.dest('./public/fonts/.'));
  }

  @Task()
  public tsc() {
    return gulp
      .src('./src/**/*.ts')
      .pipe(tsc({
        module: 'commonjs',
        target: 'ES2015',
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        sourceMap: false,
      }))
      .pipe(gulp.dest('./src/.'));
  }

  @Task()
  public tscWatch() {
    return gulp
      .watch('./src/**/*.ts', ['tsc']);
  }  

  @Task("buildDev", ["sass", "fonts", "tsc", "sassWatch", "fontsWatch", "tscWatch"])
  public buildDev() {
  }
  
  /**
   * Creates a package and publishes it to npm.
   */
  @SequenceTask()
  public start() {
      return ["clean", "buildDev"];
  }
}
