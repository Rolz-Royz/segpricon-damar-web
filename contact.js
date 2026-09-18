'use strict';
const services = {
  SEGPRICON: ['Seguridad privada', 'CCTV y seguridad electrónica', 'Conserjería', 'Limpieza', 'Fumigación', 'Capacitación', 'Asesoría / varios servicios'],
  DAMAR: ['Renta de vehículo', 'Traslado', 'Asesoría de movilidad']
};
const form = document.getElementById('inquiry-form');
const field = name => form.elements.namedItem(name);
const status = document.getElementById('form-status');
const rental = document.getElementById('rental-fields');
function setCompany() {
  const options = services[field('company').value] || [];
  field('service').replaceChildren(new Option('Seleccione un servicio', ''), ...options.map(text => new Option(text, text)));
  field('service').disabled = !options.length;
  const isDamar = field('company').value === 'DAMAR';
  rental.hidden = !isDamar;
  rental.disabled = !isDamar;
  status.textContent = '';
}
field('company').addEventListener('change', setCompany);
function validateDates() {
  const start = field('start').value, end = field('end').value;
  field('end').min = start;
  field('end').setCustomValidity(start && end && end < start ? 'La fecha de término debe ser igual o posterior al inicio.' : '');
}
field('start').addEventListener('change', validateDates);
field('end').addEventListener('change', validateDates);
document.querySelectorAll('[data-company]').forEach(link => link.addEventListener('click', () => {
  field('company').value = link.dataset.company;
  setCompany();
  if (link.dataset.vehicle) {
    field('service').value = 'Renta de vehículo';
    field('vehicle').value = link.dataset.vehicle;
  }
}));
// Visual demonstration only: prevent form submission, including Enter.
form.addEventListener('submit', event => event.preventDefault());
setCompany();
