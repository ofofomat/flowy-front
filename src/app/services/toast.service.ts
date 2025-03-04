import { Injectable } from '@angular/core';
import { Toast, ToastModel } from '@syncfusion/ej2-notifications';

@Injectable()

export class ToastService {
  public toastInstance: Toast = new Toast;
  constructor() { }

  // To create the toast component
  createToast = (element: HTMLElement, model: ToastModel): Toast => {
    if (!element.classList.contains('e-toast')) {
      this.toastInstance = new Toast(model, element);
    }
    return this.toastInstance
  };

  // To show the toast component
  showToast = (elemnet: HTMLElement, model: ToastModel) => {
    this.toastInstance = this.createToast(elemnet, model);
    this.toastInstance.show();
  }

  // To hide the toast component
  hideToast = () => {
    if (this.toastInstance) {
      this.toastInstance.hide();
    }
  }

  // To hide the all toast component
  hideToastAll = () => {
    if (this.toastInstance) {
      this.toastInstance.hide('All');
    }
  }
}

