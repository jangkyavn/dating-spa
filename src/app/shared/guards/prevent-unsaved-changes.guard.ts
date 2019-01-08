import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { MemberEditComponent } from 'src/app/members/member-edit/member-edit.component';

@Injectable({
    providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm) {
            if (component.editForm.dirty) {
                return confirm('Bạn có chắc chắn muốn tiếp tục không? Mọi sự thay đổi không lưu sẽ bị mất');
            }
        }

        return true;
    }
}
