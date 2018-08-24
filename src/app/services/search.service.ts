export class SearchService
{
    countSearch = 0;

    onSearch(object, search): void{
        object.map( obj => {
          if(search.length > 0){
            for (let info in obj) {
              if( this.compare(search, obj[info]) ){
                obj.isHide = true;
                this.countSearch += 1;
              }
            }
          }
          else{
            obj.isHide = false;
          }
        });
    
        if(this.countSearch){
            console.log('on a des résultats');
            object.map( c => { c.isHide = !c.isHide; });
        }
        else{
          object.map( c => { c.isHide = false; });
        }
    
        this.countSearch = 0;
      }
    
      compare(search: string, compare){
        if(typeof compare === 'string'){
          
          const regexp1 = new RegExp('m','i');
    
          if ( compare.toLowerCase() === search.toLowerCase() ) {
            return true;
          }
        }
        else if (typeof compare === 'object') {
          for ( let v of compare ) {
            let tst = this.compare(search, v);
            if(tst){
              return true;
            }
          }
        }
        return false;
      }
}