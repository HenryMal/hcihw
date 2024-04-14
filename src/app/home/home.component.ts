import { Component } from '@angular/core';
import { UserdataService } from '../services/userservice/userdata.service';
import { Router } from '@angular/router';

import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  user: any;
  showModal: boolean = true;
  askForReading: boolean = false;
  ketonesPresent: boolean = false;
  bloodSugarReading?: number;
  bloodSugarLow?: boolean;
  bloodSugarHigh?: boolean;
  reasonForAbnormalReading?: string | null;

  faInfoCircle = faInfoCircle;

  constructor(
    private userDataService: UserdataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.userDataService.getUserData();
    if (this.user) {
      this.bloodSugarReading = this.user.glucoseLevels;
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }

  hideModal() {
    this.showModal = false;
  }

  toggleModal() {
    this.showModal = true;
  }

  toggleReadingInput() {
    this.askForReading = true;
  }

  submitReading() {
    if (
      this.bloodSugarReading !== undefined &&
      this.bloodSugarReading >= 0 &&
      this.bloodSugarReading <= 999
    ) {
      this.user.glucoseLevels = this.bloodSugarReading;
      console.log('Saving this data:', this.user);
      this.userDataService.setUserData(this.user);

      if (this.bloodSugarReading < this.user.minGlucoseLevel) {
        alert(
          'Your reading is low. Please eat a sugar source, take your medicine, and eat meals and snacks as described by your doctor.'
        );
        this.askForReason();
      } else if (this.bloodSugarReading > this.user.maxGlucoseLevel) {
        alert(
          `Your blood sugar is high. Please call your doctor (${this.user.doctorName}, ${this.user.doctorPhoneNumber}) immediately.`
        );
        this.askForReason();
        this.askForKetonesPresence();
      } else {
        alert('Your reading is within a normal range.');
        this.reasonForAbnormalReading = null;
      }

      this.showModal = false;
      this.askForReading = false;
    } else {
      alert('Please enter a valid number between 0-999');
    }
  }

  askForReason() {
    let reason = prompt(
      "Please explain why your reading isn't normal (e.g., Drank soda, Has the flu, Ate a big lunch, etc.)"
    );
    while (!reason) {
      reason = prompt(
        "You must provide a reason. Please explain why your reading isn't normal."
      );
    }
    this.reasonForAbnormalReading = reason;
  }

  askForKetonesPresence() {
    this.ketonesPresent = confirm(
      'Is there a presence of ketones in your urine?'
    );
  }

  onOverlayClick(event: MouseEvent): void {
    this.showModal = false;
  }

  onModalClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
