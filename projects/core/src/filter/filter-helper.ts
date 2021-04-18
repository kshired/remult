import { Entity } from "../entity";
import { Column } from "../column";
import { FindOptions, translateEntityWhere } from "../data-interfaces";
import { DateTimeColumn } from "../columns/datetime-column";
import { StringColumn } from "../columns/string-column";

import { AndFilter, Filter } from './filter-interfaces';
import { ObjectColumn } from "../columns/object-column";

export class FilterHelper<rowType extends Entity> {
  filterRow: rowType;
  filterColumns: Column[] = [];
  forceEqual: Column[] = [];
  constructor(private reloadData: () => void) {

  }
  isFiltered(column: Column) {
    return this.filterColumns.indexOf(column) >= 0;
  }
  filterColumn(column: Column, clearFilter: boolean, forceEqual: boolean) {
    if (!column)
      return;
    if (clearFilter) {
      this.filterColumns.splice(this.filterColumns.indexOf(column, 1), 1);
      this.forceEqual.splice(this.forceEqual.indexOf(column, 1), 1);
    }
    else if (this.filterColumns.indexOf(column) < 0) {
      this.filterColumns.push(column);
      if (forceEqual)
        this.forceEqual.push(column);
    }
    this.reloadData();
  }
  addToFindOptions(opt: FindOptions<rowType>) {
    this.filterColumns.forEach(c => {

      let val = this.filterRow.columns.find(c).value;
      let f: Filter = c.isEqualTo(val);
      if (c instanceof StringColumn) {
        let fe = this.forceEqual;
        if (fe.indexOf(c) < 0)
          f = c.contains(val);
        if (val === undefined || val == '')
          f = c.isEqualTo('');
      }
      if (c instanceof ObjectColumn) {
        let fe = this.forceEqual;
        if (fe.indexOf(c) < 0)
          f = c.contains(val);
        if (val === undefined || val == '')
          f = c.isEqualTo('');
      }
      if (c instanceof DateTimeColumn) {
        if (val) {
          let v = <Date>val;
          v = new Date(v.getFullYear(), v.getMonth(), v.getDate());

          f = c.isGreaterOrEqualTo(v).and(c.isLessThan((new Date(v.getFullYear(), v.getMonth(), v.getDate() + 1))));

        }
      }

      if (opt.where) {
        let x = opt.where;
        opt.where = r => new AndFilter(translateEntityWhere(x,r), f);
      }
      else opt.where = r => f;
    });
  }
}