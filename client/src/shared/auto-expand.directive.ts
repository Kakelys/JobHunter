import { Directive, ElementRef, HostListener, Input, OnInit } from "@angular/core";

@Directive({
  selector: 'textarea[autoExpand]'
})
export class AutoExpandDirective{

  @Input('expandMaxHeight') maxHeight: number = 300;
  @Input('expandMinHeight') minHeight: number = 30;

  private height: number;

  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.style.resize = 'none';
    elementRef.nativeElement.style.minHeight = this.minHeight + 'px';
    elementRef.nativeElement.style.maxHeight = this.maxHeight + 'px';
  }

  @HostListener('keydown.tab', ['$event']) onKeydownTab(event: KeyboardEvent) {
    event.preventDefault();

    let el = this.elementRef.nativeElement;

    let start = el.selectionStart;
    var end = el.selectionEnd;

    el.value = el.value.substring(0 , start) + '\t' + el.value.substring(end)

    el.selectionStart = el.selectionEnd = start + 1;
  }

  @HostListener('keyup')
  onKeyUp() {
    this.setCurHeight();
    this.setNewHeight();
  }

  setCurHeight() {
    const textarea = this.elementRef.nativeElement;
    let indexH = textarea.style.height.indexOf('px');
    if(indexH == -1 ) {
      this.height = textarea.scrollHeight;
      return;
    }
    this.height = +textarea.style.height.substring(0, indexH);
  }

  setNewHeight() {
    const textarea = this.elementRef.nativeElement;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
    textarea.style.overflowY = textarea.scrollHeight < this.maxHeight ? 'hidden' : 'auto';
  }
}
