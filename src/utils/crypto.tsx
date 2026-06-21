async function getKey(rawKey: string): Promise<CryptoKey> {
    const enc = new TextEncoder();
    const keyMaterial = await window.crypto.subtle.digest("SHA-256", enc.encode(rawKey));

    return window.crypto.subtle.importKey(
        "raw",
        keyMaterial,
        { name: "AES-GCM"},
        false,
        ["encrypt", "decrypt"]
    );
}

export async function encryptMessage(text: string, rawKey: string): Promise<string> {
    const enc = new TextEncoder();
    const key = await getKey(rawKey);

    const iv = window.crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await window.crypto.subtle.encrypt(
        {name: "AES-GCM", iv: iv},
        key,
        enc.encode(text)
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return btoa(String.fromCharCode(...combined));
}

export async function decryptMessage(base64Data: string, rawKey: string): Promise<string> {
    const dec = new TextDecoder();
    const key = await getKey(rawKey);

    const combined = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));

    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);

    const descrypted = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv: iv},
        key, 
        encryptedData
    );

    return dec.decode(descrypted);
}
