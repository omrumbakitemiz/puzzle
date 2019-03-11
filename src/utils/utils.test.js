import getBase64 from './getBase64';

test('converts file to base64 correctly', () => {
  const file = new File([''], 'filename', { type: 'image/png' });
  getBase64(file, result => {
    const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    expect(result).stringMatching(base64Regex);
  });
});
