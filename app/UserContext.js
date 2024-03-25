import React from 'react';

export const UserContext = React.createContext({
    uid: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    handleAuthentication: () => {},
});