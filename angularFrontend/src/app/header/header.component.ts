import { Component, OnInit } from '@angular/core';
import { ChildrenOutletContexts, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { RoutingAnimation } from '../Services/RoutingAnimations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations:[RoutingAnimation]
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router, private contexts:ChildrenOutletContexts) {}

  ngOnInit(): void {}

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  getRouteAnimationData(){

    const context = this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']
    console.log(context);

  }
}
