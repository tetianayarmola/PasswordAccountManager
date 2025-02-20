//this function generates random ID. Does not guarantee to be unique - not use in the production setting
const uid = () => {
    let t = Date.now().toString(36).toLocaleUpperCase();
    let rand = parseInt(Math.random() * Number.MAX_SAFE_INTEGER);
    rand = rand.toString(36).slice(0, 12).padStart(12, '0').toLocaleUpperCase();
    return ''.concat(t, '-', rand);
}
