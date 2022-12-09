import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {UserEditComponent} from '../../home/user/user-edit/user-edit.component';

@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<UserEditComponent>{
  canDeactivate(component: UserEditComponent) {
    console.log(component.editForm.dirty);
    if (component.editForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost.');
    }
    return true;
  }

}
