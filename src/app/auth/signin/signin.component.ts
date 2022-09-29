import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'pm-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  username: string;
  password: string;
  error: string;

  user: User;

  constructor(private router: Router, private authService: AuthService) 
  { 
    this.authService.findMe().subscribe(user =>(this.user = user));
  }

  ngOnInit(): void {
  }

  signin() {
    this.error = '';
    this.authService
      .login(this.username, this.password)
      .subscribe(s => this.router.navigate(['']), err => this.error = err);
  }

  redirectToHome() {
    this.router.navigate(['/dashboard']); // navigate to dashboard page
  }

}
