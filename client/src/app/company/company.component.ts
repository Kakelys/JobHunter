import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/user.model';
import { CompanyService } from './company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit, OnDestroy {

  private authSub:Subscription;
  user: User;
  company: any;

  constructor(
    private authService: AuthService,
    private companyService: CompanyService) { }

  ngOnInit(): void {
    this.authSub = this.authService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
