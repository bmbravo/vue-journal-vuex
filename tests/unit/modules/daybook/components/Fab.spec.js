import FabComponent from '@/modules/daybook/components/FabComponent';
import { shallowMount } from '@vue/test-utils';

describe('Pruebas en el fab component', () => {
  test('Debe mostrar el icono por defecto', () => {
    const wrapper = shallowMount(FabComponent);
    const iTag = wrapper.find('i');

    expect(iTag.classes('fa-plus')).toBeTruthy();
  });

  test('Debe de mostrar el icono por argumento: fa-circle', () => {
    const wrapper = shallowMount(FabComponent, {
      props: { icon: 'fa-circle' },
    });
    const iTag = wrapper.find('i');

    expect(iTag.classes('fa-circle')).toBeTruthy();
  });

  test('Debe de emitir el evento on:click cuando se hace click', () => {
    const wrapper = shallowMount(FabComponent);

    wrapper.find('button').trigger('click');

    expect(wrapper.emitted('on:click')).toHaveLength(1);
  });
});
