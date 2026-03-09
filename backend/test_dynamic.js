(async () => {
    try {
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
        console.log("Success dynamic import");
    } catch (e) {
        console.error("Failed dynamic import", e);
    }
})();