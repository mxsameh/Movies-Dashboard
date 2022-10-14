import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()
const secret = process.env.TOKEN_SECRET as string
// console.log( secret );


/**
 * CREATE TOKEN FUNCTION
 *
 * INPUTS:
 * data : data to be included in token's payload
 *
 * OUTPUTS:
 * token : the token of the data signed by the secret
 */
const createToken = (data: string | object): string => {
	const token = jwt.sign(data, secret);
	return token;
};

/**
 * VERIFY TOKEN FUNCTION
 *
 * INPUTS:
 * token : jwt token
 *
 * OUTPUTS:
 * isValid : true / false based on the verification of the token
 */
const verifyToken = (token: string): boolean => {
	try {
		jwt.verify(token, secret);
		return true;
	} catch (err) {
		return false;
	}
};

/**
 * DECODE TOKEN FUNCTION
 *
 * INPUTS:
 * token : jwt token
 *
 * OUTPUTS:
 * payload : data included in token's payload
 */
const decodeToken = (token: string) => {
	const payload = jwt.decode(token);
	return payload;
};

export { createToken, verifyToken, decodeToken };

/**
 * TESTING EXAMPLES
 */

// const user = {
//   name : 'mohamed',
//   age : 23
// }

// const token = createToken(user)
// console.log( token );

// const isValid = verifyToken(token)
// console.log( isValid );

// const payload = decodeToken(token);
// console.log( payload );
