import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  inject
} from '@angular/core';

import { RoleService } from '../../core/services/role.service';

@Directive({
  selector: '[appHasRole],[appHasAnyRole]',
  standalone: true
})
export class HasRoleDirective {

  private template = inject(TemplateRef<any>);
  private viewContainer = inject(ViewContainerRef);
  private roleService = inject(RoleService);

  @Input()
  set appHasRole(role: string) {

    this.viewContainer.clear();

    if (this.roleService.hasRole(role)) {

      this.viewContainer.createEmbeddedView(this.template);

    }

  }

  @Input()
  set appHasAnyRole(roles: string[]) {

    this.viewContainer.clear();

    if (this.roleService.hasAnyRole(roles)) {

      this.viewContainer.createEmbeddedView(this.template);

    }

  }

}