/*
File: generator.js
Zachary Muranaka
Generates a random password based on the user's input using the ANU QRNG API https://qrng.anu.edu.au/contact/api-documentation/
*/

// DOM elements
const numberOfCharsInput = document.getElementById("numberOfChars");
const numsInput = document.getElementById("nums");
const mixCaseInput = document.getElementById("mixCase");
const symbolsInput = document.getElementById("symbols");
const passwordDisplay = document.getElementById("password");

// ASCII codes for lowercase letters
const lowerASCII = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];

// ASCII codes for uppercase letters
const upperASCII = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];

// ASCII codes for numbers
const numASCII = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

// ASCII codes for symbols
const symbolASCII = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 58, 59, 60, 61, 62, 63, 64, 91, 92, 93, 94, 95, 96, 123, 124, 125, 126];

async function getPassword()
{
    let requestedLength = numberOfCharsInput.value;
    if (requestedLength < 1 || requestedLength > 128)
    {
        // Passwords must be anywhere 1 to 128 characters long
        // If the user requests a password outside this range, tell them and return
        passwordDisplay.innerText = "Passwords must be 1 to 128 characters long";
        return;
    }

    // Construct an array of the ASCII codes for the inputs that the user has selected
    let requestedASCII = lowerASCII.concat(
        (numsInput.checked ? numASCII : []),
        (mixCaseInput.checked ? upperASCII : []),
        (symbolsInput.checked ? symbolASCII : [])
    );

    passwordDisplay.innerText = "";

    // Call the ANU Quantum Random Number Generator API requesting an array of random numbers the size of the password requested
    let responseJSON = await fetch(`https://qrng.anu.edu.au/API/jsonI.php?length=${requestedLength}&type=uint8`).
    then(response => response.json()).
    catch((err) => {
        // If an error occurred, display the error and return
        passwordDisplay.innerText = err;
        return;
    });

    for (let i = 0; i < responseJSON.data.length; i++)
    {
        // The numbers in the array returned are all 8-bit numbers (0 to 255) - therefore, they must be converted into a valid index
        // The formula to translate into a valid index is number * array length / 256
        passwordDisplay.innerText += String.fromCharCode(requestedASCII[Math.floor(responseJSON.data[i] * requestedASCII.length / 256)]);
    }
}

// Generates a password and displays the results when the submit button is clicked
document.getElementById("submitBtn").addEventListener("click", getPassword);
