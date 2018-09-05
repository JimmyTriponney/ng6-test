export class SearchService
{
    countSearch = 0;

    onSearch(object, search: string): void{
      object.map( c => { c.isHide = false; });
      object.map( obj => {
        if( typeof search === 'string' /*search.length > 0*/ ){
          for (const info in obj) {
            if( this.compare(search, obj[info]) ){
              obj.isHide = true;
              this.countSearch += 1;
            }
          }
        }
        else {
          obj.isHide = false;
        }
      });

      if (this.countSearch) {
          object.map( c => { c.isHide = !c.isHide; });
      }
      else {
        object.map( c => { c.isHide = false; });
      }

      this.countSearch = 0;
    }

      compare(search: string, compare){
        if (typeof compare === 'string') {

          const regexp1 = new RegExp(search,'i');

          //NIVEAU 1 //Comperaison complète et non senssible à la case
          if ( compare.toLowerCase() === search.toLowerCase() ) {
            return true;
          }
          //NIVEAU 3 //Comperaison partielle et non senssible à la case
          else if ( compare.search(regexp1) > -1 ) {
            return true;
          }

        }
        else if (typeof compare === 'object') {
          for ( let v of compare ) {
            return this.compare(search, v);
          }
        }
        return false;
      }
}