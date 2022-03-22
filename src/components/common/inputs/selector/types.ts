import { Control } from 'react-hook-form';

export interface SelectorProps {
	name: string;
	noBorder?: boolean;
	disabled?: boolean;
	control: Control<any>;
}
