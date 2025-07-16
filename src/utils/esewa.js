/**
 * @param {object} paymentDetails 
 * @param {string} esewaUrl 
 */
export const redirectToEsewa = (paymentDetails, esewaUrl) => {
  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  form.setAttribute('action', esewaUrl);

  for (const key in paymentDetails) {
    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', paymentDetails[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
};