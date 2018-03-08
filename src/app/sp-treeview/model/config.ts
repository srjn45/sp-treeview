
export const SELECT_NONE: number = 0;
export const SELECT_CHECKBOX: number = 1;
export const SELECT_RADIO: number = 2;

export const CHECKED_VALUE_ALL: number = 0;
export const CHECKED_VALUE_LEAVES: number = 1;
export const CHECKED_VALUE_HIGHEST_SELECTED: number = 2;

export class Config {

    constructor(
        public select: number = SELECT_NONE,
        public checkedValue: number = CHECKED_VALUE_LEAVES,
        public deleteNode: boolean = false,
        public addChild: boolean = false,
        public addChildOnLeaves: boolean = false,
        public filter: boolean = true,
        public height: string = "auto",
        public showDropdownDefault = false
    ) { }

}
