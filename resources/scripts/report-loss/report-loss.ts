declare const Subject: any;

const animationDuration: number = 400;

class StepNavController {
  private _stepNavHolder: HTMLElement;
  private _stepNavs: HTMLElement[];
  private _stepHolder: HTMLElement;
  private _stepContents: HTMLElement[];
  private _indicator: HTMLElement;

  private _currentNavIndex: number;
  private _previouseNavIndex: number;

  private _navChange = new Subject();

  constructor(
    private _cmp: JQuery<HTMLElement>
  ){
    this._stepNavHolder = _cmp.find('.step-nav-holder')[0];
    this._stepNavs = $(this._stepNavHolder).find('.step-nav').get();
    this._stepHolder = _cmp.find('.step-holder')[0];
    this._stepContents = $(this._stepHolder).find('.step').get();
    this._indicator = $(this._stepNavHolder).find('.nav-indicator')[0];
    this._init();
  }

  private _init() {
    this._currentNavIndex = 0;
    this._previouseNavIndex = null;
    this._stepNavs.forEach((nav, index)=>{
      $(nav).click(()=>{
        if($(nav).attr('enabled') !== undefined){
          this.goIndex(index);
        }
      });
    });
    this._navChange.subscribe(() => {
      this._onNavChanged();
    });

    this._onNavChanged();
  }

  public goNext() {
    this.goIndex(this._currentNavIndex + 1);
  }

  public goPrevious() {
    this.goIndex(this._currentNavIndex - 1);
  }

  public goIndex(index: number) {
    if(this._currentNavIndex === index) {
      return;
    }
    if(index > (this._stepNavs.length - 1)) {
      throw new Error('out of bound!');
    } else if (index < 0){
      throw new Error('out of bound!');
    }
    this._previouseNavIndex = this._currentNavIndex;
    this._currentNavIndex = index;
    this._navChange.next();
  }

  private _onNavChanged() {
    let currentNavWidth = $(this._stepNavs[this._currentNavIndex]).width();
    let currentNavLeft = $(this._stepNavs[this._currentNavIndex]).offset().left 
      - $(this._stepNavHolder).offset().left;

    $(this._indicator).animate({width: currentNavWidth, left: `${currentNavLeft}px`}, animationDuration);
    $(this._stepNavs[this._currentNavIndex]).addClass('active');

    if(this._previouseNavIndex === null){
      $(this._stepContents[this._currentNavIndex]).show();
      $(this._stepContents[this._currentNavIndex]).css({opacity: 1});
      return;
    }

    $(this._stepNavs[this._previouseNavIndex]).removeClass('active');
    
    $(this._stepContents[this._previouseNavIndex])
      .animate({opacity: 0}, animationDuration / 2, 'swing', ()=>{
        $(this._stepContents[this._previouseNavIndex]).hide();
        $(this._stepContents[this._currentNavIndex]).show();
        $(this._stepContents[this._currentNavIndex]).animate({opacity: 1}, animationDuration / 2, 'swing');
      });
  }
  
}

const ctrl = new StepNavController($('.report-loss-page'));
