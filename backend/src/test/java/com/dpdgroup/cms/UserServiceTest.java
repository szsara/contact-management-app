package com.dpdgroup.cms;

import com.dpdgroup.cms.dto.UserDto;
import com.dpdgroup.cms.model.User;
import com.dpdgroup.cms.repository.UserRepository;
import com.dpdgroup.cms.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    private UserService userService;
    private UserDto testUserDto;
    private User testUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        userService = new UserService(userRepository);
        testUserDto = new UserDto();
        testUserDto.setId(1L);
        testUserDto.setName("John Doe");
        testUserDto.setBirthdate(LocalDate.of(1980, 1, 1));
        testUserDto.setPlaceOfBirth("New York");
        testUserDto.setMothersName("Jane Doe");
        testUserDto.setSsn("123-45-6789");
        testUserDto.setTaxId("012345678");
        testUserDto.setEmail("john.doe@example.com");

        testUser = new User();
        testUser.setId(1L);
        testUser.setName("John Doe");
        testUser.setBirthdate(LocalDate.of(1980, 1, 1));
        testUser.setPlaceOfBirth("New York");
        testUser.setMothersName("Jane Doe");
        testUser.setSsn("123-45-6789");
        testUser.setTaxId("012345678");
        testUser.setEmail("john.doe@example.com");
    }

    @Test
    public void testCreateUser() {
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        UserDto createdUser = userService.create(testUserDto);

        assertThat(createdUser).isNotNull();
        assertThat(createdUser.getId()).isEqualTo(testUser.getId());
        assertThat(createdUser.getName()).isEqualTo(testUser.getName());
        assertThat(createdUser.getBirthdate()).isEqualTo(testUser.getBirthdate());
        assertThat(createdUser.getPlaceOfBirth()).isEqualTo(testUser.getPlaceOfBirth());
        assertThat(createdUser.getMothersName()).isEqualTo(testUser.getMothersName());
        assertThat(createdUser.getSsn()).isEqualTo(testUser.getSsn());
        assertThat(createdUser.getTaxId()).isEqualTo(testUser.getTaxId());
        assertThat(createdUser.getEmail()).isEqualTo(testUser.getEmail());
    }

    @Test
    public void testGetUserById() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        UserDto retrievedUser = userService.get(1L);

        assertThat(retrievedUser).isNotNull();
        assertThat(retrievedUser.getId()).isEqualTo(1L);
        assertThat(retrievedUser.getName()).isEqualTo("John Doe");
        assertThat(retrievedUser.getBirthdate()).isEqualTo(LocalDate.of(1980, 1, 1));
        assertThat(retrievedUser.getPlaceOfBirth()).isEqualTo("New York");
        assertThat(retrievedUser.getMothersName()).isEqualTo("Jane Doe");
        assertThat(retrievedUser.getSsn()).isEqualTo("123-45-6789");
        assertThat(retrievedUser.getTaxId()).isEqualTo("012345678");
        assertThat(retrievedUser.getEmail()).isEqualTo("john.doe@example.com");
    }

    @Test
    void testList() {
        List<User> userList = new ArrayList<>();
        userList.add(testUser);
        when(userRepository.findAll()).thenReturn(userList);

        List<UserDto> userDtoList = userService.list();

        assertNotNull(userDtoList);
        assertEquals(1, userDtoList.size());
        assertEquals(testUserDto.getId(), userDtoList.get(0).getId());
        assertEquals(testUserDto.getName(), userDtoList.get(0).getName());
        assertEquals(testUserDto.getBirthdate(), userDtoList.get(0).getBirthdate());
        assertEquals(testUserDto.getPlaceOfBirth(), userDtoList.get(0).getPlaceOfBirth());
        assertEquals(testUserDto.getMothersName(), userDtoList.get(0).getMothersName());
        assertEquals(testUserDto.getSsn(), userDtoList.get(0).getSsn());
        assertEquals(testUserDto.getTaxId(), userDtoList.get(0).getTaxId());
        assertEquals(testUserDto.getEmail(), userDtoList.get(0).getEmail());
    }

    @Test
    void testUpdate() {
        Optional<User> userOptional = Optional.of(testUser);
        when(userRepository.findById(testUser.getId())).thenReturn(userOptional);
        when(userRepository.save(testUser)).thenReturn(testUser);

        UserDto updatedUserDto = new UserDto();
        updatedUserDto.setId(1L);
        updatedUserDto.setName("Updated Test User");
        updatedUserDto.setBirthdate(LocalDate.of(2000, 1, 2));
        updatedUserDto.setPlaceOfBirth("Updated Test City");
        updatedUserDto.setMothersName("Updated Test Mother");
        updatedUserDto.setSsn("987-65-4321");
        updatedUserDto.setTaxId("012345678");
        updatedUserDto.setEmail("updatedtestuser@example.com");

        UserDto result = userService.update(testUser.getId(), updatedUserDto);

        assertNotNull(result);
        assertEquals(testUserDto.getId(), result.getId());
        assertEquals(updatedUserDto.getName(), result.getName());
        assertEquals(updatedUserDto.getBirthdate(), result.getBirthdate());
        assertEquals(updatedUserDto.getPlaceOfBirth(), result.getPlaceOfBirth());
        assertEquals(updatedUserDto.getMothersName(), result.getMothersName());
        assertEquals(updatedUserDto.getSsn(), result.getSsn());
        assertEquals(testUserDto.getTaxId(), result.getTaxId());
        assertEquals(updatedUserDto.getEmail(), result.getEmail());
    }

    @Test
    void testDepersonalize() {
        Optional<User> userOptional = Optional.of(testUser);
        when(userRepository.findById(testUser.getId())).thenReturn(userOptional);
        when(userRepository.save(testUser)).thenReturn(testUser);

        UserDto depersonalizedUserDto = userService.depersonalize(testUser.getId());

        assertNotNull(depersonalizedUserDto);
        assertNull(depersonalizedUserDto.getBirthdate());
        assertNull(depersonalizedUserDto.getSsn());
        assertNull(depersonalizedUserDto.getTaxId());
        assertNull(depersonalizedUserDto.getEmail());
        assertEquals(0, depersonalizedUserDto.getAddresses().size());
        assertEquals(0, depersonalizedUserDto.getPhoneNumbers().size());
    }
}

