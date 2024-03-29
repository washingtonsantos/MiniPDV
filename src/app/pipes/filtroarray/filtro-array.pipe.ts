import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArray'
})
export class FiltroArrayPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return [];

    searchText = searchText.toLowerCase();
        return items.filter( it => {
          return it.descricao.toLowerCase().includes(searchText) || String(it.id) === searchText;
        });
   }

}
