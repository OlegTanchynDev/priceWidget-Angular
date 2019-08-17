import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { coins } from '../../../shared/models/coins';
import { styles } from '../../../shared/models/styles';
import { meta } from '../../../shared/models/wdgets-meta-data';
import { find } from 'lodash';
import { forEach } from '@angular/router/src/utils/collection';
import { isNumber } from 'util';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  @ViewChild('frame') frame: any;
  @ViewChild('textarea') textarea: any;

  public loader = true;
  public meta: any;
  public type: string;
  public widgetProps: any;
  public currentCoin: string;
  public currentColor: string;
  public src: any =  {};
  public genSrc: any;
  public themes: any;
  public coins: any;
  public width: any;
  public height: any;
  public IFrimeStyle: any = null;
  public regExpDigitOnly = /\d+/g;
  public shadows: any;
  public currentShadow: string;
  public currentRealtime: any;
  public shapes: any;
  public widgetStyles: any;
  public currentStyle: any;
  public currentShape: any;
  public relatimeUpdateOptions: any;

  constructor(private activatedRoute: ActivatedRoute, private sanitizer: DomSanitizer, private renderer: Renderer2) {
  }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.IFrimeStyle = {};
    /**/
    this.type = this.activatedRoute.snapshot.params.type;
    this.widgetProps = find(styles, o => o.widgetName === this.type);
    /* widget style */
    this.widgetStyles = this.widgetProps.styles.widgetStyles ? Object.keys(this.widgetProps.styles.widgetStyles) : null;
    this.currentStyle = this.widgetProps.defaultStyle;
    this.relatimeUpdateOptions = Object.keys(this.widgetProps.highlightRealtimeUpdate);
    /* END widget style */
    /* Iframe options */
    this.setTheDefaultWidthForIframe(this.widgetProps.styleSwitcher);
    this.IFrimeStyle['box-shadow'] = this.widgetProps.styles.IframeShadows.shadow.style;
    this.shadows = Object.keys(this.widgetProps.styles.IframeShadows);
    this.currentShadow = this.shadows.shadow;
    this.shapes = Object.keys(this.widgetProps.styles.shape);
    this.currentShape = this.widgetProps.defaultShape;
    /* END IFrame options */
    this.meta = meta[this.type];
    this.coins = this.forEachCoins(coins, this.widgetProps.hiddenCoins);
    this.themes = Object.keys(this.widgetProps.theme);
    this.currentColor = this.widgetProps.defaultTheme;
    this.currentCoin = this.widgetProps.defaultCoin;
    this.currentRealtime = this.widgetProps.defaultHighlight;
    const src = `/widgets/${this.type}?color=${this.currentColor}&currency=${this.currentCoin}&realtime=${this.currentRealtime}&style=${this.currentStyle}`;
    this.src = this.sanitizer.bypassSecurityTrustResourceUrl(src);
    this.renderer.listen(this.frame.nativeElement, 'load', () => this.loader = false);
  }

  onChangeColor(color) {
    this.currentColor = color;
    this.frame.nativeElement.contentWindow.postMessage({type: 'color_change', color}, location.origin);
  }

  onChangeCoin(coin) {
    this.currentCoin = coin;
    this.frame.nativeElement.contentWindow.postMessage({type: 'coin_change', coin: coin || 'BTC'}, location.origin);
  }

  onShape(shape) {
    this.currentShape = shape;
    this.IFrimeStyle['border-radius'] = this.widgetProps.styles.shape[this.currentShape].borderRadius;
  }

  onRealtime(realtime) {
    this.currentRealtime = realtime;
    this.frame.nativeElement.contentWindow.postMessage({type: 'realtime_update', realtime: realtime}, location.origin);
  }

  onStyle(style) {
    this.currentStyle = style;
    this.frame.nativeElement.contentWindow.postMessage({type: 'style_update', style: style}, location.origin);
    this.setTheDefaultWidthForIframe(true);
  }


  onBorder(isBorder: boolean) {
    if (isBorder) {
      this.IFrimeStyle.border = this.widgetProps.styles.iframe.border;
      this.width = parseInt(this.width, 10) + 2;
      this.height = parseInt(this.height, 10) + 2;
      this.IFrimeStyle.width = this.width + 'px';
      this.IFrimeStyle.height = this.height + 'px';
    } else {
      if (this.IFrimeStyle.border) {
        this.width = parseInt(this.width, 10) - 2;
        this.height = parseInt(this.height, 10) - 2;
        this.IFrimeStyle.width = this.width + 'px';
        this.IFrimeStyle.height = this.height + 'px';
      }
      this.IFrimeStyle.border = 'none';
    }
  }

  onChangeShadow(shadow) {
    this.currentShadow = shadow;
    this.IFrimeStyle['box-shadow'] = this.widgetProps.styles.IframeShadows[this.currentShadow].style;
  }

  public onSubmit() {
    this.IFrimeStyle.width = this.width + 'px';
    this.IFrimeStyle.height = this.height + 'px';
    this.genSrc = `${location.origin}/widgets/${this.type}?color=${this.currentColor}&currency=${this.currentCoin}&realtime=${this.currentRealtime}&style=${this.currentStyle}`;
    this.textarea.nativeElement.value = `<iframe
    height="${this.height}" width="${this.width}"
    src="${this.genSrc}"
    style="border-radius: ${this.IFrimeStyle['border-radius']}; box-shadow: ${this.IFrimeStyle['box-shadow']}; border: ${this.IFrimeStyle.border};">\n</iframe>`;
  }

  public onReset() {
    this.onChangeCoin(this.widgetProps.defaultCoin);
    this.onChangeColor(this.widgetProps.defaultTheme);
    this.textarea.nativeElement.value = '';
  }

  private forEachCoins(coinsArr: any, haystack?: any) {
    return haystack ? coinsArr.filter(coin => !haystack.includes(coin.short)) : coinsArr;
  }

  /* update the default width for Iframe */
  private setTheDefaultWidthForIframe(isChangeWidgetStyle) {
    if (isChangeWidgetStyle) {
      this.IFrimeStyle.width = this.widgetProps.styles.widgetStyles[this.currentStyle].iframeOption.width;
      this.IFrimeStyle.height = this.widgetProps.styles.widgetStyles[this.currentStyle].iframeOption.height;
      this.width = this.IFrimeStyle.width.match(this.regExpDigitOnly);
      this.height = this.IFrimeStyle.height.match(this.regExpDigitOnly);
    }
    if (!isChangeWidgetStyle) {
      this.width = this.widgetProps.styles.iframe.width.match(this.regExpDigitOnly);
      this.height = this.widgetProps.styles.iframe.height.match(this.regExpDigitOnly);
      this.IFrimeStyle.width = this.widgetProps.styles.iframe.width;
      this.IFrimeStyle.height = this.widgetProps.styles.iframe.height;
    }
  }

}
