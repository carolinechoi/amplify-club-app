import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { Tab3Page } from '../tab3/tab3.page';
import { Tab3PageModule } from '../tab3/tab3.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    // Tab3Page,
    // Tab3PageModule,
    TabsPageRoutingModule
  ],
  declarations: [TabsPage],
})
export class TabsPageModule {}
