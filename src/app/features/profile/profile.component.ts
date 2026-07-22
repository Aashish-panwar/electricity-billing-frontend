import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ProfileService } from '../../services/profile.service';
import { Profile } from '../../models/profile.model';
import { AlertService } from '../../core/services/alert.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  private profileService = inject(ProfileService);

  private router = inject(Router);

  private alert = inject(AlertService);

  profile?: Profile;

  ngOnInit(): void {

    this.loadProfile();

  }

  loadProfile(): void {

    this.profileService
      .getProfile()
      .subscribe({

        next: (data) => {

          this.profile = data;

        },

        error: (err) => {

          console.log(err);

          this.alert.error(
            'Error',
            'Unable to load profile.'
          );

        }

      });

  }

  changePassword(): void {

    this.router.navigate([
      '/change-password'
    ]);

  }

}