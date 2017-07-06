(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
const animationDuration = 400;
class StepNavController {
    constructor(_cmp) {
        this._cmp = _cmp;
        this._navChange = new Subject();
        this._stepNavHolder = _cmp.find('.step-nav-holder')[0];
        this._stepNavs = $(this._stepNavHolder).find('.step-nav').get();
        this._stepHolder = _cmp.find('.step-holder')[0];
        this._stepContents = $(this._stepHolder).find('.step').get();
        this._indicator = $(this._stepNavHolder).find('.nav-indicator')[0];
        this._init();
    }
    _init() {
        this._currentNavIndex = 0;
        this._previouseNavIndex = null;
        this._stepNavs.forEach((nav, index) => {
            $(nav).click(() => {
                if ($(nav).attr('enabled') !== undefined) {
                    this.goIndex(index);
                }
            });
        });
        this._navChange.subscribe(() => {
            this._onNavChanged();
        });
        this._onNavChanged();
    }
    goNext() {
        this.goIndex(this._currentNavIndex + 1);
    }
    goPrevious() {
        this.goIndex(this._currentNavIndex - 1);
    }
    goIndex(index) {
        if (this._currentNavIndex === index) {
            return;
        }
        if (index > (this._stepNavs.length - 1)) {
            throw new Error('out of bound!');
        }
        else if (index < 0) {
            throw new Error('out of bound!');
        }
        this._previouseNavIndex = this._currentNavIndex;
        this._currentNavIndex = index;
        this._navChange.next();
    }
    _onNavChanged() {
        let currentNavWidth = $(this._stepNavs[this._currentNavIndex]).width();
        let currentNavLeft = $(this._stepNavs[this._currentNavIndex]).offset().left
            - $(this._stepNavHolder).offset().left;
        $(this._indicator).animate({ width: currentNavWidth, left: `${currentNavLeft}px` }, animationDuration);
        $(this._stepNavs[this._currentNavIndex]).addClass('active');
        if (this._previouseNavIndex === null) {
            $(this._stepContents[this._currentNavIndex]).show();
            $(this._stepContents[this._currentNavIndex]).css({ opacity: 1 });
            return;
        }
        $(this._stepNavs[this._previouseNavIndex]).removeClass('active');
        $(this._stepContents[this._previouseNavIndex])
            .animate({ opacity: 0 }, animationDuration / 2, 'swing', () => {
            $(this._stepContents[this._previouseNavIndex]).hide();
            $(this._stepContents[this._currentNavIndex]).show();
            $(this._stepContents[this._currentNavIndex]).animate({ opacity: 1 }, animationDuration / 2, 'swing');
        });
    }
}
const ctrl = new StepNavController($('.report-loss-page'));

},{}]},{},[1])