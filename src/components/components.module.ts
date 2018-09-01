import { NgModule } from '@angular/core';
import { FlashCardComponent } from './flash-card/flash-card';
import { ExpandableComponent } from './expandable/expandable';

@NgModule({
	declarations: [FlashCardComponent,
    ExpandableComponent,],
	imports: [],
	exports: [FlashCardComponent,
    ExpandableComponent,
    ]
})
export class ComponentsModule {}
