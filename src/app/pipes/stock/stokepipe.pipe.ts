import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stocking'
})
export class StokepipePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): string {
    let str = value > 0 ? 'In stock':'out of stock'
    return str;
  }

}
