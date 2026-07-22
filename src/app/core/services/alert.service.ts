import { Injectable } from '@angular/core';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  success(title: string, text?: string): void {

    Swal.fire({

      icon: 'success',

      title,

      text,

      confirmButtonColor: '#198754'

    });

  }

  error(title: string, text?: string): void {

    Swal.fire({

      icon: 'error',

      title,

      text,

      confirmButtonColor: '#dc3545'

    });

  }

  warning(title: string, text?: string): void {

    Swal.fire({

      icon: 'warning',

      title,

      text,

      confirmButtonColor: '#ffc107'

    });

  }

  info(title: string, text?: string): void {

    Swal.fire({

      icon: 'info',

      title,

      text,

      confirmButtonColor: '#0dcaf0'

    });

  }

  async confirmDelete(
    title = 'Delete?',
    text = 'You will not be able to recover this record.'
  ): Promise<boolean> {

    const result = await Swal.fire({

      title,

      text,

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#dc3545',

      cancelButtonColor: '#6c757d',

      confirmButtonText: 'Yes, Delete',

      cancelButtonText: 'Cancel'

    });

    return result.isConfirmed;

  }

}