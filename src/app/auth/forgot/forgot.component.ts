import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { NgForm } from "@angular/forms";

import { AuthService } from "../auth.service";
import { ActivatedRoute } from '@angular/router';
import { fadeTrigger } from 'src/app/shared/route-animations';

@Component({
  selector: "app-forgot",
  templateUrl: "./forgot.component.html",
  styleUrls: ["./forgot.component.scss"],
  animations: [fadeTrigger]
})
export class ForgotComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;

  state: string;

  isLoading = false;

  constructor(public authService: AuthService, private route: ActivatedRoute) {
    //FETCH TOKEN FROM ROUTE
    this.route.params.subscribe(param => (this.state = param["state"]));
  }

  ngOnInit() {
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => (this.isLoading = false));
  }

  onForgot(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.isLoading = true;
    this.authService.forgotPassword(form.value.email);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
