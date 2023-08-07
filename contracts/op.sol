// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ObjectPassport {
    struct Passport {
        address owner;
        address maintenanceParty;
        address certifyingParty;
        bool maintenancePerformed;
        bool certified;
        string secretKey;
        MaintenanceRecord[] maintenanceHistory;
        uint256 lastMaintenanceTimestamp;
    }

    struct MaintenanceRecord {
        address maintenanceAddress;
        string changedFields;
        uint256 timestamp;
        string comments;
    }


    mapping(uint256 => Passport) public passports;
    mapping(uint256 => mapping(address => bool)) public editableFields;
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

    function assignEditableFields(uint256 _passportId, address _maintenanceParty, bool _canEdit)
        external
        onlyOwner(_passportId)
    {
        editableFields[_passportId][_maintenanceParty] = _canEdit;
    }

    function performMaintenance(uint256 _passportId)
        external
        onlyMaintenanceParty(_passportId)
    {
        require(
            editableFields[_passportId][msg.sender],
            "You do not have permission to perform maintenance on this passport"
        );
        passports[_passportId].maintenancePerformed = true;
    }

    function certifyObject(uint256 _passportId)
        external
        onlyCertifyingParty(_passportId)
    {
        passports[_passportId].certified = true;
    }
}
