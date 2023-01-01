import PDFDocument from "pdfkit";
export const generateNotesDocument = (notes: string) => {
    const doc = new PDFDocument({
        layout: "portrait",
        size: "A4",
    });

    doc.fontSize(25).text("Notes", 100, 80);
    doc.font("Times-Roman", 13)
        .moveDown()
        .text(notes, { width: 412, columns: 1 });

    return doc;
};
