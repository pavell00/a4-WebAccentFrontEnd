import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Folder, BreadCramber } from '../../model';
import { AppService } from '../../services/app.service';

@Component({
    selector: 'folder',
    templateUrl: './folder.component.html',
    styleUrls: ['./folder.component.css']
})
export class FolderComponent implements OnInit {

    selectedFolder: Folder;
    folders: Folder[] = [];
    private error: any;
    private bcrambFolders: BreadCramber[] = [];

    @Output() EventFolderClick: EventEmitter<Folder> = new EventEmitter();

    constructor(private appService: AppService) { }

    ngOnInit() { this.getAll('document_type'); }

    getAll(typeSelector: string){
        //Initilize start folder ???
        this.appService.setCurrentFolder(new Folder(0, "", false, 0, typeSelector, 0));
        this.appService.searchFolder();
        this.appService.getFolders()
            .subscribe(
                (val) => {this.folders = val}
            );
    }

    onSelectFolder(folder: Folder){
      this.selectedFolder = folder;
      this.appService.setCurrentFolder(folder);
      this.EventFolderClick.emit(this.selectedFolder);
      this.appService.searchDocs4();
    }

    onExpandFolder(folder: Folder){
        this.onSelectFolder(folder);
        if (folder.isChildren) {
            this.appService.setCurrentFolder(folder);
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
}
