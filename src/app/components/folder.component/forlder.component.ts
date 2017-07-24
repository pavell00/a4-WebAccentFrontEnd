import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Folder, BreadCramber } from '../../model/index';
import { AppService } from '../../services/app.service';

@Component({
    moduleId: module.id,
    selector: 'folder',
    templateUrl: 'folder.component.html'
})
export class FolderComponent implements OnInit {

    private selectedFolder: Folder;
    private folders: Folder[];
    private error: any;
    private bcrambFolders: BreadCramber[] = [];

    @Output() EventFolderClick: EventEmitter<Folder> = new EventEmitter();

    constructor(private appService: AppService) { }

    ngOnInit() { this.getAll('document_type'); }

    getAll(typeSelector: string){
        //Initilize start folder ???
        this.appService.setCurrentFolder(new Folder(0, "", false, 0, typeSelector, 0));
        /*this.appService.searchFolderObserver("0").subscribe((val) => {this.folders = val});*/
        this.appService.searchFolder();
        this.appService.getFolders()
            .subscribe((val) => {this.folders = val});
        //this.appService.getCurfld().subscribe((val) => {this.error = val});
        /*this.appService.searchDocs2().subscribe(
            (v) => {this.documentsOfFolder = v}
        )*/
    }

    onSelectFolder(folder: Folder){
      //console.log(JSON.stringify(folder));
      this.selectedFolder = folder;
      //this.appService.searchDocs(String(folder.id), String(this.dateValue.toLocaleDateString()))
      this.appService.setCurrentFolder(folder);
      /*console.log('folder.component-onSelectFolder(this.appService.searchDocs2().subscribe)')
      this.appService.searchDocs2().subscribe(
          (v) => {this.documentsOfFolder = v}
      )*/
      this.EventFolderClick.emit(this.selectedFolder);
      //this.appService.searchDocs4();
    }

    onDblClick(folder: Folder){
        if (folder.isChildren) {
            this.appService.searchFolder();
            /*this.appService.searchDocs2().subscribe(
                    (v) => {this.documentsOfFolder = v}
                )*/          
            //this.appService.searchFolderObserver(String(folder.id)).subscribe((val) => {this.folders = val});
            //add items to BreadCramber Array
            this.bcrambFolders.push(new BreadCramber(folder.rootId, folder.name));
            this.appService.setBCramberObserver(this.bcrambFolders);
        }
    }

    onChangeTypeSelector(e: string){
        //console.log(e);
        this.getAll(e);
    }

    ngOnDestroy(){
        
    }
}