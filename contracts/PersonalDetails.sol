// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PersonalDetails {
    struct PersonalInfo {
        string fullname;
        string nationality;
        string sex;
        string photograph; // Added photograph field
    }

    mapping(uint256 => PersonalInfo) public personalDetails;

    function setPersonalDetails(
        uint256 _passportId,
        string memory _fullname,
        string memory _nationality,
        string memory _sex,
        string memory _photograph
    ) external {
        require(_passportId > 0, "Invalid passport ID");
        PersonalInfo storage details = personalDetails[_passportId];
        details.fullname = _fullname;
        details.nationality = _nationality;
        details.sex = _sex;
        details.photograph = _photograph; // Set photograph field
    }

    function getPersonalDetails(uint256 _passportId)
        external
        view
        returns (string memory, string memory, string memory, string memory)
    {
        PersonalInfo memory details = personalDetails[_passportId];
        return (details.fullname, details.nationality, details.sex, details.photograph); // Return photograph field
    }
}
