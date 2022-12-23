import PDFDocument from "pdfkit";
export const generateCompletionCertificationDocument = (
    studentName: string,
    courseName: string
) => {
    const doc = new PDFDocument({
        layout: "landscape",
        size: "A4",
    });

    // Helper to move to next line
    const jumpLine = (lines: number) => {
        for (let index = 0; index < lines; index++) {
            doc.moveDown();
        }
    };

    doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");

    doc.fontSize(10);

    // Margin
    const distanceMargin = 18;

    doc.fillAndStroke("#ae8cc3")
        .lineWidth(20)
        .lineJoin("round")
        .rect(
            distanceMargin,
            distanceMargin,
            doc.page.width - distanceMargin * 2,
            doc.page.height - distanceMargin * 2
        )
        .stroke();

    doc.fillAndStroke("#fff")
        .lineWidth(7)
        .lineJoin("round")
        .rect(
            distanceMargin,
            distanceMargin,
            doc.page.width - distanceMargin * 2,
            doc.page.height - distanceMargin * 2
        )
        .stroke();

    // Header
    const maxWidth = 140;
    const maxHeight = 70;

    jumpLine(10);

    doc.font("Courier").fontSize(50).fill("#021c27").text(courseName, {
        align: "center",
    });
    doc.font("Times-Roman");
    jumpLine(1);

    // Content
    doc.fontSize(20).fill("#021c27").text("CERTIFICATE OF COMPLETION", {
        align: "center",
    });

    jumpLine(1);

    doc.fontSize(15).fill("#021c27").text("Presented to", {
        align: "center",
    });

    jumpLine(2);

    doc.font("Times-Bold").fontSize(30).fill("#021c27").text(studentName, {
        align: "center",
    });

    jumpLine(1);

    jumpLine(7);

    doc.lineWidth(1);

    return doc;
};
