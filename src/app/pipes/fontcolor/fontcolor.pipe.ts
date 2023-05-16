import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fontcolor'
})
export class FontcolorPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
      let color = value.includes("In stock")?"color:green":"color:darkred";
      return color;
  }

}
