import { Directive ,ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Directive({
  selector: '[appToasterDirective]'
})
export class ToasterDirectiveDirective {
  vcrRF;
constructor(public toastr: ToastsManager, vcrObj: ViewContainerRef) {
  this.toastr.setRootViewContainerRef(vcrObj);
}
showSuccess(msg,title) {
  this.toastr.success(msg, title);
}

showError(msg, title) {
  this.toastr.error(msg, title);
}

showWarning(msg, title){
  this.toastr.warning(msg, title);
}

showInfo(msg, title){
  this.toastr.info(msg, title);
}

showCustom() {
  this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
}

}
