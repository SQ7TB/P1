const editorAccessKey = 'p1-editor-access';
const editorPasswordHash = 'cb2f115c79e02bc6bdd256626a2ed03d4aefc4875169e8d08e1f1be61d753afc';
const editorUsername = 'redaktor';

const editorBar = document.querySelector('#editor-bar');
const editorDialog = document.querySelector('#editor-dialog');
const editorForm = document.querySelector('#editor-login-form');
const usernameInput = document.querySelector('#editor-username');
const passwordInput = document.querySelector('#editor-password');

function setEditorMode(enabled) {
  editorBar.hidden = !enabled;
}

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

setEditorMode(sessionStorage.getItem(editorAccessKey) === 'granted');

document.querySelector('#editor-entry').addEventListener('click', () => {
  editorForm.reset();
  editorDialog.showModal();
  usernameInput.focus();
});

document.querySelector('#editor-dialog-close').addEventListener('click', () => editorDialog.close());

editorForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submittedHash = await sha256(passwordInput.value);

  if (usernameInput.value === editorUsername && submittedHash === editorPasswordHash) {
    sessionStorage.setItem(editorAccessKey, 'granted');
    setEditorMode(true);
    editorDialog.close();
    return;
  }

  passwordInput.value = '';
  passwordInput.focus();
});

document.querySelector('#editor-logout').addEventListener('click', () => {
  sessionStorage.removeItem(editorAccessKey);
  setEditorMode(false);
});
