import { Injectable, inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private toastr = inject(ToastrService);

  // ==========================
  // Success
  // ==========================

  success(title: string, message: string): void {

    this.toastr.success(
      message,
      title
    );

  }

  // ==========================
  // Error
  // ==========================

  error(title: string, message: string): void {

    this.toastr.error(
      message,
      title
    );

  }

  // ==========================
  // Warning
  // ==========================

  warning(title: string, message: string): void {

    this.toastr.warning(
      message,
      title
    );

  }

  // ==========================
  // Info
  // ==========================

  info(title: string, message: string): void {

    this.toastr.info(
      message,
      title
    );

  }

}