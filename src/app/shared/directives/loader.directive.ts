import { Directive, Input, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective {
  loaderStyles = {
    position: 'absolute',
    'min-height': '100%',
    width: '100%',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    background: 'rgba(255, 255, 255, 0.8)',
    'z-index': '50',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center'
  };

  public loaderEl!: HTMLDivElement;

  @Input()
  public set appLoader(value: boolean) {
    // console.log(value);
    // console.log(this.loaderEl);
    if (!value) {
      this.loaderEl ? this._setStyles(this.loaderEl, { display: 'none' }) : null;
      return;
    }

    if (this.loaderEl) {
      this._setStyles(this.loaderEl, { display: 'flex' });
      return;
    }

    this.loaderEl = this._renderer.createElement('div');
    this._setStyles(this._el.nativeElement, { position: 'relative' });
    this._setStyles(this.loaderEl, this.loaderStyles);
    this._renderer.addClass(this.loaderEl, 'lds-ring');
    this._renderer.appendChild(this.loaderEl, this._renderer.createElement('div'));
    this._renderer.appendChild(this.loaderEl, this._renderer.createElement('div'));
    this._renderer.appendChild(this.loaderEl, this._renderer.createElement('div'));
    this._renderer.appendChild(this.loaderEl, this._renderer.createElement('div'));
    this._renderer.appendChild(this._el.nativeElement, this.loaderEl);
  }

  constructor(private _el: ElementRef, private _renderer: Renderer2) {}

  private _setStyles(element: HTMLElement, styles: { [key: string]: string }): void {
    // console.log(styles);
    Object.keys(styles).forEach((key: any) => {
      this._renderer.setStyle(element, key, styles[key]);
    });
  }
}
