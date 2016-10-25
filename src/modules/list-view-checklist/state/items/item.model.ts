export class ListViewChecklistItemModel {
  public id: string;
  public selected: boolean = false;
  public label: string;
  public description: string;
  public category: string;

  constructor(id: string, selected: boolean, data?: any) {
    this.id = id;
    this.selected = selected;

    if (data) {
      this.label = data.label;
      this.description = data.description;
      this.category = data.category;
    }
  }
}
