import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: `accommodations`,
    loadChildren: () =>
      import('./components/accommodations/accommodations.module').then(
        (m) => m.AccommodationsModule
      ),
  },
  {
    path: '**',
    redirectTo: `/accommodations`,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
