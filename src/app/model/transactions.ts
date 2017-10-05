export class Transactions {
    
    constructor(
        public j_id?: number,
        public acc_db?: number,
        public acc_cr?: number,
        public j_done?: number,
        public j_ag1?: number,
        public j_ag2?: number,
        public j_ent?: number,
        public j_ln_no?: number,
        public j_tr_no?: number,
        public j_qty?: number,
        public j_price?: number,
        public j_sum?: number,
        public j_un?: number,
        public mc_id?: number,
        public j_date?: string,
        public entNom?: string,
        public entName?: string,
        public unName?: string,
    ){}

}