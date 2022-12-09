import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {Ride} from '../../../../shared/models';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrls: ['./ride-card.component.css']
})
export class RideCardComponent implements OnInit {
  @Input() ride: Ride;
  modalRef: BsModalRef;
  config = {
    class: 'modal-dialog-centered'
  };
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
}
