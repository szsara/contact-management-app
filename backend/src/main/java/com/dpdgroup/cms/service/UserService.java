package com.dpdgroup.cms.service;

import com.dpdgroup.cms.dto.UserDto;
import com.dpdgroup.cms.helper.DTOMapper;
import com.dpdgroup.cms.model.User;
import com.dpdgroup.cms.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDto create(UserDto user) {
        return DTOMapper.toDto(userRepository.save(DTOMapper.fromDto(user)));
    }

    public UserDto get(Long id) {
        return userRepository.findById(id).map(DTOMapper::toDto).orElse(null);
    }

    public List<UserDto> list() {
        return userRepository.findAll().stream().map(DTOMapper::toDto).toList();
    }

    public UserDto update(Long id, UserDto user) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            existingUser.setName(user.getName());
            existingUser.setBirthdate(user.getBirthdate());
            existingUser.setPlaceOfBirth(user.getPlaceOfBirth());
            existingUser.setMothersName(user.getMothersName());
            existingUser.setSsn(user.getSsn());
            existingUser.setTaxId(user.getTaxId());
            existingUser.setEmail(user.getEmail());
            existingUser.setAddresses(user.getAddresses().stream().map(DTOMapper::fromDto).toList());
            existingUser.setPhoneNumbers(user.getPhoneNumbers());
            userRepository.save(existingUser);
            return DTOMapper.toDto(existingUser);
        } else {
            return null;
        }
    }

    public UserDto depersonalize(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User existingUser = userOptional.get();
            existingUser.setName(null);
            existingUser.setBirthdate(null);
            existingUser.setPlaceOfBirth(null);
            existingUser.setMothersName(null);
            existingUser.setSsn(null);
            existingUser.setTaxId(null);
            existingUser.setEmail(null);
            existingUser.setAddresses(new ArrayList<>());
            existingUser.setPhoneNumbers(new ArrayList<>());
            userRepository.save(existingUser);
            return DTOMapper.toDto(existingUser);
        } else {
            return null;
        }
    }
}
