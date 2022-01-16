/*
File: generator.js
Zachary Muranaka
Generates a random password based on the user's input using jQuery and the ANU QRNG API https://qrng.anu.edu.au/contact/api-documentation/
*/

$(() =>
{
    "use strict";

    // Generates a password and displays the results when the submit button is clicked
    $('#submitBtn').click(() =>
    {
        // Passwords must be anywhere 1 to 128 characters long
        // If the user requests a password outside this range, tell them and return
        const passwordLength = $('#numberOfChars').val();
        if (passwordLength < 1 || passwordLength > 128)
        {
            $('#password').text("Passwords must be 1 to 128 characters");
            return;
        }

        // ASCII codes for lowercase letters
        let charRange = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];

        if($('#nums').is(':checked'))
        {
            // Append the ASCII codes for numbers onto charRange
            charRange = charRange.concat([48, 49, 50, 51, 52, 53, 54, 55, 56, 57]);
        }
        if($('#mixCase').is(':checked'))
        {
            // Append the ASCII codes for uppercase letters onto charRange
            charRange = charRange.concat([65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]);
        }
        if($('#symbols').is(':checked'))
        {
            // Append the ASCII codes for symbols onto charRange
            charRange = charRange.concat([33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47]);
            charRange = charRange.concat([58, 59, 60, 61, 62, 63, 64]);
            charRange = charRange.concat([91, 92, 93, 94, 95, 96]);
            charRange = charRange.concat([123, 124, 125, 126]);
        }

        $('#password').text(''); // Clear out the old password text
        // Call the ANU Quantum Random Number Generator API requesting an array of random numbers the size of the password requested
        // The numbers in the array returned are all 8-bit numbers (0 to 255) - therefore, they must be converted into a valid index
        // The formula to translate into a valid index is number * array length / 256
        $.getJSON(`https://qrng.anu.edu.au/API/jsonI.php?length=${passwordLength}&type=uint8`, (returnedJSON) =>
        {
            for (let i = 0; i < returnedJSON.data.length; i++)
            {
                $('#password').append(String.fromCharCode(charRange[Math.floor(returnedJSON.data[i] * charRange.length / 256)]));
            }
        });
    });
});
