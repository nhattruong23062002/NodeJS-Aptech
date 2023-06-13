const JWT = require('jsonwebtoken');

const jwtSettings = require('../constants/jwtSetting');

const generateToken = (user) => {
  const expiresIn = '3d';
  return JWT.sign({
    iat: Math.floor(Date.now() / 1000),
    ...user,
    algorithm: 'HS256',
  }, jwtSettings.SECRET,{
    expiresIn,
  })
}
const generateRefreshToken = (id) => {
  const expiresIn = '30d'; 

  return JWT.sign({ id }, jwtSettings.SECRET, { expiresIn })
};

module.exports ={
  generateToken,
  generateRefreshToken
} 