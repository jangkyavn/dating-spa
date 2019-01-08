import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { PreventUnsavedChangesGuard } from './shared/guards/prevent-unsaved-changes.guard';

import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MessagesComponent } from './messages/messages.component';

import { MemberDetailResolver } from './shared/resolvers/member-detail.resolver';
import { MemberListResolver } from './shared/resolvers/member-list.resolver';
import { MemberEditResolver } from './shared/resolvers/member-edit.resolver';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'lists', component: ListsComponent },
      {
        path: 'members', component: MemberListComponent,
        resolve: { users: MemberListResolver }
      },
      {
        path: 'members/:id', component: MemberDetailComponent,
        resolve: { user: MemberDetailResolver }
      },
      {
        path: 'member/edit', component: MemberEditComponent,
        resolve: { user: MemberEditResolver }, canDeactivate: [PreventUnsavedChangesGuard]
      },
      { path: 'messages', component: MessagesComponent },
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
