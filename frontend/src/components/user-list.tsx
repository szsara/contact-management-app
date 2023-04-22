import React, { useEffect, useState } from 'react';

interface Address {
    street: string;
    city: string;
    zip: string;
}

interface User {
    id: number;
    name: string;
    email: string;
    birthdate: string;
    placeOfBirth: string;
    mothersName: string;
    taxId: string;
    ssn: string;
    addresses: Address[];
    phoneNumbers: string[];
}

interface Props {
    users: User[];
}

function UserList() {
    const [editingIndex, setEditingIndex] = useState(-1);
    const [editedUser, setEditedUser] = useState<User>({
        id: -1,
        name: '',
        birthdate: '',
        placeOfBirth: '',
        mothersName: '',
        ssn: '',
        taxId: '',
        email: '',
        addresses: [],
        phoneNumbers: [],
    });

    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/user/list')
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleEditUser = (index: number) => {
        setEditingIndex(index);
        setEditedUser(users[index]);
    };

    const handleCancelEdit = () => {
        setEditingIndex(-1);
        setEditedUser({
            id: -1,
            name: '',
            birthdate: '',
            placeOfBirth: '',
            mothersName: '',
            ssn: '',
            taxId: '',
            email: '',
            addresses: [],
            phoneNumbers: [],
        });
    };

    const handleSaveEdit = () => {
        const newUsers = [...users];
        newUsers[editingIndex] = editedUser;
        setEditingIndex(-1);
        setEditedUser({
            id: -1,
            name: '',
            birthdate: '',
            placeOfBirth: '',
            mothersName: '',
            ssn: '',
            taxId: '',
            email: '',
            addresses: [],
            phoneNumbers: [],
        });
    };

    const handleUserChange = (fieldName: keyof User, fieldValue: string) => {
        setEditedUser((prev) => ({
            ...prev,
            [fieldName]: fieldValue,
        }));
    };

    const handleAddressChange = (
        index: number,
        fieldName: keyof Address,
        fieldValue: string
    ) => {
        const newAddresses = [...editedUser.addresses];
        newAddresses[index] = {
            ...newAddresses[index],
            [fieldName]: fieldValue,
        };
        setEditedUser((prev) => ({
            ...prev,
            addresses: newAddresses,
        }));
    };

    const handlePhoneNumberChange = (index: number, fieldValue: string) => {
        const newPhoneNumbers = [...editedUser.phoneNumbers];
        newPhoneNumbers[index] = fieldValue;
        setEditedUser((prev) => ({
            ...prev,
            phoneNumbers: newPhoneNumbers,
        }));
    };

    function handleSaveUser(index: number): void {
        throw new Error('Function not implemented.');
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Birthdate</th>
                    <th>Birthplace</th>
                    <th>Mother's Name</th>
                    <th>SSN Number</th>
                    <th>Tax ID</th>
                    <th>Email</th>
                    <th>Addresses</th>
                    <th>Phone Numbers</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; birthdate: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; placeOfBirth: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; mothersName: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; ssn: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; taxId: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                    <tr key={index}>
                        <td>
                            {editingIndex === index ? (
                                <input type="text" value={editedUser.name} onChange={(e) => handleUserChange('name', e.target.value)} />
                            ) : (
                                user.name
                            )}
                        </td>
                        <td>
                            {editingIndex === index ? (
                                <input type="date" value={editedUser.birthdate} onChange={(e) => handleUserChange('birthdate', e.target.value)} />
                            ) : (
                                user.birthdate
                            )}
                        </td>
                        <td>
                            {editingIndex === index ? (
                                <input type="text" value={editedUser.placeOfBirth} onChange={(e) => handleUserChange('placeOfBirth', e.target.value)} />
                            ) : (
                                user.placeOfBirth
                            )}

                        </td>
                        <td>
                            {editingIndex === index ? (
                                <input type="text" value={editedUser.mothersName} onChange={(e) => handleUserChange('mothersName', e.target.value)} />
                            ) : (
                                user.mothersName
                            )}
                        </td>
                        <td>
                            {editingIndex === index ? (
                                <input type="text" value={editedUser.ssn} onChange={(e) => handleUserChange('ssn', e.target.value)} />
                            ) : (
                                user.ssn
                            )}
                        </td>
                        <td>
                            {editingIndex === index ? (
                                <input type="text" value={editedUser.taxId} onChange={(e) => handleUserChange('taxId', e.target.value)} />
                            ) : (
                                user.taxId
                            )}
                        </td>
                        <td>
                            {editingIndex === index ? (
                                <input type="email" value={editedUser.email} onChange={(e) => handleUserChange('email', e.target.value)} />
                            ) : (
                                user.email
                            )}
                        </td>
                        <td>
                            {editingIndex === index ? (
                                <div>
                                    <button type="button" onClick={() => handleSaveUser(index)}>Save</button>
                                    <button type="button" onClick={handleCancelEdit}>Cancel</button>
                                </div>
                            ) : (
                                <button type="button" onClick={() => handleEditUser(Number(index))}>Edit</button>
                            )}
                        </td>
                    </tr>))}
            </tbody>
        </table>
    );
}

export default UserList;
