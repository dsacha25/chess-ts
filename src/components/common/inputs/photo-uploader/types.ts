import { UseFormSetValue } from 'react-hook-form';
import { SessionDefaultPhotos } from '../../../../utils/types/session-default-photos/session-default-photos';

export interface PhotoUploaderProps {
	setValue: UseFormSetValue<any>;
	defaultPhoto?: SessionDefaultPhotos | string;
	name: string;
}
