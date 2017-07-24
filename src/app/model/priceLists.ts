export interface Price {
    prc_id: number;
    prc_name: string;
}

export interface PriceLists {
    prl_id: number;
    prl_name: string;
    prices: {
        [key: string]: Price
    }
}