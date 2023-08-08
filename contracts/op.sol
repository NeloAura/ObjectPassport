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
        string discription;
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

    function createPassport(string memory name,string memory discription) external {
        passportCount++;
        passports[passportCount].owner = msg.sender;
        passports[passportCount].name = name;
        passports[passportCount].discription = discription;
    }

    function changeOwner(address newOwner, uint256 _passportId) public onlyOwner(_passportId) {
        emit OwnerSet(passports[_passportId].owner, newOwner);
        passports[_passportId].owner = newOwner;
    }

    function getOwner(uint256 _passportId) external view returns (address) {
        return passports[_passportId].owner;
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

    function performMaintenance(uint256 _passportId, string memory _changedFields, string memory _comments)
        external
        onlyMaintenanceParty(_passportId)
    {
        require(
            editableFields[_passportId][msg.sender],
            "You do not have permission to perform maintenance on this passport"
        );

        Passport storage passport = passports[_passportId];
        passport.maintenancePerformed = true;
        passport.lastMaintenanceTimestamp = block.timestamp;

        MaintenanceRecord memory newRecord = MaintenanceRecord({
            maintenanceAddress: msg.sender,
            changedFields: _changedFields,
            timestamp: block.timestamp,
            comments: _comments
        });

        passport.maintenanceHistory.push(newRecord);
    }

    function certifyObject(uint256 _passportId)
        external
        onlyCertifyingParty(_passportId)
    {
        passports[_passportId].certified = true;
    }
}
