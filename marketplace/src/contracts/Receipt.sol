pragma solidity ^0.5.0;

contract Receipt {
    string public name;
    uint public receiptCount = 0;
    mapping(uint => Receipt) public receipts;

    struct Receipt {
    uint id;
    string date;
    string time;
    string medicine;
    string disease;
    address patientid;
    address doctorid;
    }

    event ReceiptAdded(
    uint id,
    string date,
    string time,
    string medicine,
    string disease,
    address patientid,
    address doctorid
    );

    constructor() public {
        name = "Receipt";
    }

    function addReceipt(string memory _date,string memory _time,string memory _medicine,string memory _disease,address _patientid) public {
    // Require a valid name
    require(bytes(_date).length > 0);
    require(bytes(_time).length > 0);
    require(bytes(_medicine).length > 0);
    require(bytes(_disease).length > 0);
    // Increment product count
    receiptCount ++;
    // Create the product
    receipts[receiptCount] = Receipt(receiptCount, _date, _time,_medicine,_disease,_patientid, msg.sender);
    // Trigger an event
    emit ReceiptAdded(receiptCount, _date, _time,_medicine,_disease,_patientid, msg.sender);
    }
    
}