try {
    const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
    console.log("PDFJS loaded via legacy build");
} catch (e) {
    console.log("Failed legacy load: " + e.message);
    try {
        const pdfjsLib = require('pdfjs-dist');
        console.log("PDFJS loaded via standard build");
    } catch(e2) {
        console.log("Failed standard load: " + e2.message);
    }
}