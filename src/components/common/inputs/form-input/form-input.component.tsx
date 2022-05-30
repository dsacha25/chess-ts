import React, { forwardRef } from 'react';
import {
	FormInputComponent,
	FormInputWrapper,
	InputLabel,
} from './form-input.styles';
import { FormInputProps } from './types';

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
	return (
		<FormInputWrapper className={props.className} margin={props.margin}>
			<FormInputComponent ref={ref} {...props} />
			{props.label && (
				<InputLabel className={props.hasData ? 'shrink' : ''}>
					{props.label}
				</InputLabel>
			)}
		</FormInputWrapper>
	);
});

export default FormInput;
