const fileinput = document.getElementById('fileInput');
const button = document.getElementById('button');
const apiUrl = `http://localhost:3000/`;
const copy = document.getElementById('input-container');
const card = document.getElementById('card');
const copyInnerText = document.getElementById('fileURL');

function myFunction() {
  copyInnerText.value.select();
  copyInnerText.value.setSelectionRange(0, 99999)
  document.execCommand("copy");
  alert('Text copied');
}

button.addEventListener('click', () => {
  const formData = new FormData();
  formData.append('file', fileinput.files[0]);
  console.log(formData);
  fetch(apiUrl, {
    method: 'POST',
    body: formData
  })
  .then((res) => res.json())
  .then((data) => {
    copyInnerText.value = `http://localhost:3000/${data.name}`

    copy.style.display = 'block';
    card.style.height = "350px";
  })
  .then(() => {
    console.log('job done');
  });
});