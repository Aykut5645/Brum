import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }
  roleMatch() {
    return this.authService.roleMatch(['Admin']);
  }
}
