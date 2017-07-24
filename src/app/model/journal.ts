export class Journal{
    docId: number;
    id: number;
    entName: string;
    jQty: number;
    jPrice: number;
    jSum: number;
    jTrNo: number;
    jLnNo: number;
    jEnt: number;
    jAg1: number;
    jAg2: number;
    jAg1name: string;
    jAg2name: string;

    constructor(docId: number, id: number,
                entName: string, jQty: number,
                jPrice: number, jSum: number,
                jTrNo: number, jLnNo: number,
                jEnt: number, jAg1: number,
                jAg2: number, jAg1name: string,
                jAg2name: string){
        this.docId = docId;
        this.id = id;
        this.entName = entName;
        this.jQty = jQty;
        this.jPrice = jPrice;
        this.jSum = jSum;
        this.jTrNo = jTrNo;
        this.jLnNo = jLnNo;
        this.jEnt = jEnt;
        this.jAg1 = jAg1;
        this.jAg2 = jAg2;
        this.jAg1name = jAg1name;
        this.jAg2name = jAg2name;
    }
}