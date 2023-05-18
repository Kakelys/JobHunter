import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  isLeaveLoading = false;

  @ViewChild('companyLink')
  linkRef: ElementRef;

  constructor(
    private companyService: CompanyService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService) { }

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

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.userSub.unsubscribe();
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
        this.toastr.error(err);
        this.company = null;
        this.isLoading = false
      }
    });
  }

  leave() {
    if(this.isLeaveLoading)
      return
    this.isLeaveLoading = true;

    console.log('hehe');
    this.companyService.leave().subscribe({
      next: () => {
        this.authService.autoAuth().subscribe();
        this.toastr.success('You have left the company');
        this.router.navigate(['/']);
      },
      error: err => {
        this.toastr.error(err);
        this.isLeaveLoading = false;
      }
    });
  }

  showFullLink() {
    this.linkRef.nativeElement.innerHTML = this.company.website;
  }
}
