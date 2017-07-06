import * as $ from 'jquery';
window['$'] = $;
window['jQuery'] = $;

import * as moment from 'moment';
import 'moment/locale/zh-cn';
window['moment'] = moment;

import 'bootstrap-sass';
import 'bootstrap-daterangepicker';

import * as rxjs from 'rxjs';
import 'rxjs/Subject';

Object.assign(window, rxjs);

import 'bootstrap-toggle';