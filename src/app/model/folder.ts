export class Folder {
    id: number;
    name: string;
    isChildren: boolean;
    rootId: number;
    typeFolder: string;
    tmlId: number;
     
    constructor(id: number, name: string,
                isChildren: boolean, rootId: number, 
                typeFolder:string, tmlId: number){
        this.id = id;
        this.name = name;
        this.isChildren = isChildren;
        this.rootId = rootId;
        this.typeFolder = typeFolder;
        this.tmlId = tmlId;
    }
}
