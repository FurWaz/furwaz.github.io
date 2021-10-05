var alphabet, key, ready = false;
export function setupEncryptAttributs(a, k) {ready=true;alphabet=a;key=k;}
export function isEncryptionReady() {return ready;}
export function getEncrypted(x, l) {
    var n = "";
    var d = 0;
    var c = 0;
    for (let i = 0; i < x.length; i++) {
        for (let j = 0; j < alphabet.length; j++) {
            if (alphabet[j] == x[i]) d = j;
        }
        for (let j = 0; j < key.length; j++) {
            c += parseInt(key, 10);
        }
        c = (c + d + l) % alphabet.length;
        n += alphabet[c];
    }
    return n;
}