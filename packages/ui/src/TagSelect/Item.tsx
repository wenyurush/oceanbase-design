import RcCheckBox from 'rc-checkbox';
import classNames from 'classnames';
import {isBoolean} from 'lodash';
import React, { useEffect, useState} from 'react';
import useStyle from './style';
import { getPrefix } from '../_util';
import type {TagSelectValueType} from './Group';
import TagSelectContext from './TagSelectContext';

export interface TagSelectItemProps {
    children?: React.ReactNode;
    cover?: React.ReactNode;
    value?: string | number;
    defaultChecked?:boolean;
    checked?: boolean;
    title?: string;
    disabled?: boolean;
    style?: React.CSSProperties;
    multiple?: boolean;
    handleChange?: (value: TagSelectValueType) => void;
    onChange?: (e: any) => void;
}

const Item: React.FC<TagSelectItemProps> = ({
    children,
    handleChange,
    onChange,
    cover,
    ...restProps
}) => {
    const [checked, setChecked] = useState<boolean>(restProps.defaultChecked);

    const prefixCls = getPrefix('tag-select');
    const {wrapSSR, hashId} = useStyle(prefixCls);
    const tagSelectGroup = React.useContext(TagSelectContext);
    const wrapperClassName = classNames(
        `${prefixCls}-wrapper`,
        {
            [`${prefixCls}-checked`]: checked,
            multiple: tagSelectGroup.multiple,
            [`${prefixCls}-${tagSelectGroup.size}`]: tagSelectGroup.size,
            [`${prefixCls}-disabled`]: restProps.disabled,
            [`${prefixCls}-img`]: !!cover
        },
        hashId
    );

    useEffect(() => {
        if (isBoolean(restProps.checked)) {
            setChecked(restProps.checked);
        }
    }, [restProps.checked]);

    useEffect(() => tagSelectGroup.registerValue?.(restProps.value), [restProps.value]);

    useEffect(() => {
        if (tagSelectGroup.value?.includes(restProps.value) || restProps.checked || restProps.defaultChecked) {
            setChecked(true);
        }
        else {
            setChecked(false);
        }
    }, [tagSelectGroup.value, restProps.value]);

    const renderCover = () => {
        return (
            <div className={`${prefixCls}-cover`}>
                {typeof cover === 'string' ? (
                    <img src={cover} alt="tagselect" />
                ) : cover}
            </div>
        );
    };

    return wrapSSR(
        <label className={wrapperClassName} style={restProps.style}>
            <RcCheckBox
                {...restProps}
                checked={checked}
                prefixCls={prefixCls}
                onChange={e => {
                    if (!('checked' in restProps) && !Object.keys(tagSelectGroup).length) {
                        setChecked(e.target.checked);
                    }
                    if (onChange) {
                        onChange(e);
                    }
                    if (tagSelectGroup.handleValueChange) {
                        tagSelectGroup.handleValueChange(e.target.value);
                    }
                }}
            />
            {cover ? renderCover() : <span>{children}</span>}
        </label>
    );
};

export default Item;