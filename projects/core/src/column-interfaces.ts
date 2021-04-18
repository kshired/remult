import { Allowed } from './context';
import { Column } from './column';

import { Entity } from './entity';
import { ValueListColumn } from './columns/value-list-column';




export interface ColumnStorage<valueType> {
    toDb(val: valueType): any;
    fromDb(val: any): valueType;
}



export interface ColumnSettings<valueType = any> {
    key?: string;
    includeInApi?: Allowed;
    allowApiUpdate?: Allowed;
    caption?: string;
    defaultValue?: ValueOrExpression<valueType>;
    validate?: ColumnValidator<valueType> | ColumnValidator<valueType>[];
    valueChange?: () => void;
    inputType?: string;
    dbName?: string;
    sqlExpression?: ValueOrExpression<string>;
    serverExpression?: () => valueType | Promise<valueType>;
    dbReadOnly?: boolean;
    allowNull?: boolean;
    displayValue?: () => string;

}
export declare type ColumnValidator<valueType = any> = (col: Column<valueType>) => void | Promise<void>;

export declare type ValueOrExpression<valueType> = valueType | (() => valueType);
export declare type ValueOrEntityExpression<valueType, entityType extends Entity> = valueType | ((e: entityType) => valueType);

export function valueOrExpressionToValue<T>(f: ValueOrExpression<T>): T {
    if (typeof f === 'function') {
        let x = f as any;
        return x();
    }
    return <T>f;
}
export function valueOrEntityExpressionToValue<T, entityType extends Entity>(f: ValueOrEntityExpression<T, entityType>, e: entityType): T {
    if (typeof f ==='function') {
        let x = f as any;
        return x(e);
    }
    return <T>f;
}







export interface ValueListItem {
    id?: any;
    caption?: any;
}

