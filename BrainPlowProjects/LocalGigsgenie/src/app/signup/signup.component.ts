import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProfileService} from './../../_services/Profile/profile-service';
import {FormGroup, FormControl, AbstractControl, FormBuilder, Validators, FormControlName} from '@angular/forms';
import {EmailValidator, EqualPasswordsValidator} from './../../assets/validators';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AlertserviceService} from './../../_services/alertservice.service';
import {Contractor} from './../../_services/ControllerClasses/contractor';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {Router, RouterModule} from '@angular/router';
import {LoginService} from './../../_services/login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private objLoginService: LoginService,private toastr: ToastsManager,private router: Router,private vcr: ViewContainerRef,private newService: ProfileService, private alertService: AlertserviceService) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  private model: any = {name: '', password: '', cpassword: '', email: '', mobilenumber: '', username: ''};
  countries = '';
  val= '';
  txtPName= '';
  boolEmailExist = false;
  boolUserNameExist = '';
  ShowHideAlert = false;
  UserJobType = '0';
  UserCountry = '0';
  boolMobileNull = '';
  boolEmailNull = '';
  boolPasswordNull = '';
  ngOnInit() {
    this.newService.fetchCountries().subscribe(data => this.countries = data);
    window.addEventListener('beforeunload', function (e) {
      const confirmationMessage = 'It looks like you have been editing something. '
        + 'If you leave before saving, your changes will be lost.';

      (e || window.event).returnValue = confirmationMessage; // Gecko + IE
      return confirmationMessage; // Gecko + Webkit, Safari, Chrome etc.
    });
  }
  EmailExistorNot(val) {
    console.log('email1');
    this.boolEmailNull = val;
    if (val !== '') {
      this.newService.EmailExist(val).subscribe(data => {this.boolEmailExist = data;
      });
    }
  }
  UserNameExistorNot(val) {
    console.log('user1');
    if (val !== '') {
      this.newService.UserNameExist(val).subscribe(data => {this.boolUserNameExist = data;
      });
    }
  }
  bthSubmitClick(f) {
    console.log('click');
    if (f.invalid) {
      window.scrollTo(0, 100);
      }
    }
  usernameNull(val) {
    if (val === '') {
      return false;
    } else {
      return true;
    }
  }
  areEqual(val1, val2) {
    if (val1 === val2) {
      // console.log('equal')
      return true;
    } else {
      // console.log('not equal');
      return false;
    }
  }
  scltUserTypeChange(val) {
    this.UserJobType = val;
  }
  scltUserCountryChange(val) {
    console.log(val);
    this.UserCountry = val;
  }
  PasswordClick(val) {
    this.boolPasswordNull = val;
  }
  onSubmit(f, username,email , password) {
    window.scrollTo(0, 50);
    this.UserNameExistorNot(username);
    this.EmailExistorNot(email);
    if (!this.boolUserNameExist && !this.boolEmailExist) {
    let contractotObj = new Contractor();
    this.newService.UserDefaultSignup(username,email,password).subscribe(data => {
      this.Login(username,password);
    },error=> {
    this.toastr.error('Sorry Signup Failed due to this error "'+error+'"','Sigup Failed');
    });
    }
  }
  Login(name, password) {
    this.objLoginService.After_Signup_login(name,password).subscribe(  data => {
        console.log(data);
      },
      error => {
        console.log(error);
        this.router.navigate(['/signin']);
      });
  }

  funcMobileNull(val) {
    this.boolMobileNull = val;
    console.log(this.boolMobileNull );
  }
    _checkUserNameExist() {
      this.newService.UserNameExist(this.txtPName).subscribe( data => {
          if (data['exists'] === 'Yes') {
            // console.log(data['exists']);
            } else {
            // console.log(data['exists']);
            }

        }
      );

    }

}
