import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { HttpRequestService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  fb = inject(FormBuilder);
  http = inject(HttpRequestService);
  isLoading = false;

  signupForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  isRegistrationCompleted = false;

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    for (const i in this.signupForm.controls) {
      this.signupForm.get(i)?.markAsDirty();
      this.signupForm.get(i)?.updateValueAndValidity();
    }
    if (this.signupForm.invalid) return;

    this.isLoading = true;

    this.http.post('/users/register', this.signupForm.value)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe(() => {
        this.isRegistrationCompleted = true;

        setTimeout(() => {
          window.location.assign(environment.portalUrl);
        }, 1300);
      });
  }
}
