import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ToastrExtendedService {

  constructor(private toastr: ToastrService){}
}
