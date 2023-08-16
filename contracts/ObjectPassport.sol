// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";

contract ObjectPassport {
    struct Passport {
        address owner;
        address maintenanceParty;
        address certifyingParty;
        string name;
        string fullname;
        string description;
        string nationality;
        string sex;
        string photograph;
        string referenceDocument;
        string editableFields;
        uint256 lastMaintenanceTimestamp;
        uint256 expirationDate;
        bool maintenancePerformed;
        bool certified;
        MaintenanceRecord[] maintenanceHistory;
       
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


    function createPassport(
        string memory name,
        string memory fullname,
        string memory description , 
        string memory nationality,
        string memory sex,
        string memory photograph) external {
        passportCount++;
        passports[passportCount].owner = msg.sender;
        passports[passportCount].name = name;
        passports[passportCount].description = description;
        passports[passportCount].fullname = fullname;
        passports[passportCount].nationality = nationality;
        passports[passportCount].sex = sex;
        passports[passportCount].photograph =  photograph;
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

        function designatecertifyingParty(uint256 _passportId, address _certifyingParty)
        external
        onlyOwner(_passportId)
    {
        passports[_passportId].certifyingParty = _certifyingParty;
        
    }

    
 function performMaintenance(
    uint256 _passportId,
    string memory _comments,
    string memory _passportname,
    string memory _fullname, 
    string memory _nationality,
    string memory _sex,
    string memory _photograph,
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
    passport.name = _passportname;
    passport.expirationDate = _expirationDate;
    passports[passportCount].fullname = _fullname;
    passports[passportCount].nationality = _nationality;
    passports[passportCount].sex = _sex;
    passports[passportCount].photograph = _photograph;
}


function certifyObject(uint256 _passportId ,string memory _referenceDocument  ) external onlyCertifyingParty(_passportId) {
        passports[_passportId].certified = true;
        passports[_passportId].expirationDate = block.timestamp + 2 * 365 days;
        passports[_passportId].referenceDocument = _referenceDocument;

    }
}
