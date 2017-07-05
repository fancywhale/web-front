import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as del from "del";
import * as sass from "gulp-sass";
import * as browserify from 'gulp-browserify';
import * as mainNpmFiles from 'gulp-main-npm-files';
import * as importCss from 'gulp-import-css';

import {Gulpclass, Task, SequenceTask, MergedTask} from "gulpclass";

@Gulpclass()
export class Gulpfile {
  /**
   * Cleans build folder.
   */
  @Task()
  public clean(cb: Function) {
      return del(["./public/**", "./staging/**"], cb);
  }

  @Task()
  public sass(cb: Function) {
    return gulp.src('./resources/styles/index.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(importCss())
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
      .pipe(ts({
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

  @Task("buildDev", ["sass", "fonts", "tsc", "scripts", "sassWatch", "fontsWatch", "tscWatch", "scriptsWatch"])
  public buildDev() {
  }

  @Task()
  public scriptsWatch() {
    return gulp
      .watch('./resources/scripts/**/*.ts', ['scripts']);
  }  

  @SequenceTask()
  public scripts() {
    return ["scripts:compile", "scripts:browserify"];
  }

  @Task('scripts:compile')  
  public transpile() {
    return gulp.src('./resources/scripts/**/*.ts')
      .pipe(ts({
        module: 'commonjs',
        target: 'ES2015',
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        sourceMap: false,
      }))
      .pipe(gulp.dest('./staging/scripts/.'))
  }

  @Task('scripts:browserify')
  public browserify() {
    return gulp.src(['./staging/scripts/**/*.js'])
      .pipe(browserify({
        insertGlobals : false,
      }))
      .pipe(gulp.dest('./public/scripts/.'));
  }  
  
  /**
   * Creates a package and publishes it to npm.
   */
  @SequenceTask()
  public start() {
      return ["clean", "buildDev"];
  }
}
