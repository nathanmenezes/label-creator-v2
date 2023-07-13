import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableComponent} from "./components/table/table.component";
import {QuotesInputComponent} from "./components/quotes-input/quotes-input.component";
import {ReplaceComponent} from "./components/replace/replace.component";
import {SqlgeneratorComponent} from "./components/sqlgenerator/sqlgenerator.component";

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'create', component: QuotesInputComponent },
  { path: 'replace', component: ReplaceComponent},
  { path: 'sql', component: SqlgeneratorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
