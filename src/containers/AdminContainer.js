// in src/App.js
import React from 'react';
import { PostList } from '../posts';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
// import defaultMessages from 'ra-language-english';
// import polyglotI18nProvider from 'ra-i18n-polyglot';
// import messages from 'i18n';
import createAdminStore from '../createAdminStore';

// your app components
// import Dashboard from './Dashboard';
// import { PostList, PostCreate, PostEdit, PostShow } from './Post';
// import { CommentList, CommentEdit, CommentCreate } from './Comment';
// import { UserList, UserEdit, UserCreate } from './User';

// dependency injection
const dataProvider = restProvider('http://localhost:3000/api/categories');

// const authProvider = () => Promise.resolve();
// const i18nProvider = polyglotI18nProvider(locale => {
//     if (locale !== 'en') {
//         return messages[locale];
//     }
//     return defaultMessages;
// });
const history = createHashHistory();

const AdminContainer = () => (
    <Provider
        store={createAdminStore({
            // authProvider,
            dataProvider,
            history,
        })}
    >
        <Admin
            // authProvider={authProvider}
            dataProvider={dataProvider}
            history={history}
            title="My Admin"
        >
            <Resource name="Menus" list={PostList} />
            {/* <Resource name="comments" list={CommentList} edit={CommentEdit} create={CommentCreate} /> */}
            {/* <Resource name="users" list={UserList} edit={UserEdit} create={UserCreate} /> */}
        </Admin>
    </Provider>
);

export default AdminContainer;