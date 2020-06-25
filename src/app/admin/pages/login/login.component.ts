import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from '@models';
import { AuthService } from '@admin-services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    public auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
  }

  public login(): void {
    if (this.form.valid) {
      const user: User = this.form.value;

      this.auth.login(user)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.router.navigate(['/admin', 'dashboard']);
        })
    }
  }

}
