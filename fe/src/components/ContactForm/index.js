import PropTypes from 'prop-types';

import { forwardRef } from 'react';

import { ButtonContainer } from './styles';

import FormGroup from '../FormGroup';
// Componentes via children
import Input from '../Input';
import Select from '../Select';
import Button from '../Button';
import useContactForm from './useContactForm';

const ContactForm = forwardRef(({ buttonLabel, onSubmit }, ref) => {
  const {
    name,
    email,
    phone,
    categories,
    categoryId,
    isFormValid,
    isSubmitting,
    isLoadingCategories,
    handleSubmit,
    setCategoryId,
    handleNameChange,
    handleEmailChange,
    handlePhoneChange,
    getErrorMessageByFieldName,
  } = useContactForm(onSubmit, ref);

  return (
    <form noValidate onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          type="text"
          error={getErrorMessageByFieldName('name')}
          value={name}
          placeholder="Nome*"
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup error={getErrorMessageByFieldName('email')}>
        <Input
          type="email"
          error={getErrorMessageByFieldName('email')}
          value={email}
          onChange={handleEmailChange}
          placeholder="E-mail"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup>
        <Input
          placeholder="Telefone"
          value={phone}
          onChange={handlePhoneChange}
          maxLength="15"
          disabled={isSubmitting}
        />
      </FormGroup>

      <FormGroup isLoading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>

      <ButtonContainer>
        <Button
          type="submit"
          disabled={!isFormValid}
          isLoading={isSubmitting}
        >
          {buttonLabel}
        </Button>
      </ButtonContainer>
    </form>
  );
});

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
