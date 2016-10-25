export class ListViewChecklistItemModel {
  public id: any;
  public selected: boolean = false;
  public label: string;
  public description: string;
  public category: string;

  constructor(id, selected, data?: any) {
    this.id = id;
    this.selected = selected;

    if (data) {
      this.label = data.label;
      this.description = data.description;
      this.category = data.category;
    }
  }
}
