import { Component } from '@angular/core';
import { ImageComponent } from './image.component';


@Component({
    selector: 'my-app',
    template: `
        <image></image>
      `,
    directives : [ImageComponent]
})
    
export class AppComponent { }