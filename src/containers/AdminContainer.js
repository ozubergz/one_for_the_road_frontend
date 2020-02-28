import React from 'react';
import { connect, Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { fetchUtils, Admin, Resource, ListGuesser, ShowGuesser } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
// import defaultMessages from 'ra-language-english';
// import polyglotI18nProvider from 'ra-i18n-polyglot';
// import messages from 'i18n';
import createAdminStore from '../createAdminStore';
// import { stringify } from 'query-string';

// your app components
import { PostList } from '../adminComponents/posts';

// const apiUrl = 'http://localhost:3000/api'
// const httpClient = fetchUtils.fetchJson;

// const dataProvider = {
//     getList: (resource, params) => {
//         const { page, perPage } = params.pagination;
//         const { field, order } = params.sort;
//         const query = {
//             sort: JSON.stringify([field, order]),
//             range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
//             filter: JSON.stringify(params.filter),
//         };
//         const url = `${apiUrl}/${resource}?${stringify(query)}`;

//         return httpClient(url).then(({ headers, json }) => ({
//             data: json,
//             total: parseInt(headers.get('content-range').split('/').pop(), 10),
//         }));
//     }
// }

// dependency injection
const dataProvider = simpleRestProvider('http://localhost:3000/api');

//customize dataProvider
// dataProvider.getList('posts', {
//     pagination: { page: 1, perPage: 5 },
//     sort: { field: 'title', order: 'ASC' }
//     // filter: { author_id: 12 },
// }).then(res => console.log(res))

const history = createHashHistory();

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
            <Resource name="categories" list={PostList}/>
            <Resource name="items" list={ListGuesser} />
        </Admin>
    </Provider>
);

const mapStateToProps = state => {
    return {
        menus: state.menu
        // cartItems: state.cart
    }
}

export default connect(mapStateToProps)(AdminContainer);