import { Pipe, PipeTransform } from '@angular/core';

const fibCache = new Map<number, number>();
const fibonacci = (num: number): number => {
  if (num === 1 || num === 2) {
    return 1;
  }

  if (fibCache.has(num)) {
    return fibCache.get(num)!;
  }

  const result = fibonacci(num - 1) + fibonacci(num - 2);
  fibCache.set(num, result);
  return result;
};

@Pipe({
  name: 'calculate',
})
export class CalculatePipe implements PipeTransform {
  transform(value: number): number {
    return fibonacci(value);
  }
}
