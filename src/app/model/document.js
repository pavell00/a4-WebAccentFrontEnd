"use strict";
var Document = (function () {
    function Document(fldId, docName, docDate, docDone, docSum, docNo, id) {
        this.docDone = 0;
        this.docSum = 0;
        this.docNo = '';
        this.fldId = fldId;
        this.id = id;
        this.docName = docName;
        this.docDate = docDate;
        this.docDone = docDone;
    }
    return Document;
}());
exports.Document = Document;
//# sourceMappingURL=Document.js.map