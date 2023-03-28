# Backend
This Repository stores all Backend related Code

# APIs

## Customer APIs

**GET** /customers
Fetches customer details of all the customer registered.


**GET** /customers/:CustomerID
Fetches customer details of particular Customer respective to the CustomerID.
Example- 

**GET** {{url}}/customers/C_Id_202303270041444812147



**POST** /customers/
Creates a new customer with uniquely generated CustomerID.
Request Sample Body-
```json
{
    "Name": "Rounak Das",
    "DateofBirth": "2002-12-12",
    "Gender": "M",
    "Address": "Kolkata, West Bengal",
    "AadhaarNumber": 980834592846,
    "ContactNumber": 9330341418,
    "EmailID": "rounak.das@gmail.com"
}

```

**POST** /customers/:CustomerID
Updates the details of a particular customer with respect to CustomerID.
Example- 

**POST** {{url}}/customers/C_Id_202303270041444812147

Request Sample Body-
```json
{
    "Name": "Rounak",
    "DateofBirth": "2002-12-12",
    "Gender": "M",
    "Address": "Kolkata, West Bengal",
    "AadhaarNumber": 900454592846,
    "ContactNumber": 9918056781,
    "EmailID": "rounak.das@gmail.com"
}
```


## Account APIs

**GET** /accounts
Fetches account details of all accounts registered.


**GET** /accounts/:CustomerID
Fetches account details of particular Customer respective to the CustomerID.
Example- 

**GET** {{url}}/accounts/C_Id_202303270041444812147



**POST** /accounts/
Creates a new account of the customer using CustomerID.
Request Sample Body-
```json
{
    "AccountNumber": 50430557800,
    "IFSCCode": "IDIB000F890",
    "CustomerID": "C_Id_202303270041444812147",
    "AccountType": "Saving",
    "Balance": 45000
}
```

**POST** /accounts/:CustomerID
Updates an existing account with respect to CustomerID
Example- 

**POST** {{url}}/accounts/C_Id_202303270041444812147

Request Sample Body-
```json
{
    "AccountNumber": 60430557900,
    "IFSCCode": "IDIB000F890",
    "AccountType": "Saving",
    "Balance": 65000
}
```


**DELETE** /accounts/:CustomerID
Deletes an existing account with respect to CustomerID
Example-

**DELETE** {{url}}/accounts/C_Id_202303270041444812147




