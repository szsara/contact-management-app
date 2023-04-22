//package com.dpdgroup.cms;
//
//import com.dpdgroup.cms.dto.AddressDto;
//import com.dpdgroup.cms.dto.UserDto;
//import com.dpdgroup.cms.helper.DTOMapper;
//import com.dpdgroup.cms.model.User;
//import com.dpdgroup.cms.repository.UserRepository;
//import com.dpdgroup.cms.service.UserService;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.MockitoAnnotations;
//
//import java.time.LocalDate;
//import java.util.ArrayList;
//
//import static org.junit.jupiter.api.Assertions.assertEquals;
//import static org.junit.jupiter.api.Assertions.assertNotNull;
//import static org.mockito.ArgumentMatchers.any;
//import static org.mockito.ArgumentMatchers.argThat;
//import static org.mockito.Mockito.*;
//
//public class UserServiceTest {
//    @Mock
//    private UserRepository userRepository;
//
//    @InjectMocks
//    private UserService userService;
//
//    @BeforeEach
//    void setUp() {
//        MockitoAnnotations.openMocks(this);
//    }
//
//    @Test
//    void testCreate() {
//        AddressDto addressDto = new AddressDto();
//        addressDto.setPostalCode("1111");
//        addressDto.setCity("Budapest");
//
//        UserDto userDto = new UserDto();
//        userDto.setName("John Smith");
//        userDto.setBirthdate(LocalDate.of(1980, 1, 1));
//        userDto.setPlaceOfBirth("New York City");
//        userDto.setMothersName("Jane Smith");
//        userDto.setSsn("123-45-6789");
//        userDto.setTaxId("123-45-6789");
//        userDto.setEmail("john.smith@example.com");
//        userDto.setAddresses(new ArrayList<>(){{ add(addressDto); }});
//        userDto.setPhoneNumbers(new ArrayList<>(){{ add("70 00 0000"); }});
//
//        User savedUser = new User();
//        savedUser.setId(1L);
//        savedUser.setName("John Smith");
//        savedUser.setBirthdate(LocalDate.of(1980, 1, 1));
//        savedUser.setPlaceOfBirth("New York City");
//        savedUser.setMothersName("Jane Smith");
//        savedUser.setSsn("123-45-6789");
//        savedUser.setTaxId("123-45-6789");
//        savedUser.setEmail("john.smith@example.com");
//
//        Mockito.when(userRepository.save(savedUser)).thenReturn(savedUser);
//
//        UserDto result = userService.create(userDto);
//
//        assertNotNull(result);
//        assertEquals(userDto.getName(), result.getName());
//        assertEquals(userDto.getBirthdate(), result.getBirthdate());
//        assertEquals(userDto.getPlaceOfBirth(), result.getPlaceOfBirth());
//        assertEquals(userDto.getMothersName(), result.getMothersName());
//        assertEquals(userDto.getSsn(), result.getSsn());
//        assertEquals(userDto.getTaxId(), result.getTaxId());
//        assertEquals(userDto.getEmail(), result.getEmail());
//
//        assertEquals(DTOMapper.toDto(savedUser), result);
//    }
//}
