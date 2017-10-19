import {Binders, Transactions} from './'

export class Op{
    constructor(
        public doc_id?: number,
        public doc_name?: string,
        public doc_date?: string,
        public doc_no?: string,
        public doc_done?: string,
        public doc_sum?: number,
        public doc_tag?: string,
        public doc_memo?: string,
        public doc_link?: number,
        public st_id?: number,
        public doc_ps1?: string,
        public doc_ps2?: string,
        public doc_ps3?: string,
        public doc_pc1?: number,
        public doc_pc2?: number,
        public doc_pc3?: number,
        public doc_pd1? :string,
        public doc_pd2? :string,
        public doc_pd3? :string,
        public doc_pl1?: number,
        public doc_pl2?: number,
        public doc_pl3?: number,
        public tml_id?: number,
        public fld_id?: number,
        public frm_id?: number,
        public binders?: Binders[],
        public transactions?: Transactions[]
    ){}
}