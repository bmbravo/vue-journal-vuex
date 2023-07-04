import { shallowMount } from '@vue/test-utils';
import EntryComponent from '@/modules/daybook/components/EntryComponent';
import { journalState } from '../../../mock-data/test-journal-state';

describe('Pruebas en el entry component', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const wrapper = shallowMount(EntryComponent, {
    props: {
      entry: journalState.entries[1],
    },
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
  });

  test('Debe de hacer match con el snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Debe de redireccionar al hacer click en el entry-container', () => {
    const entryContainer = wrapper.find('.entry-container');

    entryContainer.trigger('click');

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: 'entry',
      params: { id: journalState.entries[1].id },
    });
  });

  test('Pruebas en las propiedades computadas', () => {
    expect(wrapper.vm.day).toBe(10);
    expect(wrapper.vm.month).toBe('Julio');
    expect(wrapper.vm.yearDay).toBe('2023, Lunes');
  });
});
