function generatePrompt() {
  const s = id => document.getElementById(id).value;
  let descriptionDetails = s('subjek');
  if (s('genre')) descriptionDetails += `, ${s('genre')} theme`;
  if (s('negara')) descriptionDetails += `, ${s('negara')}`;
  if (s('gayaRambut')) descriptionDetails += `, hairstyle: ${s('gayaRambut')}`;
  if (s('warnaRambut')) descriptionDetails += `, hair color: ${s('warnaRambut')}`;
  if (s('pakaian')) descriptionDetails += `, ${s('pakaian')}`;
  if (s('ekspresi')) descriptionDetails += `, expression: ${s('ekspresi')}`;
  if (s('pose')) descriptionDetails += `, ${s('pose')}`;
  if (s('kamera')) descriptionDetails += `, ${s('kamera')}`;
  if (s('latar')) descriptionDetails += `, background: ${s('latar')}`;
  if (s('detail')) descriptionDetails += `, ${s('detail')}`;
  if (s('gaya')) descriptionDetails += `, art style: ${s('gaya')}`;

  const aspectRatio = s('rasio');
  const model = s('model');
  const count = s('count');
  const negativePrompt = s('negative');
  const parameters = s('parameter');

  const formattedPrompt = 
`┌Image Description:
├┬Prompt:
│└Description Details: ${descriptionDetails}
├Model: ${model}
├Count: ${count}
├Aspect Ratio: ${aspectRatio}
├Negative prompt: ${negativePrompt}
└Parameters: ${parameters}`;

  document.getElementById('output').textContent = formattedPrompt;
  displayJsonRealtime();
}

function displayJsonRealtime() {
  const s = id => document.getElementById(id).value;
  const data = {
    DescriptionDetails: s('subjek') || null,
    Model: s('model') || null,
    Count: s('count') || null,
    AspectRatio: s('rasio') || null,
    NegativePrompt: s('negative') || null,
    Parameters: s('parameter') || null
  };

  for (const key in data) {
    if (data[key] === null || data[key] === '') {
      delete data[key];
    }
  }

  document.getElementById('outputJSON').textContent = JSON.stringify(data, null, 2);
}
