let div = document.querySelector('#level-select');
let frag = document.createDocumentFragment();
let select = document.createElement('select');
select.id = 'level';

juyoOptions = [1, 2, 3, 4, 5, 6, 9];
waniKaniOptions = Array.from({length: 60}, (_, i) => i + 1);

waniKaniOptions.forEach(n => {
  select.options.add(new Option(n, n));
});

frag.appendChild(select);
div.appendChild(frag);
