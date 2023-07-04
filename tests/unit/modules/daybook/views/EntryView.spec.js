import { createStore } from 'vuex';
import { shallowMount } from '@vue/test-utils';
import journal from '@/modules/daybook/store/journal';
import { journalState } from '../../../mock-data/test-journal-state';
import EntryView from '@/modules/daybook/views/EntryView';
import Swal from 'sweetalert2';

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  });

jest.mock('sweetalert2', () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  close: jest.fn(),
}));

describe('Pruebas en el EntryView', () => {
  const store = createVuexStore(journalState);

  store.dispatch = jest.fn();

  const mockRouter = {
    push: jest.fn(),
  };

  let wrapper;

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(EntryView, {
      props: {
        id: 'ABC123',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });
  });

  test('Debe de sacar al usuario porque el Id no existe', () => {
    const wrapper = shallowMount(EntryView, {
      props: {
        id: 'este id no existe en el store',
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    });

    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });

  test('Debe de mostrar la entrada correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot();
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test('Debe de borrar la entrada y salir', (done) => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }));

    wrapper.find('.btn-danger').trigger('click');

    expect(Swal.fire).toHaveBeenCalledWith({
      title: '¿Está seguro?',
      text: 'Una vez borrado, no se podrá recuperar la entrada',
      showDenyButton: true,
      confirmButtonText: 'Si, estoy seguro',
    });

    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        'journal/deleteEntry',
        'ABC123'
      );
      expect(mockRouter.push).toHaveBeenCalled();
      done();
    }, 1);
  });
});
