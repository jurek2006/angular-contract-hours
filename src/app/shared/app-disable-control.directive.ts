import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appDisableControl]'
})
export class AppDisableControlDirective {
  /*
    when using Ivy (from Angular 9) there's a problem with the directive
    (as described: https://github.com/jurek2006/angular-contract-hours/issues/10)
    Working solution is from https://github.com/angular/angular/issues/35330

  */
  @Input() appDisableControl;
  ngOnChanges(changes) {
    if (changes['appDisableControl']) {
      const action = this.appDisableControl ? 'disable' : 'enable';
      this.ngControl.control[action]();
    }
  }

  constructor(private ngControl: NgControl) {}
}
