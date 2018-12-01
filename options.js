const juyoOptions = [1, 2, 3, 4, 5, 6, 9];
const waniKaniOptions = Array.from({length: 60}, (_, i) => i + 1);

const updateOptions = (value) => {
  let options = [];
  if (value === 'Jūyō') {
    options = juyoOptions;
  } else if (value === 'WaniKani') {
    options = waniKaniOptions;
  }

  const div = document.querySelector('#level-select');
  while (div.hasChildNodes()) {
    div.removeChild(div.firstChild);
  }
  const frag = document.createDocumentFragment();
  const select = document.createElement('select');
  select.id = 'level';

  options.forEach(n => {
    select.options.add(new Option(n, n));
  });

  frag.appendChild(select);
  div.appendChild(frag);
};

const sourceRadio = document.levelSelect.source;

sourceRadio.forEach(radio => {
  radio.addEventListener('change', () => {
    updateOptions(radio.value);
  });
});

updateOptions(sourceRadio.value);
