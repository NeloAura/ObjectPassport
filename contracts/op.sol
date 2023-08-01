// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ObjectPassport {
    struct Passport {
        address owner;
        address maintenanceParty;
        address certifyingParty;
        bool maintenancePerformed;
        bool certified;
    }

    mapping(uint256 => Passport) public passports;
    uint256 public passportCount;

    modifier onlyOwner(uint256 _passportId) {
        require(
            msg.sender == passports[_passportId].owner,
            "Only the owner can perform this action"
        );
        _;
    }

    modifier onlyMaintenanceParty(uint256 _passportId) {
        require(
            msg.sender == passports[_passportId].maintenanceParty,
            "Only the maintenance party can perform this action"
        );
        _;
    }

    modifier onlyCertifyingParty(uint256 _passportId) {
        require(
            msg.sender == passports[_passportId].certifyingParty,
            "Only the certifying party can perform this action"
        );
        _;
    }

    function createPassport() external {
        passportCount++;
        passports[passportCount].owner = msg.sender;
    }

    function designateMaintenanceParty(uint256 _passportId, address _maintenanceParty)
        external
        onlyOwner(_passportId)
    {
        passports[_passportId].maintenanceParty = _maintenanceParty;
    }

    function designateCertifyingParty(uint256 _passportId, address _certifyingParty)
        external
        onlyOwner(_passportId)
    {
        passports[_passportId].certifyingParty = _certifyingParty;
    }

    function performMaintenance(uint256 _passportId)
        external
        onlyMaintenanceParty(_passportId)
    {
        passports[_passportId].maintenancePerformed = true;
    }

    function certifyObject(uint256 _passportId)
        external
        onlyCertifyingParty(_passportId)
    {
        passports[_passportId].certified = true;
    }
}
