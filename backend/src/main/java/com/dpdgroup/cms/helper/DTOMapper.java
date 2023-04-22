package com.dpdgroup.cms.helper;

import com.dpdgroup.cms.dto.AddressDto;
import com.dpdgroup.cms.dto.UserDto;
import com.dpdgroup.cms.model.Address;
import com.dpdgroup.cms.model.User;

import java.util.ArrayList;
import java.util.List;

public class DTOMapper {

    public static UserDto toDto(User user) {
        List<AddressDto> addresses = new ArrayList<>();
        if (user.getAddresses() != null) {
            user.getAddresses().forEach(address -> addresses.add(toDto(address)));
        }
        return new UserDto(
                user.getId(),
                user.getName(),
                user.getBirthdate(),
                user.getPlaceOfBirth(),
                user.getMothersName(),
                user.getSsn(),
                user.getTaxId(),
                user.getEmail(),
                addresses,
                user.getPhoneNumbers()
        );
    }

    public static AddressDto toDto(Address address) {
        return new AddressDto(
                address.getId(),
                address.getPostalCode(),
                address.getCity(),
                address.getStreet(),
                address.getHouseNumber(),
                address.getBuilding(),
                address.getFloor()
        );
    }

    public static User fromDto(UserDto userDto) {
        List<Address> addresses = new ArrayList<>();
        if (userDto.getAddresses() != null) {
            userDto.getAddresses().forEach(addressDto -> addresses.add(fromDto(addressDto)));
        }
        return new User(
                userDto.getId(),
                userDto.getName(),
                userDto.getBirthdate(),
                userDto.getPlaceOfBirth(),
                userDto.getMothersName(),
                userDto.getSsn(),
                userDto.getTaxId(),
                userDto.getEmail(),
                addresses,
                userDto.getPhoneNumbers()
        );
    }

    public static Address fromDto(AddressDto addressDto) {
        return new Address(
                addressDto.getId(),
                addressDto.getPostalCode(),
                addressDto.getCity(),
                addressDto.getStreet(),
                addressDto.getHouseNumber(),
                addressDto.getBuilding(),
                addressDto.getFloor()
        );
    }
}
