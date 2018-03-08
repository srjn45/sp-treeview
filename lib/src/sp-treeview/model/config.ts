
export const SELECT_NONE = 0;
export const SELECT_CHECKBOX = 1;
export const SELECT_RADIO = 2;

export const CHECKED_VALUE_ALL = 0;
export const CHECKED_VALUE_LEAVES = 1;
export const CHECKED_VALUE_HIGHEST_SELECTED = 2;

export class Config {

    constructor(
        public select = SELECT_NONE,
        public checkedValue = CHECKED_VALUE_LEAVES,
        public deleteNode = false,
        public addChild = false,
        public addChildOnLeaves = false,
        public filter = true,
        public height = 'auto',
        public showDropdownDefault = false
    ) { }

}
