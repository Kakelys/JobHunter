import { Company } from 'src/app/company/company.model';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToastrExtendedService } from 'src/services/toastr-extended.service';
import { Employer } from 'src/shared/employer.model';
import { User } from 'src/shared/user.model';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-member-list',
  templateUrl: './company-member-list.component.html',
  styleUrls: ['./company-member-list.component.css']
})
export class CompanyMemberListComponent implements OnInit {

  @Input()
  user: User;

  @Input()
  company: Company;

  isLoading = false;
  canLoadMore = false;
  members: Employer[] = [];

  page = 1;
  toTake = 30;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private compnayService: CompanyService
  ) {}

  ngOnInit(): void {
    this.canLoadMore = this.company.employers > this.members.length;
    this.loadPage();
  }

  loadPage() {
    if(!this.canLoadMore || this.isLoading)
      return;

    this.isLoading = true;
    const companyId = this.route.snapshot.params['id'];

    this.compnayService.getEmployers(companyId, this.page, this.toTake)
    .subscribe({
      next: empls => {
        this.isLoading = false;
        if(!empls){
          return;
        }

        this.members.push(...empls);
        this.canLoadMore = this.company.employers > this.members.length;
        this.page++;
      },
      error: err => {
        this.toastr.error(err);
        this.isLoading = false;
      }
    });
  }

  kick(accountId: number) {
    this.compnayService.kick(accountId)
    .subscribe({
      next: () => {
        this.members = this.members.filter(m => m.accountId !== accountId);
        this.company.employers--;
        this.canLoadMore = this.company.employers > this.members.length;
        this.toastr.success('Successfully kicked member');
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }

  updateStatus(accountId: number, isHr: boolean) {
    this.compnayService.updateStatus(accountId, isHr)
    .subscribe({
      next: () => {
        const member = this.members.find(m => m.accountId === accountId);
        member.isHr = isHr;
        this.toastr.success('Successfully updated member status');
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }
}
