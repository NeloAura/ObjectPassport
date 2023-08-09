// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract ObjectPassport {
    struct Passport {
        address owner;
        address maintenanceParty;
        address certifyingParty;
        bool maintenancePerformed;
        bool certified;
        string name;
        string description;
        MaintenanceRecord[] maintenanceHistory;
        uint256 lastMaintenanceTimestamp;
        string editableFields;
        uint256 expirationDate;
    }

    struct MaintenanceRecord {
        address maintenanceAddress;
        uint256 timestamp;
        string comments;
    }

    mapping(uint256 => Passport) public passports;
    mapping(address => uint256[]) public passportsByOwner;
    mapping(uint256 => mapping(address => bool)) public editableFields;
    uint256 public passportCount;

    event OwnerSet(address indexed oldOwner, address indexed newOwner);

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

    function getAllPassportIds() external view returns (uint256[] memory) {
    uint256[] memory passportIds = new uint256[](passportCount);
    for (uint256 i = 0; i < passportCount; i++) {
        passportIds[i] = i + 1;
    }
    return passportIds;
}

function getPassportDetails(uint256 _passportId) external view returns (Passport memory) {
    require(_passportId > 0 && _passportId <= passportCount, "Invalid passport ID");
    return passports[_passportId];
}


    function createPassport(string memory name,string memory description) external {
        passportCount++;
        passports[passportCount].owner = msg.sender;
        passports[passportCount].name = name;
        passports[passportCount].description = description;
    }

    function changeOwner(address newOwner, uint256 _passportId) public onlyOwner(_passportId) {
        emit OwnerSet(passports[_passportId].owner, newOwner);
        passports[_passportId].owner = newOwner;
    }

    function getOwner(uint256 _passportId) external view returns (address) {
        return passports[_passportId].owner;
    }

    function designateMaintenanceParty(uint256 _passportId, address _maintenanceParty , string memory _editableFields)
        external
        onlyOwner(_passportId)
    {
        passports[_passportId].maintenanceParty = _maintenanceParty;
        passports[_passportId].editableFields = _editableFields;
    }

    
 function performMaintenance(
    uint256 _passportId,
    string memory _comments,
    string memory _name,
    string memory _description,
    uint256 _expirationDate
) external onlyMaintenanceParty(_passportId) {
    
    Passport storage passport = passports[_passportId];
    passport.maintenancePerformed = true;
    passport.lastMaintenanceTimestamp = block.timestamp;

    MaintenanceRecord memory newRecord = MaintenanceRecord({
        maintenanceAddress: msg.sender,
        timestamp: block.timestamp,
        comments: _comments
    });

    passport.maintenanceHistory.push(newRecord);

    // Update passport data
    passport.name = _name;
    passport.description = _description;
    passport.expirationDate = _expirationDate;
}


function certifyObject(uint256 _passportId) external onlyCertifyingParty(_passportId) {
        passports[_passportId].certified = true;
        passports[_passportId].expirationDate = block.timestamp + 2 * 365 days;
    }
}
