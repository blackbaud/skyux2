import { Component } from '@angular/core';

@Component({
  selector: 'sky-toolbar-guidelines',
  templateUrl: './toolbar-guidelines.component.html',
  styleUrls: ['./toolbar-guidelines.component.scss']
})

export class SkyToolbarGuidelinesComponent {
/* tslint:disable:max-line-length */
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
      value: 'Optional. Allows users to add more than one type of record.'
    },
    {
      label: 'Notes',
      value: 'If add is the primary action, use the blue primary button styling. Otherwise, use the white secondary button styling.'
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
      value: 'Optional. Allows users to edit multiple types of records in a content container.'
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
      value: 'Optional. Allows users to select multiple choices for how to save a list, such as "Save" and "Save as."'
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
      value: 'Only visible when viewing a list as a grid.'
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
      value: 'Optional. Allows users to select from multiple export options.'
    },
    {
      label: 'Notes',
      value: 'For multiple export options, use the generic fa-file-o icon and a dropdown. For a single export option, use the icon for the file type that the option creates.'
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
      value: 'Only use the more actions button for two or more items. For a single action, display the action button in the toolbar.' }
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
    value: 'This search component should have the same interactions and highlights as other contexts where the search component is used.'
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
    value: 'For tiles or lists with no more than two simple filters, the filters can appear in the view section in place of a filter action button.'
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
    value: 'The expand all button expands all tiles on a page, and the collapse all button collapses all tiles on a page.'
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
    value: 'The view switcher changes the component that displays items in a list. It uses the styling from icon-based checkboxes to indicate which view is currently active.'
  }
];
}
