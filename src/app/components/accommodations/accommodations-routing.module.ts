import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGuard } from 'src/app/guards/data/data.guard';
import { AccommodationsComponent } from './accommodations.component';

const routes: Routes = [
  { path: '', component: AccommodationsComponent },
  {
    path: ':id',
    loadChildren: () =>
      import('./accommodation/accommodation.module').then(
        (m) => m.AccommodationModule
      ),
    canActivate: [DataGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccommodationsRoutingModule {}
