import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccommodationsComponent } from './accommodations.component';

const routes: Routes = [
  { path: '', component: AccommodationsComponent },
  {
    path: ':id',
    loadChildren: () =>
      import('./accommodation/accommodation.module').then(
        (m) => m.AccommodationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccommodationsRoutingModule {}
