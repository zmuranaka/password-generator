Quantum Random Password Generator
=================================

_Passwords, generated truly randomly_

True randomness
---------------

With the help of Australian National University's quantum random number generator, also known as the ANU QRNG, true randomness in passwords can be achieved.
Most random number generators rely on pseudorandom algorithms which only approximate true randomness.
However, with the help of the ANU QRNG API, true randomness can be achieved because the numbers that are returned are based off of random quantum fluctuations.

Confused? Visit the [ANU QRNG FAQ page](https://qrng.anu.edu.au/contact/faq/) to learn more.

Customizable
------------

You can generate passwords as simple or complex as you like.

*   1 to 128 characters
*   Can include mixed case
*   Can include numbers
*   Can include symbols

Known issues
------------

* The Australian National University has deprecated their original API and is now rate limiting requests, so generating more than a single password per minute no longer works, as descirbed [here](https://github.com/zmuranaka/password-generator/issues/1#issuecomment-1698420609).

Password Improver
=================

_Improve the strength of your passwords while retaining their appearance_

Simple to use
-------------

All you have to do is enter the password that you would like improved and click Submit.
Your password will then be strengthened by replacing letters at random with similar looking numbers and symbols.

Secure
======

*   The passwords are never stored anywhere, ever. The only time you see them is in your own browser window.
*   Uses GitHub's Pages' HTTPS to prevent others from snooping on or tampering with your passwords.
*   Open source so you know there are no tricks going on. Just quantum random password generation.

Author
------

Zachary Muranaka

*   zmuranaka@gmail.com
*   [zmuranaka.dev](https://zmuranaka.dev)
