import { UseFormSetValue } from 'react-hook-form';

export interface PhotoUploaderProps {
	setValue: UseFormSetValue<any>;
	defaultPhoto?: string;
	name: string;
	label?: string;
}
