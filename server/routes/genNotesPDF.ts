import { Express } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../middleware/validateInput";
import { Request, Response } from "../types/express";
import { generateNotesDocument } from "../utils/generateNotesDocument";

const path = "/api/gen_notes_pdf" as const;

const Input = Record({
    notes: String,
});

type Input = Static<typeof Input>;

export const addRoute = (app: Express) => {
    app.post(
        path,
        validateInput(Input),
        async (req: Request<Input>, res: Response) => {
            const doc = generateNotesDocument(req.body.notes);

            res.setHeader("Content-Type", "application/pdf");
            res.setHeader(
                "Content-Disposition",
                `attachment; filename="My Notes.pdf"`
            );
            doc.pipe(res);
            doc.end();
        }
    );
};
