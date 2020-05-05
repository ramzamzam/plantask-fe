import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRegisterDTO, UserSafeAttributes } from '../models/user.model';

const formToObject = (f: { [key: string]: AbstractControl; }) => {
  return Object.keys(f).reduce((acc, key) => {
    acc[key] = f[key].value;
    return acc;
  }, {});
};
/*
 TODO: Rewrite this component and change the way validations are displayed
 This is fast write-up just to make registration process available for
 testing other pages
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  errors: string[];
  user: UserSafeAttributes;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/planning']);
    }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/planning';
  }

  navigateToLogin(timeout) {
    setTimeout(() => this.router.navigate(['/login']), timeout);
  }

  get f() { return this.registerForm.controls; }

  async onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    try {
      this.user = await this.authService.register(formToObject(this.f) as UserRegisterDTO);
      this.loading = false;
      this.navigateToLogin(2000);
    } catch (err) {
      this.loading = false;
      if (err.error.validations) {
        this.errors = this.getValidationErrors(err.error.validations);
      } else {
       this.errors = [err.error.message];
      }
    }
  }

  getValidationErrors(validations): string[] {
    if (!validations) { return; }
    // @ts-ignore
    return (Object.values(validations) as string[]).flat();
  }
}
