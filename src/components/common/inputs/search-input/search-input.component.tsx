import React, { FC } from 'react';
import FormInput from '../form-input/form-input.component';
import { SearchButton, SearchInputContainer } from './search-input.styles';
import { MdSearch } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { SearchInputProps } from './types';

const SearchInput: FC<SearchInputProps> = (props) => {
	const { handleSubmit } = useForm();
	return (
		<SearchInputContainer onSubmit={handleSubmit(props.onSubmit)}>
			<FormInput label={props.label} />
			<SearchButton color="main">
				<MdSearch size="30px" />
			</SearchButton>
		</SearchInputContainer>
	);
};

export default SearchInput;
