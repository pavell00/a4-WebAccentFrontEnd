"use strict";
var Folder = (function () {
    function Folder(id, name, isChildren, rootId, typeFolder, formId) {
        this.id = id;
        this.name = name;
        this.isChildren = isChildren;
        this.rootId = rootId;
        this.typeFolder = typeFolder;
        this.formId = formId;
    }
    return Folder;
}());
exports.Folder = Folder;
//# sourceMappingURL=Folder.js.map