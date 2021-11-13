import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Type } from './enum/type.enum';
import { XTool } from './interface/xtool';
import { XtoolService } from './xtool.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public tools!: XTool[];
  public editTool!: XTool;
  public deleteTool!: XTool;
  public dateTemp!: Date;

  
  constructor(private toolService: XtoolService){}

  ngOnInit(){
    this.getTools();
  }

  public showByType(toolType: string) {
    if (toolType == 'TOOL_H'){return Type['TOOL_H'];}
    else if (toolType == 'TOOL_B'){return Type['TOOL_B'];}
    else if (toolType == 'TOOL_S'){return Type['TOOL_S'];}
    else if (toolType == 'TOOL_C'){return Type['TOOL_C'];}
    else if (toolType == 'TOOL_A'){return Type['TOOL_A'];}
    else if (toolType == 'TOOL_R'){return Type['TOOL_R'];}
    else if (toolType == 'TOOL_D'){return Type['TOOL_D'];}
    else if (toolType == 'TOOL_T'){return Type['TOOL_T'];}
    else if (toolType == 'TOOL_M'){return Type['TOOL_M'];}
    else if (toolType == 'TOOL_F'){return Type['TOOL_F'];}
    else if (toolType == 'TOOL_X'){return Type['TOOL_X'];}
    else return '';
  }

  public getTools(): void{
    this.toolService.getTools().subscribe(
      (response: XTool[]) => {
        this.tools = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  filterTools(type: Type): void {
    if (type == 'Alle'){
      this.getTools();
    }
    else{
      this.toolService.filterTools(type).subscribe(
        (response: XTool[]) => {
          this.tools = response;
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
  }

  public searchTools(key: string): void {
    const results: XTool[] = [];
    for (const tool of this.tools) {
      if (tool.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || tool.serialnumber.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || tool.notes.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(tool);
      }
    }
    this.tools = results;
    if (results.length === 0 || !key) {
      this.getTools();
    }
  }

  public onAddTool(addForm: NgForm): void {
    document.getElementById('add-tool-form')!.click();
    this.toolService.addTool(addForm.value).subscribe(
      (response: XTool) => {
        console.log(response);
        this.getTools();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateTool(tool: XTool): void {
    this.toolService.updateTool(tool).subscribe(
      (response: XTool) => {
        console.log(response);
        this.getTools();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteTool(toolid: number) : void {
    this.toolService.deleteTool(toolid).subscribe(
      (response: void) => {
        console.log(response);
        this.getTools();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModalAdd(): void {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addToolModal');
    container.appendChild(button);
    button.click();
  }

  public onOpenModal(tool: XTool, mode: string): void {
    const container = document.getElementById('main-container')!;
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editTool = tool;
      button.setAttribute('data-target', '#updateToolModal');
    }
    if (mode === 'delete') {
      this.deleteTool = tool;
      button.setAttribute('data-target', '#deleteToolModal');
    }
    container.appendChild(button);
    button.click();
  }
}
