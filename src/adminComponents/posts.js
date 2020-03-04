import React from 'react';
import { 
    Edit,
    Show, 
    List, 
    SimpleForm,
    Datagrid, 
    TextField,
    TextInput,  
    NumberInput,
    ArrayField, 
    SimpleShowLayout,
    SelectInput,
    ReferenceInput, 
    ReferenceField, 
    NumberField,
    EditButton,
    ShowButton 
 } from 'react-admin';

export const CategoryList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ShowButton />
            <EditButton />
        </Datagrid>
    </List>
);

export const CategoryShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <ArrayField source="items">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                    <NumberField source="price" />
                    <ReferenceField source="category_id" reference="categories">
                        <TextField source="name" />
                    </ReferenceField>
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
);


export const ItemList = props => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <NumberField source="price" />
            <ReferenceField source="category_id" reference="categories">
                <TextField source="name" />
            </ReferenceField>
            <ShowButton/>
            <EditButton />
        </Datagrid>
    </List>
);

export const ItemShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <NumberField source="price" />
            <ReferenceField source="category_id" reference="categories">
                <TextField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);

export const ItemEdit = props => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="description" />
            <NumberInput source="price" />
            {/* <TextInput source="selections" /> */}
            <ReferenceInput source="category_id" reference="categories">
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);