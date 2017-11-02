import {Binders, TransactionShortView, Op} from './'

export class OperationShortView {
    id?: number;
    docName: string = '';
    docDate: string = '';
    docDone: number = 0;
    docSum: number = 0;
    docNo: string = '';
    tmlName: string ='';
    docAgFromName: string= '';
    docAgToName: string= '';
    priceListName: string = '';
    priceName: string = '';
    folderName: string = '';
    lastChange: string = '';
    links: Op[] = [];
    binders: Binders[] = [];
    trnasList: TransactionShortView[] = [];

    constructor(docName: string, docDate: string,
                docDone: number, docSum: number,
                docNo: string, tmlName: string,
                docAgFromName: string, docAgToName: string,
                priceListName: string, priceName: string,
                folderName: string, lastChange: string,
                links: Op[], binders: Binders[],
                trnasList: TransactionShortView[],
                id?: number){
        this.id = id;
        this.docName = docName;
        this.docDate = docDate;
        this.docDone = docDone;
        this.tmlName = tmlName;
        this.docAgFromName = docAgFromName;
        this.docAgToName = docAgToName;
        this.priceListName = priceListName;
        this.priceName = priceName;
        this.folderName = folderName;
        this.lastChange = lastChange;
        this.links = links;
        this.binders = binders;
        this.trnasList = trnasList;
    }
}