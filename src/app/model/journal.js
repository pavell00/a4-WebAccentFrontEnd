"use strict";
var Journal = (function () {
    function Journal(docId, id, entName, jQty, jPrice, jSum, jTrNo, jLnNo, jEnt, jAg1, jAg2, jAg1name, jAg2name) {
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
    return Journal;
}());
exports.Journal = Journal;
//# sourceMappingURL=Journal.js.map