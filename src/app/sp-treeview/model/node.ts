import { CHECKED_VALUE_HIGHEST_SELECTED, CHECKED_VALUE_LEAVES } from "./config";

export class Node {

    constructor(
        public name: string,
        public value: any,
        public children?: Node[],
        public checked: boolean = false,
        public collapsed: boolean = false,
        public disabled: boolean = false,
        public indeterminate: boolean = false
    ) { }

    public verifyChildrenRecursive() {
        if (this.children == null) {
            return;
        }

        if (this.checked) {
            this.changeChildrenRecursive();
            return;
        }

        this.children.filter(n => n.children != null).forEach(n => n.verifyChildrenRecursive());

        this.checkImmediateChildren();
    }

    public setChecked(checked: boolean) {
        // cannot be indeterminate as selection is done
        this.indeterminate = false;
        // set new checked value
        this.checked = checked;
        // set the same checked value for all the children
        this.changeChildrenRecursive();
    }

    public changeChildrenRecursive() {
        if (this.children == null) {
            return;
        }
        this.children.forEach(n => {
            n.checked = this.checked;
            n.indeterminate = false;
            n.changeChildrenRecursive();
        });
    }

    public checkImmediateChildren() {
        let checkedChildren: number = this.children.filter(n => n.checked).length;

        let indeterminateChildren: number = this.children.filter(n => n.indeterminate).length;

        if (indeterminateChildren > 0) {
            // if indeterminate child the indeterminate
            this.checked = false;
            this.indeterminate = true;
        } else {
            // if no indeterminate child
            this.indeterminate = false;
            if (checkedChildren == this.children.length) {
                // if all checked then checked
                this.checked = true;
            } else if (checkedChildren == 0) {
                // if all unchecked then unchecked
                this.checked = false;
            } else {
                // if not all checked then indeterminate
                this.checked = false;
                this.indeterminate = true;
            }
        }
    }

    public checkedLeaves(): Node[] {
        if (!this.checked && !this.indeterminate) {
            return [];
        }
        if (this.children) {
            let values = [];
            this.children.forEach(n => {
                n.checkedLeaves().forEach(v => values.push(v));
            });
            return values;
        } else {
            return [this];
        }
    }

    public checkedAll(): Node[] {
        if (!this.checked && !this.indeterminate) {
            return [];
        }
        if (this.children) {
            let values = [];
            if (this.checked) {
                values.push(this);
            }
            this.children.forEach(n => {
                n.checkedAll().forEach(v => values.push(v));
            });
            return values;
        } else {
            return [this];
        }
    }

    public checkedHighest(): Node[] {
        if (this.checked) {
            return [this]
        }
        if (this.children) {
            let values = [];
            this.children.forEach(n => {
                n.checkedHighest().forEach(v => values.push(v));
            });
            return values;
        }
        return [];
    }

    public getCheckedValues(checkedValue: number): Node[] {
        if (checkedValue == CHECKED_VALUE_HIGHEST_SELECTED) {
            return this.checkedHighest();
        } else if (checkedValue == CHECKED_VALUE_LEAVES) {
            return this.checkedLeaves();
        } else {
            // selected values all
            return this.checkedAll();
        }
    }
}
