# Reversing an MD5 hash (password cracking)

This following is a list of people, and their hashed PIN values. PIN value.

| email	| pin |	hash_pin | 
|------- |--- |----------|
| csev@umich.edu |	????	|0bd65e799153554726820ca639514029 |
| nabgilby@umich.edu |	???? |	aa36c88c27650af3b9868b723ae15dfc |
| pconway@umich.edu	| ???? 	| 1ca906c1ad59db8f11643829560bab55 | 
| font@umich.edu	 | ???? |	1d8d70dddf147d2d92a634817f01b239 |
| collemc@umich.edu	 | ???? | 	acf06cdd9c744f969958e1f085554c8b |


You should be able to easily crack all but one of these these PINs using your application.

The simplest brute force approach generally is done by writing a series of nested loops that go through all possible combinations of characters. This is one of the reasons that password policies specify that you include uppper case, lower case, numbers, and punctuation in passwords is to make brute force cracking more difficult. Significantly increasing the length of the password to something like 20-30 characters is a very good to make brute force cracking more difficult.