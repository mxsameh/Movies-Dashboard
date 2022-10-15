import jwt from 'jsonwebtoken';

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

export { decodeToken };

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
