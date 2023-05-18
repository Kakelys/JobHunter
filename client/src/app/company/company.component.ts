import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/shared/user.model';
import { CompanyService } from './company.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authSub = this.authService.user$.subscribe(user => {
      this.user = user;


      let companyId = this.route.firstChild?.snapshot.params['id']
      if(!user && !companyId)
        this.router.navigate(['/login']);

      if(user?.employer && !companyId)
        this.router.navigate([`/company/${user.employer.companyId}`]);
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }
}
