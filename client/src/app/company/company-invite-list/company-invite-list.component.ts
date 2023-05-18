import { Component, Input, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { ToastrService } from 'ngx-toastr';
import { Company } from '../company.model';
import { Invite } from 'src/shared/invite/invite.model';

@Component({
  selector: 'app-company-invite-list',
  templateUrl: './company-invite-list.component.html',
  styleUrls: ['./company-invite-list.component.css']
})
export class CompanyInviteListComponent implements OnInit {

  @Input()
  company: Company;

  invites: Invite[] = [];

  page = 1;
  toTake = 30;

  isLoading = false;
  canLoadMore = true;

  constructor(
    private companyService: CompanyService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    if(this.isLoading || !this.canLoadMore)
      return;

    this.isLoading = true;

    this.companyService.getInvites(this.company.id, this.page, this.toTake)
    .subscribe({
      next: data => {
        this.isLoading = false;
        if(!data) {
          this.canLoadMore = false;
          return;
        }

        this.invites.push(...data);
      },
      error: err => {
        this.toastr.error(err);
      }
    });

  }

  delete(inviteId: number) {
    this.companyService.deleteInvite(inviteId)
    .subscribe({
      next: () => {
        this.invites = this.invites.filter(x => x.id != inviteId);
        this.toastr.success('Invite deleted');
      },
      error: err => {
        this.toastr.error(err);
      }
    });
  }
}
