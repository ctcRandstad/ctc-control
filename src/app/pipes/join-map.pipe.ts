import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'joinMap',

})
export class JoinMapPipe implements PipeTransform {
  transform(value: any[], key: string): string {
    return value.map(item => item[key]).join(', ');
  }
}
