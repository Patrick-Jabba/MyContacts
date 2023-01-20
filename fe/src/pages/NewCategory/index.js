import { useRef } from 'react';

import delay from '../../utils/delay';
import toast from '../../utils/toast';

import services from '../../services';

import PageHeader from '../../components/PageHeader';
import CategoryForm from '../../components/CategoryForm';

export default function NewCategory() {
  const categoryFormRef = useRef(null);

  async function handleSubmit(category) {
    try {
      await delay(2000);
      await services.categories.createCategory(category);

      categoryFormRef.current.resetFields();
      toast({
        type: 'success',
        text: 'Categoria cadastrada com sucesso!',
      });
    } catch (error) {
      toast({
        type: 'danger',
        text: `${error.response.data.error}`,
      });
    }
  }
  return (
    <>
      <PageHeader
        title="Nova Categoria"
      />
      <CategoryForm
        ref={categoryFormRef}
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
