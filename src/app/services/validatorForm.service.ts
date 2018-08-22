import { FormGroup } from "@angular/forms";

export class ValidatorForm
{
    messageOut: any[] = [];
    errorSystem: any[] = [];
    filterAccept = ['required','length'];

    /* Messages */
    message = {
        required: "Le champ %name% est requis.",
        length: "Le champ %name% n'est pas de la longueur autorisé."
    };

    /**
     * Syntax de check
     * form: une instance de FormGroup
     * data: 
     *  - string: le nom du filtre
     *  - object: {filter: 'nom du filtre, options: {... options du filtre ...}}
     *  - array: ['nom du filtre', 'message d'erreur', ... autres options ...]
     */
    check(form: FormGroup, data: any[]) {

        this.messageOut = [];

        /* Récupération des valeurs du formulaire */
        const value = form.value;

        /* Test des valeurs du formulaire avec les contraintes passées dans le tableau */
        for (const v of data) {
            const name = v[0];

            /* Test de l'existance du champ */
            if ( !value[name] ){
                this.errorSystem.push("Le champ '"+name+"' n'existe pas dans le formulaire.");
                continue;
            }

            /* Récupération de la value */
            const val = value[name];
            
            /* Vérification des filtres demandées */
            for (let f = 1; f < v.length; f++) {
                const fullFilter = v[f];
                /* Test du type de la variable */
                const typeVar = this.checkType(fullFilter);
                /* Récupération du nom du filtre */
                const filter = typeVar === 'string' ? fullFilter :/* String */
                                ( typeVar === 'object' ? fullFilter.filter :/* Object */
                                                ( typeVar === 'array' ? fullFilter[0] : null ) );/* Array */
                /* Récupération des options */
                const options = typeVar === 'string' ? null :/* String */
                                ( typeVar === 'object' ? fullFilter.options :/* Object */
                                                ( typeVar === 'array' ? fullFilter.slice(1) : null ) );/* Array */

                /* Si la variable passé pour le filtre n'est pas un format prit en charge */
                if ( filter === null ) {
                    this.errorSystem.push("Un filtre du champ '"+name+"' n'est pas dans un format correct.");
                    continue;
                }

                /* Gestion des filtres */
                if ( this.filterAccept.indexOf(filter) > -1 ){
                    this[filter]( name, val, options );
                }
                else{
                    this.errorSystem.push("Le filtre '"+filter+"' pour le champ '"+name+"' n'exist pas.");
                    continue;
                }
            }
        }
        
        return Object.keys(this.messageOut).length ? false : true;
    }


    /* Filtre required */
    // options = Array: [message]
    // options = Object : { message: 'mon message'}
    required(nameInput, value, options){
        const typeVar = this.checkType(options);
        /* Le test */
        if( value.length > 0 ){
            return true;
        }
        /* Si le test continue c'est qu'il est en erreur */
        if ( typeVar === 'array' && options[0] !== undefined ) {
            this.messageOut[nameInput] = options[0].replace(/%name%/ig, nameInput);
            return false;
        }
        else if ( typeVar === 'object' && options.hasOwnProperty('message') ) {
            this.messageOut[nameInput] = options.message.replace(/%name%/ig, nameInput);
            return false;
        }
        else {
            this.messageOut[nameInput] = this.message.required.replace(/%name%/ig, nameInput);
            return false;
        }

    }


    /* Filtre length */
    // options = Array : [min, max|null, message, minMessage, maxMessage]
    // options = Object : {message: '', minMessage: '', maxMessage: '', min: '', max: ''}
    lenght(nameInput, value, options){
        const typeVar = this.checkType(options);
        /* Si aucune option n'est passé pour ce test */
        if( options === null || (options[0] === null && options[1] === null) ){
            this.errorSystem.push("Le filtre 'length' doit avoir au moins une longueur minimale ou maximale.");
            return true;
        }

        /* le test */
        if ( typeVar === 'array' ) {
            if( value.length < options[0] && options[3].length ){
                this.messageOut[nameInput] = options[3].replace(/%name%/ig, nameInput).replace(/%min%/ig, options[0]);
                return false;
            }
            else if( options[1] !== null && value.length > options[1] && options[4].length ){
                this.messageOut[nameInput] = options[4].replace(/%name%/ig, nameInput).replace(/%max%/ig, options[1]);
                return false;
            }
            else if( value.length < options[0] || ( options[1] !== null && value.length > options[1] ) ){
                if ( options[2] !== null && options[2].length ){
                    this.messageOut[nameInput] = options[2].replace(/%name%/ig, nameInput).replace(/%min%/ig, options[0]).replace(/%max%/ig, options[1]);
                    return false;
                }
                else{
                    this.messageOut[nameInput] = this.message.length.replace(/%name%/ig, nameInput);
                    return false;
                }
            }
        }
        else if ( typeVar === 'object' ) {
            if( options.hasOwnProperty('min') && value.length < options.min && options.hasOwnProperty('minMessage') ){
                this.messageOut[nameInput] = options.minMessage.replace(/%name%/ig, nameInput).replace(/%min%/ig, options.min);
                return false;
            }
            else if( options.hasOwnProperty('max') && value.length > options.max && options.hasOwnPorperty('maxMessage') ){
                this.messageOut[nameInput] = options.maxMessage.replace(/%name%/ig, nameInput).replace(/%max%/ig, options.max);
                return false;
            }
            else if( value.length < options.min || ( options.hasOwnProperty('max') && value.length > options.max ) ){
                if ( options.hasOwnProperty('message') ){
                    this.messageOut[nameInput] = options.message.replace(/%name%/ig, nameInput).replace(/%min%/ig, options.min).replace(/%max%/ig, options.max);
                    return false;
                }
                else{
                    this.messageOut[nameInput] = this.message.length.replace(/%name%/ig, nameInput);
                    return false;
                }
            }
        }
        return true;
    }


    checkType (a) {
        if( a === null ){
            return false;
        }
        else if ( typeof a === 'string') {
            return 'string';
        }
        else if ( typeof a === 'object') {
            if ( Array.isArray(a) ){
                return 'array';
            }
            else if ( a.hasOwnProperty('filter') ){
                return 'object';
            }
        }
        return false;

    }
}