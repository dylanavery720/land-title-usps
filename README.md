Land Title USPS Challenge (Dylan Avery)
=========

Summary
---
This application provides a user with the ability to add entries to an address book, which are then verified and corrected using the USPS API.   

### Server
 *  ```
    #!sh
    pip install -r requirements.txt 
    ```
 * Obtain a USERID by registering with the USPS API. Add it to a .env file.
    ```
    .env
    USPS_USERID="YOUR_USER_ID"
    ```

 * run server 
    ```
    #!sh
    flask run
    ```

### Frontend
 * Install dependencies
    ```
    #!sh
    cd frontend
    yarn
    ```

 * Run application
    ```
    #!sh
    cd frontend
    yarn start
    ```

