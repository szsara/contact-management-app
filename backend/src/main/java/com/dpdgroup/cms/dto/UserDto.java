package com.dpdgroup.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.Valid;
import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @Past(message = "Birthdate must be in the past")
    @NotNull(message = "Birthdate is mandatory")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate birthdate;

    @NotBlank(message = "Place of birth is mandatory")
    private String placeOfBirth;

    @NotBlank(message = "Mother's name is mandatory")
    private String mothersName;

    @Pattern(regexp = "\\d{3}-\\d{3}-\\d{3}", message = "SSN must be in the format XXX-XXX-XXX")
    private String ssn;

    @Size(min = 9, max = 12, message = "Tax ID must be between 9 to 12 digits long")
    private String taxId;

    @Email(message = "Invalid email address")
    private String email;

    @Valid
    private List<AddressDto> addresses;

    @Valid
    private List<@Pattern(regexp = "\\d{2}-\\d{3}-\\d{4}", message = "Phone number must be in the format XX-XXX-XXXX") String> phoneNumbers;
}
