import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { User } from '../../shared/models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.scss']
})
export class RolesModalComponent {
  @Input() user: User;
  @Input() roles: any[];
  //isInvalid = false;

  constructor(public activeModal: NgbActiveModal) { }

  updateRoles() {
    this.activeModal.close(this.roles);
  }

  selectedRole() {
    /////
  }
}
