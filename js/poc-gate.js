const accessKey = 'p1-poc-access';
const expectedHash = '4a9ee3ef9701fbc0221d7b9a6dc7155c061cfd4524873cebadf9fc69c17b8667';

if (sessionStorage.getItem(accessKey) === 'granted') {
  window.location.replace('site.html');
}

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

document.querySelector('#access-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const input = document.querySelector('#password');
  const submittedHash = await sha256(input.value);

  if (submittedHash === expectedHash) {
    sessionStorage.setItem(accessKey, 'granted');
    window.location.replace('site.html');
    return;
  }

  input.value = '';
  input.focus();
});
