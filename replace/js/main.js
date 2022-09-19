const originalTextInput = document.querySelector('#original-text');
const finalTextInput = document.querySelector('#final-text');

document
    .querySelector('.replace_all')
    .addEventListener('click', event => {
        let originalText = originalTextInput.value;

        finalTextInput.value = originalText.replace(/\'/g, "\"");
    });

document
    .querySelector('.replace_apostrophe')
    .addEventListener('click', event => {
        let originalText = originalTextInput.value;

        finalTextInput.value = originalText.replace(/(\'\B)|(\B\'\b)/g, "\"");
    });