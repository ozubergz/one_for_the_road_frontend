import React from 'react';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import simpleRestProvider from 'ra-data-simple-rest';
import createAdminStore from '../createAdminStore';
import { 
    Admin, 
    Resource, 
    ListGuesser, 
    fetchUtils, 
    ShowGuesser, 
    EditGuesser
 } from 'react-admin';

// import defaultMessages from 'ra-language-english';
// import polyglotI18nProvider from 'ra-i18n-polyglot';
// import messages from 'i18n';
// import { stringify } from 'query-string';

// your app components
import { 
    CategoryList, 
    CategoryShow, 
    ItemList, 
    ItemShow,
    ItemEdit
 } from '../adminComponents/posts';

// dependency injection
const dataProvider = simpleRestProvider('http://localhost:3000/api');
const history = createHashHistory();

// const apiUrl = 'http://localhost:3000/api';
// const httpClient = fetchUtils.fetchJson;

// dataProvider.update((resource, params) => {
//     httpClient(`${apiUrl}/${resource}/${params.id}`, {
//         method: 'PUT',
//         body: JSON.stringify(params.data),
//     }).then(({ json }) => ({ data: json }))
// });

//customize dataProvider
// dataProvider.getList('posts', {
//     pagination: { page: 1, perPage: 5 },
//     sort: { field: 'title', order: 'ASC' }
//     // filter: { author_id: 12 },
// }).then(res => console.log(res))


// const i18nProvider = polyglotI18nProvider(locale => {
//     if (locale !== 'en') {
//         return messages[locale];
//     }
//     return defaultMessages;
// });

const AdminContainer = () => (
    
    //react admin requires it's own seperate redux store
    <Provider
        store={createAdminStore({
            dataProvider,
            history,
        })}
    >
        <Admin
            dataProvider={dataProvider}
            history={history}
            title="My Admin"
        >
            <Resource 
                name="categories" 
                list={CategoryList} 
                show={CategoryShow} 
                edit={EditGuesser}
            />

            <Resource 
                name="items" 
                list={ItemList} 
                show={ItemShow} 
                edit={ItemEdit}
            />
        </Admin>
    </Provider>
);


export default AdminContainer;