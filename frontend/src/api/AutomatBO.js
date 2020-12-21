import NamedBusinessObject from './NamedBusinessObject';

export default class AutomatBO extends NamedBusinessObject{

    constructor(aCurrentState) {
        super();
        this.current_state = aCurrentState;
        this.state_id = 1;
    }

}
