import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from '../company.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/shared/user.model';

@Component({
  selector: 'app-company-element',
  templateUrl: './company-element.component.html',
  styleUrls: ['./company-element.component.css']
})
export class CompanyElementComponent implements OnInit, OnDestroy{

  private paramsSub: Subscription;
  private userSub: Subscription;

  user: User;
  company: Company;
  employersCount = 0;
  vacanciesCount = 0;
  isLoading = true;

  constructor(
    private companyService: CompanyService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      if(!this.company || this.company?.id !== params.id) {
        this.loadCompany();
      }
    });

    this.userSub = this.authService.user$.subscribe({
      next: user => {
        this.user = user;
      }
    });
  }

  loadCompany() {
    this.isLoading = true;
    const companyId = this.route.snapshot.params['id'];

    this.companyService.getCompany(companyId).subscribe({
      next: company => {
        this.company = company;
        this.isLoading = false;
      },
      error: err => {
        this.company = null;
        this.isLoading = false
      }
    });
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
