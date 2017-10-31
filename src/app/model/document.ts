export class Document{
    fldId: number;
    id?: number;
    docName: string;
    docDate: string;
    docDone: number = 0;
    docSum: number = 0;
    docNo: string = '';
    tmlId?: number;

    constructor(fldId: number, docName: string, docDate: string,
                 docDone: number, docSum: number, 
                 docNo: string, id?: number, tmlId?: number){
        this.fldId = fldId;
        this.id = id;
        this.docName = docName;
        this.docDate = docDate;
        this.docDone = docDone;
        this.tmlId = tmlId;
    }
}