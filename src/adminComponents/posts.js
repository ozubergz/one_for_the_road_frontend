import React from 'react';
import { List, Datagrid, TextField, ArrayField, SingleFieldList, ChipField } from 'react-admin';

export const PostList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ArrayField source="items">
                <SingleFieldList>
                    {/* <ChipField source="id" /> */}
                    <ChipField source="name" />
                </SingleFieldList>
            </ArrayField>
        </Datagrid>
    </List>
);