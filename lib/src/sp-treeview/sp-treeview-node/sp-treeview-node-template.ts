import { Node } from '../model/node';
import { Config } from '../model/config';

export interface SpTreeviewNodeTemplate {
    node: Node;
    config: Config;

    onCollapseExpand: () => void;
    onCheckChange: () => void;
    onRadioChange: () => void;
    onDelete: () => void;
    onAddChild: () => void;
}
