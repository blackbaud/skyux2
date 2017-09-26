import { Component } from '@angular/core';

@Component({
  selector: 'sky-toolbar-guidelines',
  templateUrl: './toolbar-guidelines.component.html',
  styleUrls: ['./toolbar-guidelines.component.scss']
})

export class SkyToolbarGuidelinesComponent {

public addButtonInfo: {label: string, value: string}[] = [
    {
      label: 'Text',
      value: 'Add'
    },
    {
      label: 'Icon',
      value: 'fa-plus-circle'
    },
    {
      label: 'Dropdown',
      value: 'Optional. Used if adding more than one type of record.'
    },
    {
      label: 'Notes',
      value: 'When add is the primary action in a list, use the blue primary button styling. In all other cases, use the white secondary button styling.'
    }
  ];
  
public editButtonInfo: {label: string, value: string}[] = [
    {
      label: 'Text',
      value: 'Edit'
    },
    {
      label: 'Icon',
      value: 'fa-pencil'
    },
    {
      label: 'Dropdown',
      value: 'Optional. Used if there are multiple types of records to edit in a given content container.'
    }
  ];
  
public saveButtonInfo: {label: string, value: string}[] = [
    {
      label: 'Text',
      value: 'Save'
    },
    {
      label: 'Icon',
      value: 'fa-save'
    },
    {
      label: 'Dropdown',
      value: 'Optional. Used if there are multiple choices for how to save a list, such as "Save" and "Save as".'
    }
  ];
  
public filterButtonInfo: {label: string, value: string}[] = [
    {
      label: 'Text',
      value: 'Filter'
    },
    {
      label: 'Icon',
      value: 'fa-filter'
    },
    {
      label: 'Dropdown',
      value: 'None'
    }
  ];
  
public sortButtonInfo: {label: string, value: string}[] = [
    {
      label: 'Text',
      value: 'Sort'
    },
    {
      label: 'Icon',
      value: 'fa-sort'
    },
    {
      label: 'Dropdown',
      value: 'None'
    }
  ];

public columnsButtonInfo: {label: string, value: string}[] = [
    {
      label: 'Text',
      value: 'Columns'
    },
    {
      label: 'Icon',
      value: 'fa-columns'
    },
    {
      label: 'Dropdown',
      value: 'None'
    },
    {
      label: 'Notes',
      value: 'The columns button is only visible when viewing a list as a grid.'
    }
  ];
  
public shareButtonInfo: {label: string, value: string}[] = [
    {
      label: 'Text',
      value: 'Share'
    },
    {
      label: 'Icon',
      value: 'fa-share'
    },
    {
      label: 'Dropdown',
      value: 'None'
    }
  ];
  
public exportButtonInfo: {label: string, value: string}[] = [
    {
      label: 'Text',
      value: 'Export'
    },
    {
      label: 'Icon',
      value: 'fa-file-o, fa-file-excel-o, or fa-file-pdf-o'
    },
    {
      label: 'Dropdown',
      value: 'Optional. Used if there are multiple ways to export the data.'
    },
    {
      label: 'Notes',
      value: 'If there are multiple ways to export, use the generic fa-file-o icon with a dropdown that has choices for how to export. If there is only one way to export, use the appropriate icon for thetype of file that will be created.'
    }
  ];
  
public moreButtonInfo: {label: string, value: string}[] = [
    {
      label: 'Text',
      value: 'More'
    },
    {
      label: 'Icon',
      value: 'fa-ellipsis-h'
    },
    {
      label: 'Dropdown',
      value: 'None'
    },
    {
      label: 'Notes',
      value: 'The more actions button should only appear if there are at least two items in it. If there is only one additional action, show the button for that action instead of more actions.' }
  ];
  
  public findBoxInfo: {label: string, value: string}[] = [
    {
      label: 'Text',
      value: 'Find in this list'
    },
    {
      label: 'Icon',
      value: 'fa-search'
    },
    {
      label: 'Notes',
      value: 'This is the search component, and it should have the same interactions and highlights as other contexts where the search component is used.' 
    }
  ];
  
  public simpleFiltersInfo: {label: string, value: string}[] = [
    {
      label: 'Used in',
      value: 'Tiles, record pages, or lists'
    },
    {
      label: 'Icon',
      value: 'None'
    },
    {
      label: 'Notes',
      value: 'For tiles or lists that need no more than two filters, those filters can appear in the view section on the right of the toolbar in place of a filter action button.' 
    }
  ];
  
  public expandCollapseInfo: {label: string, value: string}[] = [
    {
      label: 'Used in',
      value: 'Record pages'
    },
    {
      label: 'Icon',
      value: 'fa-angle-double-down, fa-angle-double-up'
    },
    {
      label: 'Notes',
      value: 'The expand all button expands all of the tiles on the current page, and the collapse all button collapses all of the tiles on the current page.'
    }
  ];
  
  public viewSwitcherInfo: {label: string, value: string}[] = [
    {
      label: 'Used in',
      value: 'Lists'
    },
    {
      label: 'Icon',
      value: 'fa-table, fa-list, fa-th-large, fa-map-marker'
    },
    {
      label: 'Notes',
  value: 'The view switcher changes the component that is used to display the items ina list. It uses the styling from icon based checkboxes to indicate which view is currently active.'
    }
  ];
  
}
