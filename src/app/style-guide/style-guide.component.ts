import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { Sort } from '@angular/material/sort';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface Dessert {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}
interface FoodNode {
  name: string;
  children?: FoodNode[];
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [{name: 'Apple'}, {name: 'Banana'}, {name: 'Fruit loops'}],
  },
  {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [{name: 'Broccoli'}, {name: 'Brussels sprouts'}],
      },
      {
        name: 'Orange',
        children: [{name: 'Pumpkins'}, {name: 'Carrots'}],
      },
    ],
  },
];
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'snack-bar-annotated-component-example',
  templateUrl: 'snack-bar-annotated-component-example.html',
  styleUrls: ['./style-guide.component.scss'],
})
export class SnackBarAnnotatedComponentExample {
  snackBarRef = inject(MatSnackBarRef);
}

@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.component.html',
  styleUrls: ['./style-guide.component.scss'],
})

export class StyleGuideComponent {
  treeControl = new NestedTreeControl<FoodNode>(node => node.children);
  dataSources = new MatTreeNestedDataSource<FoodNode>();
  desserts: Dessert[] = [
    {name: 'Frozen yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcake', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 4},
  ];

  sortedData: Dessert[];

  constructor(private _snackBar: MatSnackBar, private _formBuilder: FormBuilder, public dialog: MatDialog, private _bottomSheet: MatBottomSheet) {
    this.sortedData = this.desserts.slice();
    this.dataSources.data = TREE_DATA;
  }
  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});

  hidden = false;

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
  panelOpenState = false;

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
  ];
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  showFiller = false;

  formatLabel(value: number): string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }
  

  durationInSeconds = 5;

  
  openSnackBar() {
    this._snackBar.openFromComponent(SnackBarAnnotatedComponentExample, {
      duration: this.durationInSeconds * 1000,
    });
  }
  sortData(sort: Sort) {
    const data = this.desserts.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'calories':
          return compare(a.calories, b.calories, isAsc);
        case 'fat':
          return compare(a.fat, b.fat, isAsc);
        case 'carbs':
          return compare(a.carbs, b.carbs, isAsc);
        case 'protein':
          return compare(a.protein, b.protein, isAsc);
        default:
          return 0;
      }
    });
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  hasChild = (_: number, node: FoodNode) => !!node.children && node.children.length > 0;
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
  standalone: true,
  imports: [ MatListModule ],
})
export class BottomSheetOverviewExampleSheet {
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}