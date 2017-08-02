import {Binders, Templates, Transactions} from './'

export class Operation {
    doc_id?: number;
    doc_name?: string;
    doc_date?: string;
    doc_no?: string;
    doc_done?: string;
    doc_sum?: number;
    doc_tag?: string;
    doc_memo?: string;
    doc_link?: number;
    st_id?: number;
    doc_ps1?: string;
    doc_ps2?: string;
    doc_ps3?: string;
    doc_pc1?: number;
    doc_pc2?: number;
    doc_pc3?: number;
    doc_pd1? :string;
    doc_pd2? :string;
    doc_pd3? :string;
    doc_pl1?: number;
    doc_pl2?: number;
    doc_pl3?: number;

    doc_bindLinks?: {
        [key: string]: Binders[];
    };
    doc_templates?: {
        [key: string]: Templates;
    };
    doc_transList?: {
        [key: string]: Transactions[];
    }

    constructor(doc_id?: number,
                doc_name?: string,
                doc_date?: string,
                doc_no?: string,
                doc_done?: string,
                doc_sum?: number,
                doc_tag?: string,
                doc_memo?: string,
                doc_link?: number,
                st_id?: number,
                doc_ps1?: string,
                doc_ps2?: string,
                doc_ps3?: string,
                doc_pc1?: number,
                doc_pc2?: number,
                doc_pc3?: number,
                doc_pd1? :string,
                doc_pd2? :string,
                doc_pd3? :string,
                doc_pl1?: number,
                doc_pl2?: number,
                doc_pl3?: number){
                this.doc_id = doc_id,
                this.doc_name=doc_name,
                this.doc_date=doc_date,
                this.doc_no=doc_no,
                this.doc_done=doc_done,
                this.doc_sum=doc_sum,
                this.doc_tag=doc_tag,
                this.doc_memo=doc_memo,
                this.doc_link=doc_link,
                this.st_id=st_id,
                this.doc_ps1=doc_ps1,
                this.doc_ps2=doc_ps2,
                this.doc_ps3=doc_ps3,
                this.doc_pc1=doc_pc1,
                this.doc_pc2=doc_pc2,
                this.doc_pc3=doc_pc3,
                this.doc_pd1=doc_pd1,
                this.doc_pd2=doc_pd2,
                this.doc_pd3=doc_pd3,
                this.doc_pl1=doc_pl1,
                this.doc_pl2=doc_pl2,
                this.doc_pl3=doc_pl3
    }
}