(async () => {
    try {
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
        console.log("Keys:", Object.keys(pdfjsLib));
        if (pdfjsLib.getDocument) console.log("Has named export getDocument");
        if (pdfjsLib.default && pdfjsLib.default.getDocument) console.log("Has default export getDocument");
    } catch (e) {
        console.error("Failed dynamic import", e);
    }
})();