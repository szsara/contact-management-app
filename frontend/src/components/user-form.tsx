import React, { useState } from 'react';
import './user-form.css';

function UserForm() {
  const [name, setName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [placeOfBirth, setBirthplace] = useState('');
  const [mothersName, setMotherName] = useState('');
  const [ssn, setSsnNumber] = useState('');
  const [taxId, setTaxId] = useState('');
  const [email, setEmail] = useState('');
  const [addresses, setAddresses] = useState([{ postalCode: '', city: '', street: '', houseNumber: '', building: '', floor: '' }]);
  const [phoneNumbers, setPhoneNumbers] = useState(['']);

  const handleAddressChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newAddresses = [...addresses];
    newAddresses[index][event.target.name as keyof typeof addresses[typeof index]] = event.target.value;
    setAddresses(newAddresses);
  };

  const handlePhoneNumberChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumbers = [...phoneNumbers];
    newPhoneNumbers[index] = event.target.value;
    setPhoneNumbers(newPhoneNumbers);
  };

  const handleAddAddress = () => {
    setAddresses([...addresses, { postalCode: '', city: '', street: '', houseNumber: '', building: '', floor: '' }]);
  };

  const handleAddPhoneNumber = () => {
    setPhoneNumbers([...phoneNumbers, '']);
  };

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          birthdate,
          placeOfBirth,
          mothersName,
          ssn,
          taxId,
          email,
          addresses,
          phoneNumbers
        })
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('User created successfully');
        setName('');
        setEmail('');
        setAddresses([{ postalCode: '', city: '', street: '', houseNumber: '', building: '', floor: '' }]);
        setPhoneNumbers(['']);
      } else {
        console.error('Failed to create user');
        console.error(responseData);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    console.log({
      name,
      birthdate,
      birthplace: placeOfBirth,
      motherName: mothersName,
      ssnNumber: ssn,
      taxId,
      email,
      addresses,
      phoneNumbers,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <form>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ flexBasis: '50%', marginRight: '1rem' }}>
            <label>
              Name
            </label>
            <br />
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            <br />

            <label>
              Birthdate
            </label>
            <br />
            <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} />
            <br />
            <label>
              Birthplace
            </label>
            <br />
            <input type="text" value={placeOfBirth} onChange={(e) => setBirthplace(e.target.value)} />
            <br />
            <label>
              Mother's Name
            </label>
            <br />
            <input type="text" value={mothersName} onChange={(e) => setMotherName(e.target.value)} />
            <br />
            <label>
              SSN Number
            </label>
            <br />
            <input type="text" value={ssn} onChange={(e) => setSsnNumber(e.target.value)} />
            <br />
            <label>
              Tax ID
            </label>
            <br />
            <input type="text" value={taxId} onChange={(e) => setTaxId(e.target.value)} />
            <br />
            <label>
              Email
            </label>
            <br />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div style={{ flexBasis: '50%', marginLeft: '1rem' }}>
            {addresses.map((address, index) => (
              <div key={index}>
                <label>
                  Postal Code
                </label>
                <br />
                <input type="text" name="postalCode" value={address.postalCode} onChange={(e) => handleAddressChange(index, e)} />
                <br />
                <label>
                  City
                </label>
                <br />
                <input type="text" name="city" value={address.city} onChange={(e) => handleAddressChange(index, e)} />
                <br />
                <label>
                  Street
                </label>
                <br />
                <input type="text" name="street" value={address.street} onChange={(e) => handleAddressChange(index, e)} />
                <br />
                <label>
                  House Number
                </label>
                <br />
                <input type="text" name="houseNumber" value={address.houseNumber} onChange={(e) => handleAddressChange(index, e)} />
                <br />
                <label>
                  Building
                </label>
                <br />
                <input type="text" name="building" value={address.building} onChange={(e) => handleAddressChange(index, e)} />
                <br />
                <label>
                  Floor
                </label>
                <br />
                <input type="text" name="floor" value={address.floor} onChange={(e) => handleAddressChange(index, e)} />
                <br />
              </div>
            ))}
            <button className="add-btn" type="button" onClick={handleAddAddress}>
              Add Address
            </button>
            <br />
            {phoneNumbers.map((phoneNumber, index) => (
              <div key={index}>
                <label>
                  Phone Number
                </label>
                <br />
                <input type="text" value={phoneNumber} onChange={(e) => handlePhoneNumberChange(index, e)} />
              </div>
            ))}
            <button className="add-btn" type="button" onClick={handleAddPhoneNumber}>
              Add Phone Number
            </button>
          </div>
        </div>
      </form>
      <button className="submit-btn" type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default UserForm;

