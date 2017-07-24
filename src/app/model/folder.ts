export class Folder {
    id: number;
    name: string;
    isChildren: boolean;
    rootId: number;
    typeFolder: string;
    formId: number;
     
    constructor(id: number, name: string,
                isChildren: boolean, rootId: number, 
                typeFolder:string, formId: number){
        this.id = id;
        this.name = name;
        this.isChildren = isChildren;
        this.rootId = rootId;
        this.typeFolder = typeFolder;
        this.formId = formId;
    }
}
