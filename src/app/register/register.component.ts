import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRegisterDTO, UserSafeAttributes } from '../models/user.model';
import { assignErrorsToFormControls, formToObject } from '../utils/form.utils';


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
      this.navigateToLogin(2000);
    } catch (err) {
      if (err.error.validations) {
        this.errors = null;
        assignErrorsToFormControls(this.f, err.error.validations);
      } else {
       this.errors = [err.error.message];
      }
    } finally {
      this.loading = false;
    }
  }
}
