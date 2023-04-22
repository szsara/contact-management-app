package com.dpdgroup.cms.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Pattern;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AddressDto {

    private Long id;

    @Pattern(regexp = "\\d{4}", message = "Postal code should be 4 digits")
    private String postalCode;

    private String city;

    private String street;

    private Integer houseNumber;

    private String building;

    private Integer floor;
}
