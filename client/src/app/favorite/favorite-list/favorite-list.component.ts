import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoriteService } from '../favorite.service';
import { Favorite } from '../favorite.model';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.css']
})
export class FavoriteListComponent implements OnInit {

  isLoading = true;
  isDeleteLoading = false;
  canLoadMore = true;

  page = 1;
  toTake = 30;

  favorites: Favorite[] = [];

  constructor(
    private favoriteService: FavoriteService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    if(!this.canLoadMore)
      return;

    this.isLoading = true;
    this.favoriteService.get(this.page, this.toTake)
    .subscribe({
      next: favs => {
        if(!favs) {
          this.canLoadMore = false;
          this.isLoading = false;
          return;
        }

        this.page++;
        this.favorites.push(...favs);
        this.isLoading = false;
      },
      error: err => {
        this.toastr.error(err);
        this.canLoadMore = true;
        this.isLoading = false;
      }
    })
  }

  delete(id: number) {
    if(this.isDeleteLoading) {
      this.toastr.warning('Please wait for the previous delete is finished');
      return;
    }

    this.isDeleteLoading = true;

    this.favoriteService.delete(id).subscribe({
      next: _ => {
        this.isDeleteLoading = false;
        this.favorites = this.favorites.filter(f => f.id !== id);
        this.toastr.success('Deleted successfully');
      },
      error: err => {
        this.isDeleteLoading = false;
        this.toastr.error(err);
      }
    })
  }



}
