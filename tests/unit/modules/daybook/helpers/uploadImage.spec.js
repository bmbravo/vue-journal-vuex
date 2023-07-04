import cloudinary from 'cloudinary';
import uploadImage from '@/modules/daybook/helpers/uploadImage';
import axios from 'axios';

cloudinary.config({
  cloud_name: 'ddqeyulq2',
  api_key: '768652137973387',
  api_secret: '_5PQeHyxiTsHphgqa0s0nzQvfgE',
});

describe('Pruebas en el uplaod image', () => {
  test('Debe de cargar un archico y retornar el url', async () => {
    const { data } = await axios.get(
      'https://res.cloudinary.com/ddqeyulq2/image/upload/v1687838606/zdis2bwhfx69u3g3jdck.png',
      {
        responseType: 'arraybuffer',
      }
    );

    const file = new File([data], 'foto.png');

    const url = await uploadImage(file);

    expect(typeof url).toBe('string');

    //Tomar el id de la imagen
    const segments = url.split('/');

    const imgId = segments[segments.length - 1].replace('.png', '');

    cloudinary.v2.api.delete_resources(imgId);
  });
});
