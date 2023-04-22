import React, { useEffect, useState } from 'react';
import './user-list.css';

interface Address {
    id: number;
    street: string;
    city: string;
    postalCode: string;
    houseNumber: number;
    building: string;
    floor: number;
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
    const [editingAddressIndex, setEditingAddressIndex] = useState(-1);
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
    const [editedAddress, setEditedAddress] = useState<Address>({
        id: -1,
        street: '',
        city: '',
        postalCode: '',
        houseNumber: -1,
        building: '',
        floor: -1
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

    const handleEditUser = (index: number, addressIndex?: number) => {
        setEditingIndex(index);
        setEditedUser(users[index]);
        if (addressIndex !== undefined) {
            setEditingAddressIndex(addressIndex);
            setEditedAddress(users[index].addresses[addressIndex]);
        } else {
            setEditingAddressIndex(-1);
            setEditedAddress({
                id: -1,
                street: '',
                city: '',
                postalCode: '',
                houseNumber: -1,
                building: '',
                floor: -1
            });
        }
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
        setEditingAddressIndex(-1);
        setEditedAddress({
            id: -1,
            street: '',
            city: '',
            postalCode: '',
            houseNumber: -1,
            building: '',
            floor: -1
        });
    };

    const [expandedRowIndex, setExpandedRowIndex] = useState(-1);
    const handleRowExpand = (index: React.SetStateAction<number>) => {
        if (expandedRowIndex === index) {
            setExpandedRowIndex(-1);
        } else {
            setExpandedRowIndex(index);
        }
    };

    const handleSaveEdit = () => {
        const newUsers = [...users];
        newUsers[editingIndex] = editedUser;
        setUsers(newUsers);
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

    async function handleSaveUser(index: number): Promise<void> {
        handleSaveEdit();
        const user = editedUser;
        try {
            const response = await fetch(`http://localhost:8080/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const responseData = await response.json();

            if (!response.ok) {
                alert(JSON.stringify(responseData));
                throw new Error('Failed to update user');
            }
            alert("User updated successfully");
            setEditingIndex(-1);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    async function handleDeleteUser(id: number): Promise<void> {
        try {
            const response = await fetch(`http://localhost:8080/user/depersonalize/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const responseData = await response.json();

            if (!response.ok) {
                alert(JSON.stringify(responseData));
                throw new Error('Failed to delete user');
            }
            alert("User deleted successfully");
            setEditingIndex(-1);
        } catch (error) {
            console.error('An error occurred:', error);
        }
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
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <th colSpan={12}><hr /></th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <React.Fragment key={user.id}>
                        <tr>
                            <td>
                                {editingIndex === index ? (
                                    <input className="table-input" type="text" value={editedUser.name} onChange={(e) => handleUserChange('name', e.target.value)} />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <input className="table-input" type="date" value={editedUser.birthdate} onChange={(e) => handleUserChange('birthdate', e.target.value)} />
                                ) : (
                                    user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : ""
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <input className="table-input" type="text" value={editedUser.placeOfBirth} onChange={(e) => handleUserChange('placeOfBirth', e.target.value)} />
                                ) : (
                                    user.placeOfBirth
                                )}

                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <input className="table-input" type="text" value={editedUser.mothersName} onChange={(e) => handleUserChange('mothersName', e.target.value)} />
                                ) : (
                                    user.mothersName
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <input className="table-input" type="text" value={editedUser.ssn} onChange={(e) => handleUserChange('ssn', e.target.value)} />
                                ) : (
                                    user.ssn
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <input className="table-input" type="text" value={editedUser.taxId} onChange={(e) => handleUserChange('taxId', e.target.value)} />
                                ) : (
                                    user.taxId
                                )}
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <input className="table-input" type="email" value={editedUser.email} onChange={(e) => handleUserChange('email', e.target.value)} />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td>{user.addresses[0]?.city}</td>
                            <td>{user.phoneNumbers.slice(0, 2).join(", ")}</td>
                            <td>
                                <button className="expand-btn" onClick={() => handleRowExpand(index)}>
                                    {expandedRowIndex === index ? "-" : "+"}
                                </button>
                            </td>
                            <td>
                                {editingIndex === index ? (
                                    <div>
                                        <button className="edit-btn-action" type="button" onClick={() => handleSaveUser(index)}>Save</button>
                                        <button className="edit-btn-action" type="button" onClick={handleCancelEdit}>Cancel</button>
                                    </div>
                                ) : (
                                    <button className="edit-btn" type="button" onClick={() => handleEditUser(Number(index))}>Edit</button>
                                )}
                            </td>
                            <td>
                                <button className="delete-btn" type="button" onClick={() => handleDeleteUser(Number(user.id))}>Delete</button>
                            </td>
                        </tr>
                        {expandedRowIndex === index && (
                            <tr>
                                <td colSpan={5}>
                                    <div className="expanded-content">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Postal Code</th>
                                                    <th>City</th>
                                                    <th>Street</th>
                                                    <th>House Number</th>
                                                    <th>Building</th>
                                                    <th>Floor</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user.addresses.map((address, addressIndex) => (
                                                    <tr key={addressIndex}>
                                                        <td>{address.postalCode}</td>
                                                        <td>{address.city}</td>
                                                        <td>{address.street}</td>
                                                        <td>{address.houseNumber}</td>
                                                        <td>{address.building}</td>
                                                        <td>{address.floor}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Phone Number</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {user.phoneNumbers.map((phoneNumber, index) => (
                                                    <tr key={index}>
                                                        <td>{phoneNumber}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>))}
            </tbody>
        </table>
    );
}

export default UserList;
